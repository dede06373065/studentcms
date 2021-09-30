module.exports = (error, req, res, next)=>{
    console.log(error.name);
    if(error.name === 'ValidationError'){
        if(process.env.NODE_ENV === 'production'){
            // const {details} = error;
            // const errorMsg = details.map(i=> ({
            //     message: i.message
            // }));
            return res.status(400).json(errorMsg.message);

        }else{
            console.log("development:",error.message);
            return res.status(400).json(error);
        }
    }

    return res.status(500).json(error);
}