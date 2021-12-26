const usersLogic = require("../bll/auth-logic");
const authMiddleware = require("../middleware/auth-middleware");
const getNewToken = require("../helpers/auth-helper");
const {
  userSignupValidator,
  userSigninValidator,
  userUpdateValidator,
} = require("../validators/user");
const { runValidation } = require("../validators");

const express = require("express");
const router = express.Router();

// Register new user
router.post(
  "/register",
  userSignupValidator,
  runValidation,
  async (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        street: req.body.street,
        email: req.body.email,
        password: req.body.password,
        identityNumber: req.body.identityNumber,
      };

      const isIdExists = await usersLogic.getId(user.identityNumber);
      if (isIdExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Account is already exists" }] });
      }
      const isEmailExists = await usersLogic.checkIfEmailExists(user);
      if (isEmailExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Account is already exists" }] });
      }

      // Create a user
      const createAUser = await usersLogic.signUpNewUser(user);
      // If sign up fails
      if (!createAUser) {
        return res.status(400).json({ errors: [{ msg: "Sign up failed!" }] });
      }
      if (createAUser.user) {
        // Create Token
        const token = await getNewToken(createAUser);
        if (!token) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Failed, Could not generate a token" }] });
        }
        res.json({ token });
        console.log("New user has been registered!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// Login
router.post("/login", userSigninValidator, runValidation, async (req, res) => {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    if (!credentials.email) {
      return res.status(400).json({ errors: [{ msg: "Username required!" }] });
    }
    if (!credentials.password) {
      return res.status(400).json({ errors: [{ msg: "Password required!" }] });
    }
    const user = await usersLogic.loginUser(credentials);
    if (user.error) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    if (user.user) {
      // Create token
      const token = await getNewToken(user);
      if (!token) {
        return res.status(400).json({ errors: [{ msg: "Sign in failed!" }] });
      }
      res.json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occurred.");
  }
});
// Check if ID is taken
router.get("/checkId/:id", async (req, res) => {
  try {
    const idExists = await usersLogic.getId(req.params.id);
    res.json(idExists);
  } catch (error) {
    return res.status(500).json({ error: "failed to get user" });
  }
});
router.get("/checkEmail/:id", async (req, res) => {
  try {
    const emailExists = await usersLogic.checkIfEmailExists2(req.params.id);
    res.json(emailExists);
  } catch (error) {
    return res.status(500).json({ error: "failed to get user" });
  }
});
// Logged user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await usersLogic.getAuthUser(req.user._id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User is not found" }] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.patch(
  "/update-social-user",
  authMiddleware,
  userUpdateValidator,
  runValidation,
  async (req, res) => {
    try {
      const user = {
        _id: req.user._id,
        identityNumber: req.body.identityNumber,
        city: req.body.city,
        street: req.body.street,
      };
      const response = await usersLogic.updateSocialUser(user);
      if (response.error) {
        return res.status(400).json({ error: response.error });
      }
      if (response.message) {
        res.json({ msg: response.message });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "registration failed,please try again" });
    }
  }
);

module.exports = router;
