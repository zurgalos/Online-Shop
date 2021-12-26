const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

async function signUpNewUser(user) {
  try {
    let newUser;
    newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      street: user.street,
      email: user.email,
      password: user.password,
      identityNumber: user.identityNumber,
      isAdmin: 0,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user.password, salt);

    await newUser.save();

    return { user: newUser };
  } catch (error) {
    console.log(error);
    return { error: "server error" };
  }
}

async function checkIfEmailExists(user) {
  try {
    const checkEmail = await User.findOne({ email: user.email });
    if (checkEmail) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
async function checkIfEmailExists2(email) {
  try {
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getId(identityNumber) {
  try {
    const checkId = await User.findOne({ identityNumber: identityNumber });
    if (checkId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(credentials) {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return { error: "Invalid credentials" };
    }
    if (user.email !== credentials.email) {
      return { error: "Invalid credentials" };
    }
    if (user.password) {
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      if (!isMatch) {
        return { error: "Invalid credentials" };
      }
      delete user.password;
      return {
        user: { _id: user._id, isAdmin: user.isAdmin },
      };
    } else {
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    console.log(error);
    return { error: "server error" };
  }
}
async function getAuthUser(_id) {
  try {
    const user = await User.findById(_id).select("-password -_id");
    return user;
  } catch (error) {
    console.log(error);
    return { error: "server error" };
  }
}
async function updateSocialUser(user) {
  try {
    const result = await User.updateOne({ _id: user._id }, user);
    if (result.nModified > 0) {
      return { message: "Update successful!" };
    } else {
      return { error: "Update Failed!" };
    }
  } catch (error) {
    return { error: "Update Failed!" };
  }
}

module.exports = {
  signUpNewUser,
  loginUser,
  getAuthUser,
  checkIfEmailExists,
  getId,
  checkIfEmailExists2,
  updateSocialUser,
};
