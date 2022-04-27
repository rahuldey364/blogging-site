const express = require('express');
const router = express.Router();
const blogController=require("../Controllers/blogController")
const authorController = require("../Controllers/authorController");
const { route } = require('express/lib/application');




router.post("/createAuthor", authorController.createAuthor)
router.post("/CreateBlog",blogController.CreateBlog)
router.get('/GetData',blogController.GetData)
router.put("/blogs/:blogId" , blogController.updateBlog)
router.delete("/blogs/:blogId" ,blogController.deleteBlog)
router.delete("/blogs",blogController.deleteQuery)


module.exports = router;