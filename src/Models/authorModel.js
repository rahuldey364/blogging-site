const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname:{
        type:String,
        required:[true,"Firstname is required"],
        trim: true
    },
    lname:{
        type:String,
        required:[true,"Lastname is required"],
        trim: true
    },
    title:{
        type:String,
        required:[true,"Title is required"],
        trim: true,
        enum:["Mr","Mrs","Miss"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true,"Email address is required"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password:{
        type:String,
        require:[true,"Password is required"],
        trim:true
    }

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)