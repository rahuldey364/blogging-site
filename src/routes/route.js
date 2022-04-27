const express = require('express');
const router = express.Router();
const blogController=require("../Controllers/blogController")
const authorController = require("../Controllers/authorController");
const { route } = require('express/lib/application');




router.post("/createAuthor", authorController.createAuthor)
router.post("/CreateBlog",blogController.CreateBlog)


router.put("/blogs/:blogId" , blogController.updateBlog)
router.delete("/deleteBlog/:blogId" ,blogController.deleteBlog)


module.exports = router;