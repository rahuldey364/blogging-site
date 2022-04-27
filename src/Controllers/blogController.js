//const jwt = require("jsonwebtoken");
const blogModel = require("../Models/blogModel")
const authorModel = require("../Models/authorModel")



const CreateBlog = async function (req, res) {
    try {
        let author_id = req.body.authorId
        console.log(author_id)
        let authorDetail = await authorModel.findById(author_id)
        console.log(authorDetail)
        if (!authorDetail) {
            return res.status(404).send("No Such Author exists")
        }
        let blog = req.body
        console.log(blog)
        let blogCreate = await blogModel.create(blog)
        res.status(201).send({ msg: blogCreate });
    }
    catch (err) {
        console.log("This is the error 1", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const details = req.body
        if (!blogId) { return res.status(400).send({ status: false, msg: "Please enter a blog id" }) }
        const isvalidId = await blogModel.findById(blogId)
        if(!isvalidId){return res.status(401).send({status:false,msg:"Please enter a valid blogId"})}
        const updatedDetails = await blogModel.findOneAndUpdate(
            {_id:blogId},
            {title:details.title,body:details.body,tags:details.tags,subcategory:details.subcategory,isPublished:true,publishedAt:new Date()},
            {new:true,upsert:true}
        )
        res.status(201).send({status:true,msg:updatedDetails})
    } catch (err) {
        console.log("This is the error 1", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



module.exports.CreateBlog = CreateBlog
module.exports.updateBlog=updateBlog