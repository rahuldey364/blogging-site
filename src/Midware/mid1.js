const loginUser = async function (req, res) {
    try{
     let userName = req.body.emailId;
     let password = req.body.password;

     let user = await userModel.findOne({ emailId: userName, password: password });
     console.log(user)
     if (!user){
      return res.status(403).send("username or the password is not corerct");
      }
          let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Uranium",
        organisation: "FunctionUp",
      },
      "functionup-Uranium" //Secret key
     );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, data: token });
  }
  catch(err){
    console.log("This is the error:",err.massage)
    res.status(500).send({msg:"Error", error:err.massage})
  }  
};