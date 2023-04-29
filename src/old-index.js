// app.post("/users", async (req, res) => {
//     const user = new User(req.body);

//     // user.save()
//     //     .then((user) => {
//     //         // res.status(201);
//     //         // res.send(user);

//     //         // chaining version
//     //         res.status(201).send(user);
//     //     })
//     //     .catch((error) => {
//     //         // res.status(400);
//     //         // res.send(error);

//     //         // chaining version
//     //         res.status(400).send(error);
//     //     });

//     try {
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// app.get("/users", async (req, res) => {
//     // User.find({})
//     //     .then((users) => {
//     //         res.status(200).send(users);
//     //     })
//     //     .catch((error) => {
//     //         res.status(500).send(error);
//     //     });

//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// app.get("/users/:id", async (req, res) => {
//     const _id = req.params.id;

//     // User.findById(_id)
//     //     .then((user) => {
//     //         if (!user) {
//     //             return res.status(404).send("User was not found!");
//     //         }

//     //         res.status(200).send(user);
//     //     })
//     //     .catch((error) => {
//     //         res.status(500).send(error);
//     //     });

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

// app.patch("/users/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "password", "age"];
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     });

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "Invalid updates!" });
//     }

//     const _id = req.params.id;
//     const userUpdates = req.body;

//     try {
//         const user = await User.findByIdAndUpdate(_id, userUpdates, {
//             new: true,
//             runValidators: true,
//         });

//         if (!user) {
//             return res.status(404).send("User was not found!");
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// app.delete("/users/:id", async (req, res) => {
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

// app.post("/tasks", async (req, res) => {
//     const task = new Task(req.body);

//     // task.save()
//     //     .then((task) => {
//     //         res.status(201).send(task);
//     //     })
//     //     .catch((error) => {
//     //         res.status(400).send(error);
//     //     });

//     try {
//         await task.save();
//         res.status(201).send(task);
//     } catch (error) {
//         res.status(500).send(task);
//     }
// });

// app.get("/tasks", async (req, res) => {
//     // Task.find({})
//     //     .then((tasks) => {
//     //         res.status(200).send(tasks);
//     //     })
//     //     .catch((error) => {
//     //         res.status(500).send(error);
//     //     });

//     try {
//         const tasks = await Task.find({});
//         res.send(tasks);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// app.get("/tasks/:id", async (req, res) => {
//     const _id = req.params.id;

//     // Task.findById(_id)
//     //     .then((task) => {
//     //         if (!task) {
//     //             return res.status(404).send("Task was not found!");
//     //         }

//     //         res.status(200).send(task);
//     //     })
//     //     .catch((error) => {
//     //         res.status(500).send(error);
//     //     });

//     try {
//         const task = await Task.findById(_id);

//         if (!task) {
//             return res.status(404).send("Task was not found!");
//         }

//         res.send(task);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// app.patch("/tasks/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["description", "completed"];
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     });

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "Invalid updates!" });
//     }

//     const _id = req.params.id;
//     const taskUpdates = req.body;

//     try {
//         const task = await Task.findByIdAndUpdate(_id, taskUpdates, {
//             new: true,
//             runValidators: true,
//         });

//         if (!task) {
//             return res.status(404).send("Task was not found!");
//         }

//         res.send(task);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// app.delete("/tasks/:id", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const task = await Task.findByIdAndDelete(_id);

//         if (!task) {
//             return res.status(404).send("Task was not found!");
//         }

//         res.send(task);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error);
//     }
// });
