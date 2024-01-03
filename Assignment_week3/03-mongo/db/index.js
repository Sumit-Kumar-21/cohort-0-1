const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://*****:*****@cluster0.kpmct6i.mongodb.net/course_sell');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String, 
    price: Number,
    imageUrl: String,
    published: Boolean,
    isPurched: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}