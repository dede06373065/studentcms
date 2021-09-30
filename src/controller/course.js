const Course = require('../models/course');
const Student = require('../models/student');
const Joi = require('joi');
const student = require('../models/student');
const course = require('../models/course');
async function getAllCourses(req,res){
    //db.Course.find()在MongoDB中
    const courses = await Course.find().exec();//async await;exec()代表代码终止；
    //其他两种写法：
    //Course.findById().then().catch(); promise;
    //Course.findById((error,data)=>{});callback();
    console.log("getAllCourse");
    return res.json(courses);
}

async function getCourseById(req,res){
    const {id} = req.params;
    console.log(id);
    const course = await Course.findById(id).exec();
    if(!course){
        return res.sendStatus(404);
    }
    return res.json(course);
}

async function createCourse(req,res){
    // const {code, name, description} = req.body;
    const stringValidator = Joi.string().min(2).max(10).required();
    const schema = Joi.object({
        name: stringValidator,
        code: Joi.string().regex(/^[A-Za-z0-9]+$/).required(),
        description: Joi.string().min(2)
    })
    const {code, name, description} = await schema.validateAsync(req.body,{
        allowUnknown: true,//允许接收不存在的数据
        stripUnknown: true,//虽然接收到不存在的数据但是会删掉
        abortEarly: false//所有字段进行检测返回
    });
    console.log(code);
    const existCourse = await Course.findById(code).exec();
    if(existCourse){
        return res.sendStatus(409);
    }
    const newcourse = new Course({_id:code, name, description});
    await newcourse.save();
    console.log("createCourse");
    return res.status(201).json(newcourse);
}

async function deleteCourseById(req,res){
    const {id} = req.params;
    const targetcourse = await Course.findByIdAndDelete(id);//返回更新后的结果；
    if(!targetcourse){
        return res.sendStatus(404);
    }
    await Student.updateMany({
        courses: course._id
    },{
        $pull: {
            courses: course._id
        }
    });
    return res.json(targetcourse);
}

async function updateCourseById(req,res){
    const {name, description} = req.body;
    const {id} = req.params;
    const targetcourse = await Course.findByIdAndUpdate(id,{name,description},{new:true});//返回更新后的结果；
    if(!targetcourse){
        return res.sendStatus(404);
    }
    console.log('updateCourseById');
    return res.sendStatus(204);//no content;
    // return res.json(targetcourse);

}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourseById,
    updateCourseById
};