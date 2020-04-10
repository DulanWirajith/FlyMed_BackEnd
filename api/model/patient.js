const mongoose =require('mongoose');

const Patient_Schema=mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    nic:{type:String},
    password:{type:String}
});

module.exports=mongoose.model('Patient',Patient_Schema);
