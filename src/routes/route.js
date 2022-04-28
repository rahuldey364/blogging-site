const express = require('express');
const router = express.Router();
const blogController = require("../Controllers/blogController");
const authorController = require("../Controllers/authorController");
const { route } = require('express/lib/application');
const loginController= require("../Controllers/loginController");
const auth = require("../Middlewares/auth");





router.post("/authors", authorController.createAuthor)
router.post("/CreateBlog",auth.authentication,blogController.CreateBlog)
router.get('/GetData',auth.authentication,blogController.GetData)
router.put("/blogs/:blogId" , auth.authentication,auth.authorization,blogController.updateBlog)
router.delete("/blogs/:blogId" ,blogController.deleteBlog)
router.delete("/blogs",blogController.deleteQuery)
router.post("/login",loginController.authorLogin)


module.exports = router;