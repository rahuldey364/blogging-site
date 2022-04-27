const express = require('express');
const router = express.Router();
const blogController=require("../Controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/CreateBlog",blogController.CreateBlog)


router.put("/blogs/:blogId" , blogController.updateBlog)


module.exports = router;