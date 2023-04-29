require("../src/db/connection");
const User = require("../src/models/user");

// User.findByIdAndUpdate("64406ae65daa5102609ad644", {
//     age: 1,
// })
//     .then((user) => {
//         console.log(user);

//         return User.countDocuments({ age: 1 });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age });
//     const count = await User.countDocuments({ age });

//     return count;
// };

// updateAgeAndCount("64406ae65daa5102609ad644", 100)
//     .then((count) => {
//         console.log(count);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


