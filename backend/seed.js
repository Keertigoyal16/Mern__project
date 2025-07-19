const mongoose = require('mongoose');
const Course = require('./models/Course'); // Adjust if your path is different

mongoose.connect('mongodb://localhost:27017/digitalCourseApp', {
})
  .then(async () => {
    await Course.deleteMany({}); // Optional: clean up old data
    await Course.create({
      title: "Full Stack MERN Bootcamp",
      description: "Learn to build modern web apps with MongoDB, Express, React, and Node.",
      price: 999
    });
    console.log("✅ Sample course inserted!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
