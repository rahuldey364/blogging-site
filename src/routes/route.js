const express = require('express');
const router = express.Router();
const CreateBlog=require("../Controllers/blogs")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/CreateBlog",CreateBlog.CreateBlog)


module.exports = router;