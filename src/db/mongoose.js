const mongoose = require("mongoose");
const validator = require("validator");

const dbConnectionUrl = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

// const User = mongoose.model("User", {
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//     },
// });

// const me = new User({
//     name: "Dave",
//     age: 23,
// });

// me.save()
//     .then((me) => {
//         console.log(me);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const Task = mongoose.model("Task", {
//     description: {
//         type: String,
//     },
//     completed: {
//         type: Boolean,
//     },
// });

// const myTask = new Task({
//     description: "Pick up Noella from school.",
//     completed: false,
// });

// myTask
//     .save()
//     .then((myTask) => {
//         console.log(myTask);
//     })
//     .catch((error) => {
//         console.log("An error occurred!", error);
//     });

// const User = mongoose.model("User", {
//     name: {
//         type: String,
//         required: true,
//         default: "Anonymous",
//         trim: true,
//     },

//     email: {
//         type: String,
//         required: true,
//         default: "anonymous@gmail.com",
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Please enter a valid email!");
//             }
//         },
//     },

//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes("password")) {
//                 throw new Error("Password is too weak!");
//             }
//         },
//     },

//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("Age must be a positive number");
//             }
//         },
//     },
// });

// const user = new User({
//     name: "Dave Wilson",
//     email: "ubakawilson@gmail.com",
//     age: 23,
//     password: "Password",
// });

// user.save()
//     .then((user) => {
//         console.log(user);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const task = new Task({
    description: "Buy cheese.",
});

task.save()
    .then((task) => {
        console.log(task);
    })
    .catch((error) => {
        console.log("An error occurred!", error);
    });
