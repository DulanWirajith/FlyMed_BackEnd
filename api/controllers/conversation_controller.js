
const Conversation = require('./../db/conversation');


exports.save = (data) => {
    return new Promise((resolve, reject) => {
        Conversation.findOne({ $or: [{ sender: data.from, receiver: data.to }, { sender: data.to, receiver: data.from }] }).then((result) => {
            if (result != null) {
                Conversation.updateOne({ _id: result._id },
                    {
                        $push: {
                            messages: {
                                regarding: data.regarding,
                                from: data.from,
                                to: data.to,
                                message: data.message,
                                date: new Date()
                            }
                        }
                    }
                ).then(result2 => {
                    resolve(result2);
                }).catch(err => {
                    reject(err);
                });
            } else {
                Conversation.save({
                    sender: data.from,
                    receiver: data.to,
                    new_messages: 1,
                    messages: [
                        {
                            regarding: data.regarding,
                            from: data.from,
                            to: data.to,
                            message: data.message,
                            date: new Date()
                        }
                    ],
                    started_date: new Date()
                }).then(result3 => {
                    resolve(result3);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            resolve(err);
        });
    });
}