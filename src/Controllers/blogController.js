const blogModel = require("../Models/blogModel")
const authorModel = require("../Models/authorModel")



const CreateBlog = async function (req, res) {
    try {
        let author_id = req.body.authorId
        // console.log(author_id)
        let authorDetail = await authorModel.findById(author_id)
        // console.log(authorDetail)
        if (!authorDetail) {
            return res.status(404).send("No Such Author exists")
        }
        let blog = req.body
        // console.log(blog)
        let blogCreate = await blogModel.create(blog)
        res.status(201).send({ msg: blogCreate });
    }
    catch (err) {
        // console.log("This is the error 1", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}


const GetData = async function (req, res) {
    try {
      let query = req.query;
  console.log(query)
      let GetRecord = await blogModel.find({
        $and: [{ isPublished: true, isDeleted: false, ...query }],
      });
      if (GetRecord.length == 0) {
        return res.status(404).send({
          msg: "No such document exist with the given attributes.",
        });
      }
      res.status(200).send({ status: true, msg: GetRecord });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };







const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const details = req.body
        if (!blogId) { return res.status(400).send({ status: false, msg: "Please enter a blog id" }) }
        const isvalidId = await blogModel.findById(blogId)
        if (!isvalidId) { return res.status(401).send({ status: false, msg: "Please enter a valid blogId" }) }
        const updatedDetails = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { title: details.title, body: details.body, tags: details.tags, subcategory: details.subcategory, isPublished: true, publishedAt: new Date() },
            { new: true, upsert: true }
        )
        res.status(201).send({ status: true, msg: updatedDetails })
    } catch (err) {
        console.log("This is the error 1", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



const deleteBlog = async function (req, res) {
    try {
        let blogsId = req.params.blogId;
         //console.log(blogsId)
        let blog = await blogModel.findById(blogsId);
        //Return an error if no user with the given id exists in db
        if (!blog) {
            return res.status(404).send({ status:false , msg:"No such Blog exists"});
        }
        if(blog.isDeleted === true){
            return res.status(404).send({ status:false ,msg:"Blog already deleted"})
        }
        let deleteBlogs = await blogModel.findOneAndUpdate({ _id: blogsId }, { $set: { isDeleted: true, deletedAt:new Date() } }, { new: true });
        res.status(200).send({ status: true, data: deleteBlogs })
    }
    catch (err) {
        console.log("This is the error 1", err.massage)
        res.status(500).send({ status:false, msg: err.massage })
    }
}



const deleteQuery = async function (req, res) {
    try {
        let data = req.query
        const filterbyquery = await blogModel.find(data)
        if (filterbyquery.length === 0) { return res.send({ status: false, mag: "No Such blogs" }) }

        const deleteDetails = await blogModel.updateMany(data,{$set:{ isDeleted: true, deletedAt: new Date() }},{new: true })
        console.log(deleteDetails)
        res.status(201).send({ status: true, msg: deleteDetails })
    }
    catch (err) {
        console.log("This is the error 1", err.massage)
        res.status(500).send({ status:false, msg: err.massage })
    }
}



module.exports.CreateBlog = CreateBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteQuery = deleteQuery

module.exports.GetData = GetData
