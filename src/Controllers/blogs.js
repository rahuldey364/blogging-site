//const jwt = require("jsonwebtoken");
const blogModel = require("../Models/blogModel")
const authorModel = require("../Models/authorModel")
const req = require("express/lib/request");


const CreateBlog = async function (req, res){
    try{
        let author_id = req.body.authorId
        console.log(author_id)
        let authorDetail = await authorModel.findById(author_id)
        console.log(authorDetail)
        if(!authorDetail){
            return res.status(404).send("No Such Author exists")
        }
        let blog = req.body
        console.log(blog)
        let blogCreate = await blogModel.create(blog)
        res.status(201).send({ msg: blogCreate });
    }
    catch (err) {
        console.log("This is the error 1", err.message)
        res.status(500).send({ msg: "Error", error:err.message})
      }
    
}



module.exports.CreateBlog=CreateBlog