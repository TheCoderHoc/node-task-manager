const express = require("express");
require("./db/connection");
const userRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
// const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT;

// generic usage for all requests
// app.use(authMiddleware);

app.use(express.json());
app.use(userRouter);
app.use(TaskRouter);

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});

// const bcrypt = require("bcryptjs");

// const doSomething = async () => {
//     const password = "Red12345!";

//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log("Password: ", password);
//     console.log("Hashed Password: ", hashedPassword);

//     const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
//     console.log(isMatch);
// };

// doSomething();

// const jwt = require("jsonwebtoken");

// const doSomething = async () => {
//     const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//         expiresIn: "7 days",
//     });
//     console.log(token);

//     const data = jwt.verify(token, "thisismynewcourse");
//     console.log(data);
// };

// doSomething();

// const pet = { name: "Hal" };

// pet.toJSON = function () {
//     return {};
// };

// console.log(pet.toJSON());

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
// const task = await Task.findById("64492b8feb4cf3329ca73d58");
// await task.populate("createdBy").execPopulate();
// console.log(task.createdBy);

// const user = await User.findById("64492a58d67bd4177cad79aa");
// await user.populate("tasks").execPopulate();
// console.log(user.tasks);
// };

// main();

const multer = require("multer");

const upload = multer({
    dest: "images",
    limits: {
        fileSize: 1000000,
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Please upload a word document"));
        }

        cb(undefined, true);
    },
});

const errorMiddleware = (req, res, next) => {
    throw new Error("From my middleware");
};

app.post(
    "/upload",
    upload.single("upload"),
    (req, res) => {
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);
