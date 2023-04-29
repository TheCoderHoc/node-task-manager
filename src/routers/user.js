const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const router = new express.Router();

const upload = multer({
    // dest: "avatars",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("Please upload an image file."));
        }

        callback(undefined, true);
    },
});

router.post("/users/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.send({ user, token });

        // res.send({ user: user.getPublicProfile(), token });

        // res.send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post("/users/logout", authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send("You have successfully logged out!");
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/users/logoutAll", authMiddleware, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send("You have successfully logged out from all your accounts!");
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users/me", authMiddleware, async (req, res) => {
    res.send(req.user);

    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (error) {
    //     res.status(500).send(error);
    // }
});

// router.get("/users/:id", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);

//         if (!user) {
//             return res.status(404).send("User was not found!");
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// router.patch("/users/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "password", "age"];
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     });

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "Invalid updates!" });
//     }

//     const _id = req.params.id;
//     // const userUpdates = req.body;

//     try {
//         const user = await User.findById(_id);

//         updates.forEach((update) => {
//             user[update] = req.body[update];
//         });

//         await user.save();

//         // const user = await User.findByIdAndUpdate(_id, userUpdates, {
//         //     new: true,
//         //     runValidators: true,
//         // });

//         if (!user) {
//             return res.status(404).send("User was not found!");
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

router.patch("/users/me", authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// router.delete("/users/:id", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findByIdAndDelete(_id);

//         if (!user) {
//             return res.status(404).send("User was not found!");
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.delete("/users/me", authMiddleware, async (req, res) => {
    // const id = req.user._id;

    try {
        // const user = await User.findByIdAndDelete(id);

        // if (!user) {
        //     return res.status(404).send("User was not found!");
        // }

        await req.user.remove();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post(
    "/users/me/avatar",
    authMiddleware,
    upload.single("avatar"),
    async (req, res) => {
        // req.user.avatar = req.file.buffer;
        // await req.user.save();

        // res.send();

        const buffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();

        req.user.avatar = buffer;

        await req.user.save();

        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

router.delete("/users/me/avatar", authMiddleware, async (req, res) => {
    req.user.avatar = undefined;

    await req.user.save();

    res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        // res.set("Content-Type", "image/jpg");
        res.set("Content-Type", "image/png");
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;
