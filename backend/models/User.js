const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
    {fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:null
    }
    },

    {timestamps:true}
)

//Mash password before saving user
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);    
    next()
})

//compare password

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User',UserSchema);