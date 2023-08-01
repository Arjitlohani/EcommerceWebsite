const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const JWT_SECRET_CODE = 'mysecretcode123';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String, required: true
    },
    lastName:{
        type: String, required: true
    },
    email:{
        type: String, required: true
    },
    password:{
        type: String, required: true
    },
    role:{
        type: String, required: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, JWT_SECRET_CODE, {expiresIn: '7d'});
    return token
}


const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName : Joi.string().required().label('First Name'),
        lastName : Joi.string().required().label('Last Name'),
        email : Joi.string().required().label('Email'),
        password : passwordComplexity().required().label('Password'),
        role: Joi.string().label('Role')
    });
    return schema.validate(data);
};


module.exports = {User, validate}
