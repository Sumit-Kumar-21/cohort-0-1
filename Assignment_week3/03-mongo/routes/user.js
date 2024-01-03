// const { Router } = require("express");
const express = require("express");
const { User, Course } = require("../db");
const router = express.Router();
const userMiddleware = require("../middleware/user");
const app = express();

app.use(express.json());

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const body = req.body;
  User.create({
    username: body.username,
    password: body.password,
  });
  res.status(200).json({
    msg: `User is created, your username is ${body.username} and password is ${body.password}`,
  });
});

router.get("/view/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  // const html = `
  //   <ol>
  //   ${courses
  //     .map((data) => {
  //       `<li type="1">${`<h3>${data.title}</h3><img src="${data.imageUrl}"><h6>${data.description}</h6><p>Price:${data.price}</p>`}</li>`;
  //     })
  //     .join(" ")}
  //   </ol>
  //   `;
  // res.json({ html });
  res.json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const isPurched = req.body.isPurched;
  const courseId = req.params.courseId;
  await Course.findByIdAndUpdate(courseId, {isPurched: isPurched});
  const courses = await Course.findById(courseId);
  // const html = `
  //   <ol>
  //   ${courses.map((data)=>{
  //       `<li type="1">${`<h3>${data.title}</h3><img src="${data.imageUrl}"><h6>${data.description}</h6><p>Price:${data.price}</p>`}<br><Course Purched: ${data.isPurched}</li>`
  //   }).join(" ")}
  //   </ol>
  //   `
  res.json({ courses, message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  Course.find({
    isPurched: true,
  }).then((courses) => res.json(courses));
});

module.exports = router;
