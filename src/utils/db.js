const mongoose = require('mongoose');

exports.connectToDB = () => {
    const connectionString = process.env.CONNECTION_STRING;
    const db = mongoose.connection;
//监听是否DB连接成功
    db.on('connected',()=>{
        console.log(`DB connected with ${connectionString}`)
});
    db.on('error',(error) =>{
        console.log('DB connection failed');
        console.log(error.message);
    //正常关闭；
    //手动非正常关闭；
    //人为非正常关闭；*process.exit(非零)；
    //人为正常关闭；* process.exit(0);
        process.exit(1);//server什么都干不了；
    });
    db.on('disconnected',()=>{
    console.log('disconnected!');
}   )

    mongoose.connect(connectionString);
}

