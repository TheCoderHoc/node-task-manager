require("../src/db/connection");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("644154081b48b818482781c5")
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed: false });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteTaskAndCount("6441541881218b28287b7154")
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });
