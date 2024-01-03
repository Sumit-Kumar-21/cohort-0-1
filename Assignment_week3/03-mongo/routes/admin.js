const express = require('express')
// const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const app = express();

app.use(express.json());

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const body = req.body;
  Admin.create({
    username: body.username,
    password: body.password,
  });
  res.status(200).json({
    msg: `Admin is created, your username is ${body.username} and password is ${body.password}`,
  });
});

router.post("/create/courses", adminMiddleware,async (req, res) => {
  // Implement course creation logic
  const document = req.body;
  Course.create({
    title: document.title,
    description: document.description,
    price: document.price,
    imageUrl: document.imageUrl,
    published: document.published,
  });

  const findid =await Course.findOne({description:document.description});
  const id = findid._id
  
  res.json({
    message: 'Course created successfully',
      courseId: `${id}`
  });
});

router.get("/view/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
    const courses= await Course.find({})
    // const html = `
    // <ol>
    // ${courses.map((data)=>{
    //     `<li type="1">${`<h3>${data.title}</h3><img src="${data.imageUrl}"><h6>${data.description}</h6><p>Price:${data.price}</p>`}</li>`
    // }).join(" ")}
    // </ol>
    // `
    // res.send(html)
    res.json({courses})
});

module.exports = router;
