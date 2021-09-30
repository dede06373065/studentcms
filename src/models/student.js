const {Schema,model} = require('mongoose');
const Joi = require('joi');//做数据验证的一个包；

const schema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        minlength:2
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        // validate: {
        //     validator: (email)=>{
        //         return !Joi.string().email().validate(email);
        //     },
        //     msg: 'Invalid email format.'
        // }
    },
    courses: [
        {type: String, ref:'Course'}
    ],
},{
    timestamps: true,
    id: true
})

module.exports = model('Student',schema)
