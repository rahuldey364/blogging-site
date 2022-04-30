const authorModel = require("../Models/authorModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (!data.fname) {
      return res
        .status(401)
        .send({ status: false, msg: "First Name is required" });
    }
    if (Object.keys(data.fname).length == 0 || data.fname.length == 0) {
      return res
        .status(401)
        .send({ status: false, msg: "Enter a valid first name" });
    }
    if (!data.lname) {
      return res
        .status(401)
        .send({ status: false, msg: "Last Name is required" });
    }
    if (Object.keys(data.lname).length == 0 || req.body.lname.length == 0) {
      return res
        .status(401)
        .send({ status: false, msg: "Enter a valid last name" });
    }
    if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) {
      return res.status(401).send({
        status: false,
        msg: `Enter a valid title ["Mr","Mrs","Miss"] `,
      });
    }
    if (!data.email) {
      return res
        .status(401)
        .send({ status: false, msg: "EmailId is required" });
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
      return res
        .status(401)
        .send({ status: false, msg: "plz enter a valid Email" });
    }
    let checkIfemailExist = await authorModel.findOne({email:data.email})
    if(Object.keys(checkIfemailExist).length != 0){
        return res
        .status(401)
        .send({ status: false, msg: "email already exist" });
    }
    if (!data.password) {
      return res
        .status(401)
        .send({ status: false, msg: "Last Name is required" });
    }
    if (data.password.trim().length <= 6) {
      return res
        .status(401)
        .send({ status: false, msg: "plz enter the valid Password" });
    }
    let saved = await authorModel.create(data);
    res.status(200).send({ status: true, msg: saved });
  } catch (err) {
    console.log("This is the err", err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.createAuthor = createAuthor;
