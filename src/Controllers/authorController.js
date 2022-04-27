const authorModel= require("../models/authorModel")

const createAuthor = async function(req,res) {
    try {
    let data = req.body;
    let saved = await authorModel.create(data)
    res.status(200).send ({msg:saved})
}
catch(err){
    console.log("This is the err",err.message);
    res.status(500).send({msg:error.message})
} 
}


module.exports.createAuthor = createAuthor 
