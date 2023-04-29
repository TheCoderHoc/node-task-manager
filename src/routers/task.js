const express = require("express");
const authMiddleware = require("../middleware/auth");
const Task = require("../models/task");

const router = new express.Router();

router.post("/tasks", authMiddleware, async (req, res) => {
    // const task = new Task(req.body);

    const task = new Task({ ...req.body, createdBy: req.user._id });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(task);
    }
});

router.get("/tasks", authMiddleware, async (req, res) => {
    try {
        // const tasks = await Task.find({ createdBy: req.user._id });
        // res.send(tasks);

        // await req.user.populate("tasks").execPopulate();

        const match = {};
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === "true";
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }

        await req.user
            .populate({
                path: "tasks",
                // match: {
                //     completed: false,
                // },
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    // 1 = asc & -1 = desc
                    // sort: {
                    //     createdAt: -1,
                    // },
                    sort,
                },
            })
            .execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        // const task = await Task.findById(id);

        const task = await Task.findOne({ _id: id, createdBy: req.user._id });

        if (!task) {
            return res.status(404).send("Task was not found!");
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/tasks/:id", authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    const id = req.params.id;

    try {
        // const task = await Task.findById(_id);

        const task = await Task.findOne({ _id: id, createdBy: req.user._id });

        // const task = await Task.findByIdAndUpdate(_id, taskUpdates, {
        //     new: true,
        //     runValidators: true,
        // });

        if (!task) {
            return res.status(404).send("Task was not found!");
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/tasks/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        // const task = await Task.findByIdAndDelete(_id);

        const task = await Task.findOneAndDelete({
            _id: id,
            createdBy: req.user._id,
        });

        if (!task) {
            return res.status(404).send("Task was not found!");
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

module.exports = router;
