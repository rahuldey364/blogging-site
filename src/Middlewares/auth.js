const jwt = require("jsonwebtoken")
const authorModel = require("../Models/authorModel")

let authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) { return res.status(403).send({ status: false, msg: "Token not present" }) }
        let decodedToken = jwt.verify(token, "project-1/group-34")
        console.log(decodedToken)
        if (!decodedToken) { return res.status(403).send({ status: false, msg: "Token is invalid" }) }
        // req.decodedToken = decodedToken
        next()
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

let authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) { return res.status(403).send({ status: false, msg: "Token not present" }) }
        let decodedToken = jwt.verify(token, "project-1/group-34")
        if (!decodedToken) { return res.status(403).send({ status: false, msg: "Token is invalid" }) }
        let authorToBeModified = req.query.authorId
        let authorLoggedin = decodedToken.authorId
        if (authorToBeModified !== authorLoggedin) { return res.status(403).send({ status: false, msg: "Author logged is not allowed to modify the requested authors data" }) }
        let author = await authorModel.findById(req.query.authorId)
        if (!author) { return res.status(404).send({ status: false, msg: "no such author exists" }) }
        next()
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.authentication = authentication
module.exports.authorization = authorization