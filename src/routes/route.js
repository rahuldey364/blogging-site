const express = require('express');
const router = express.Router();
const blogController=require("../Controllers/blogController")
const authorController = require("../Controllers/authorController")




router.post("/createAuthor", authorController.createAuthor)
router.post("/CreateBlog",blogController.CreateBlog)


router.put("/blogs/:blogId" , blogController.updateBlog)


module.exports = router;