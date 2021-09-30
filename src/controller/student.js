const Student = require('../models/student');
const Course = require('../models/course');
const student = require('../models/student');

async function getAllStudents(req,res){
    const students = await Student.find().exec();
    console.log('getAllStudents');
    return res.json(students);
}

async function getStudentById(req,res){
    const {id} = req.params;
    const student = await Student.findById(id).populate('courses','name').exec();//populate取关联数据
    if(!student){
        return res.sendStatus(404);
    }
    return res.json(student);
}

async function createStudent(req,res){
    const {firstName,lastName,email} = req.body;
    const newStudent = new Student({firstName,lastName,email});
    try{
        await newStudent.save();
    }catch(e){
        return res.send(e);
    }//抓取错误的方法；
    console.log('createStudent');
    return res.status(201).json(newStudent);
}

async function deleteStudentById(req,res){
    const {id} = req.params;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if(!deleteStudent){
        return res.sendStatus(404);
    }
    await Course.updateMany(
        // {
        //     _id:{ $in: student.courses }
        // },
        {
            students: student._id
        },
        {
            $pull:{
                students: student._id
            }
        }
    )
    return res.json(deleteStudent);
}

async function updateStudentById(req,res){
    const {id} = req.params;
    const {firstName,lastName,email} = req.body;
    const targetStudent = await Student.findByIdAndUpdate(id,{firstName,lastName,email});
    if(!targetStudent){
        return res.sendStatus(404);
    }
    return res.sendStatus(201).json(targetStudent);
}

async function addStudentToCourse(req,res){
    const {id,code} = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();
    console.log(student);
    if(!student || !course){
        return res.sendStatus(404);
    }
    student.courses.addToSet(course._id);
    course.students.addToSet(student._id);
    await student.save();//SAVE（）时自动检查；validate
    await course.save();
    return res.json(student);
}

async function removeStudentToCourse(req,res){
    const {id,code} = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();
    console.log(student);
    if(!student || !course){
        return res.sendStatus(404);
    }
    student.courses.pull(course._id);
    course.students.pull(student._id);
    await student.save();
    await course.save();
    return res.json(student);

}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    updateStudentById,
    addStudentToCourse,
    removeStudentToCourse
}