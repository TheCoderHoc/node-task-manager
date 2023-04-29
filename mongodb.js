// crud -> create -> read -> update -> delete
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// arguments
// connection url
// options object
// callback function => called when we actually connect to the database
MongoClient.connect(
    connectionUrl,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            console.log("Error: ", error);
            return console.log("Unable to connect to database!");
        }

        // returns database reference
        const db = client.db(databaseName);

        db.collection("users").insertOne(
            {
                _id: id,
                name: "Kelvin",
                age: 18,
            },
            (error, result) => {
                if (error) {
                    return console.log("Unable to insert user!");
                }

                console.log(result.ops);
            }
        );

        db.collection("users").insertMany(
            [
                { name: "Clifford", age: 28 },
                { name: "Desmond", age: 35 },
            ],
            (error, result) => {
                if (error) {
                    return console.log("Unable to insert users!");
                }

                console.log(result.ops);
            }
        );

        db.collection("tasks").insertMany(
            [
                {
                    description: "Pick up Noella from school.",
                    completed: true,
                },
                {
                    description: "Buy some items from the grocery shop.",
                    completed: true,
                },
                {
                    description:
                        "Purchase a new iPhone 13 Pro Max from the Apple store.",
                    completed: false,
                },
            ],
            (error, result) => {
                if (error) {
                    return console.log("Unable to insert users!");
                }

                console.log(result.ops);
            }
        );

        // reading data from the database
        // object is used to specify a search criteria
        db.collection("users").findOne({ name: "Desmond" }, (error, user) => {
            if (error) {
                return console.log("Unable to fetch user!");
            }

            console.log(user);
        });

        // find by id
        db.collection("users").findOne(
            {
                _id: new ObjectID("643d82f991f0ae1174125c43"),
            },
            (error, user) => {
                if (error) {
                    return console.log("Unable to fetch user!");
                }

                console.log(user);
            }
        );

        // search for multiple values
        db.collection("users")
            .find({ age: 18 })
            .toArray((error, users) => {
                if (error) {
                    return console.log("Unable to fetch users!");
                }

                console.log(users);
            });

        db.collection("users")
            .find({ age: 22 })
            .count((error, count) => {
                if (error) {
                    return console.log("Unable to retrieve count!");
                }

                console.log(count);
            });

        // challenge
        db.collection("tasks").findOne(
            {
                _id: new ObjectID("643d8b89f744522884ce1a0f"),
            },
            (error, task) => {
                if (error) {
                    return console.log("Unable to retrieve task!");
                }

                console.log(task);
            }
        );

        db.collection("tasks")
            .find({ completed: false })
            .toArray((error, tasks) => {
                if (error) {
                    return console.log("Unable to retrieve tasks!");
                }

                console.log(tasks);
            });

        // updateOne & updateMany
        const updatePromise = db.collection("users").updateOne(
            {
                _id: new ObjectID("643d8653ce9bcc098cbf508f"),
            },
            {
                $set: {
                    name: "Judith",
                },
            }
        );

        updatePromise
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        db.collection("tasks")
            .updateMany(
                { completed: true },
                {
                    $set: {
                        completed: false,
                    },
                }
            )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        // deleteOne and deleteMany
        db.collection("users")
            .deleteMany({ age: 22 })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        db.collection("users")
            .deleteOne({ name: "Kelvin" })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);
