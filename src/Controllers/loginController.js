const authorModel = require("../Models/authorModel")
const jwt = require('jsonwebtoken')

const authorLogin = async function(req,res){
    try{
        let authorEmail = req.body.email
        let authorPassword = req.body.password
        let isAuthor = await authorModel.findOne({email:authorEmail,password:authorPassword})
        console.log(isAuthor)
        if(!isAuthor){ return res.status(404).send({status:false,msg:"No such author exists"})}
        let token = jwt.sign(
            {
                authorId : isAuthor._id.toString()
            },
            "project-1/group-34"
        )
        res.setHeader("x-api-key",token)
        res.status(201).send({status:true,msg:token})
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}





module.exports.authorLogin=authorLogin