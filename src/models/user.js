const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("../models/task");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "Anonymous",
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            default: "anonymous@example.com",
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Please enter a valid email address!");
                }
            },
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error("Password is too weak!");
                }
            },
        },

        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age cannot be a negative number!");
                }
            },
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "createdBy",
});

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    // isModfied will be true when a user is first created and when it is modified
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete user tasks when the user is removed
userSchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({ createdBy: user._id });

    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

// userSchema.methods.getPublicProfile = function () {
//     const user = this;

//     const userObject = user.toObject();

//     delete userObject.password;
//     delete userObject.tokens;

//     return userObject;
// };

// MATCHES FOR ALL ROUTES WHERE WE SEND BACK THE USER
userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to log in!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login!");
    }

    return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
