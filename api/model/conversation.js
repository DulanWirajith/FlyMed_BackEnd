const mongoose = require('mongoose');


const Conversation_Schema = mongoose.Schema({
    sender: { type: String },
    receiver: { type: String },
    new_messages: { type: Number },
    messages: [
        {
            regarding: { type: String },
            from: { type: String },
            to: { type: String },
            message: { type: String },
            status: { type: String, default: "Delivered" },
            date: { type: Date }
        }
    ],
    started_date: { type: Date }
});
//check if there conversation exist
//if there exist
//add that message into messages array
//if there are no conversation between this users
//create conversation 
//then add message into messages array


module.exports = mongoose.model('Conversation', Conversation_Schema);