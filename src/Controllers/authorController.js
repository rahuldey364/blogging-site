
const authorModel = require("../Models/authorModel")

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if(!req.bady.fname){
            res.status(401).send({status:false, msg: "First Name is required" })
        }
        if( Object.keys(req.body.fname).length == 0 || req.body.fname.length==0 ){
            res.status(401).send({status:false, msg: "Enter a valid first name" })
        }
        let saved = await authorModel.create(data)
        res.status(200).send({status:true, msg: saved })
    }
    catch (err) {
        console.log("This is the err", err.message);
        res.status(500).send({status:false, msg: err.message })
    }
}


module.exports.createAuthor = createAuthor 
