import express from "express";
import path from "path";
import "./db/config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import User from "./model/User.js";
import ExpressError from "./utils/ExpressError.js";
import AsyncCatch from "./utils/AsyncCatch.js";
import dotenv from "dotenv";
dotenv.config();
import "./utils/passportGoogle.js";
import randomString from "./utils/randomString.js";
import sendEmail from "./utils/sendMail.js";
import flash from "connect-flash";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

const dbUrl = "mongodb://localhost:27017/virtualLab";
const store = new MongoStore({
  mongoUrl: dbUrl,
  secret: "thisshouldbeagoodlogic",
  touchAfter: 24 * 60 * 60,
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR >> ", e);
});

const Secret = "thisshouldbeagoodlogic";
// creating the session
const sessionConfig = {
  store,
  name: "session",
  secret: Secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.user && req.user.username) {
    res.locals.currentUser = req.user.username;
  } else if (req.user && req.user.google.name) {
    res.locals.currentUser = req.session.passport.user.google.name;
  } else {
    res.locals.currentUser = null;
  }

  res.locals.message = req.flash("message");

  next();
});

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("message", "You must required login");
    return res.redirect("/");
  }
  next();
};

app.get(
  "/",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("home.ejs");
  }
);

app.get(
  "/redox",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "active";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("redox.ejs");
  }
);

app.get(
  "/acidbase",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "active";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("acidbase.ejs");
  }
);

app.get(
  "/quiz",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "active";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("quiz.ejs");
  }
);

app.get(
  "/theory",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "active";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";

    next();
  },
  (req, res) => {
    res.render("theory.ejs");
  }
);

app.get(
  "/procedure",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "active";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";
    next();
  },
  (req, res) => {
    res.render("procedure.ejs");
  }
);

app.get(
  "/assignment",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "active";
    res.locals.activity = "";
    next();
  },
  (req, res) => {
    res.render("assignment.ejs");
  }
);

app.get(
  "/activity",
  isLoggedIn,
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "active";
    next();
  },
  (req, res) => {
    res.render("activity.ejs");
  }
);

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/userNotFound",
  }),
  (req, res) => {
    res.redirect("/theory");
  }
);

app.get("/userNotFound", (req, res, next) => {
  next(new ExpressError("User Not Found.", 404));
});

app.post(
  "/register",
  AsyncCatch(async (req, res, next) => {
    let { username, email } = req.body;
    const existingUser = await User.findOne({
      $or: [
        {
          username: username.trim(),
        },
        {
          email: email.trim(),
        },
      ],
    });
    if (existingUser) {
      return next(new ExpressError("User Already Exists.", 409));
    }
    next();
  }),
  AsyncCatch(async (req, res) => {
    let { username, email, password } = req.body;

    const uniqueString = randomString();
    const isValid = false;

    const user = new User({
      username: username.trim(),
      email: email.trim(),
      isValid,
      uniqueString,
    });

    const registered_user = await User.register(user, password.trim());
    sendEmail(email.trim(), uniqueString);

    return res.render("emailVerification.ejs", { registered_user });
  })
);

app.post(
  "/verifyEmail/:id",
  AsyncCatch(async (req, res, next) => {
    const registered_user = await User.findOne({
      uniqueString: req.body.uuid.trim(),
    });

    const { id } = req.params;

    if (registered_user) {
      req.login(registered_user, (err) => {
        if (err) return next(new ExpressError("Internal Server Error.", 500));
      });

      registered_user.isValid = true;
      await registered_user.save();
      return res.redirect("/theory");
    } else {
      await User.deleteOne({ _id: id });
      return next(new ExpressError("Email ID is Not Verified.", 403));
    }
  })
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(new ExpressError("Internal Server Error.", 500));
    res.redirect("/theory");
  });
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/userNotFound" }),
  (req, res, next) => {
    res.redirect("/getinfo");
  }
);

app.get("/getinfo", (req, res, next) => {
  res.redirect("/theory");
});

app.all(
  "*",
  (req, res, next) => {
    res.locals.simulator = "";
    res.locals.theory = "";
    res.locals.procedure = "";
    res.locals.quiz = "";
    res.locals.assignment = "";
    res.locals.activity = "";
    next();
  },
  (req, res, next) => {
    next(new ExpressError("Page not found", 404));
  }
);

// will render the error (error middleware)
app.use((err, req, res, next) => {
  res.locals.simulator = "";
  res.locals.theory = "";
  res.locals.procedure = "";
  res.locals.quiz = "";
  res.locals.assignment = "";
  res.locals.activity = "";
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!!!";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
