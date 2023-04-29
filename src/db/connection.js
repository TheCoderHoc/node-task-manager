const mongoose = require("mongoose");

// const dbConnectionUrl = "mongodb://127.0.0.1:27017/task-manager-api";

// mongoose.connect(dbConnectionUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// });

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
});
