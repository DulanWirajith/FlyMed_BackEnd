const Conversation = require('./../model/conversation');

exports.save = (query) => {
    return new Promise((resolve, reject) => {
        Conversation.create(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
};

exports.findOne=(query)=>{
    return new Promise((resolve,reject)=>{
        Conversation.findOne(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findAll=(query)=>{
    return new Promise((resolve,reject)=>{
        Conversation.find(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


exports.updateOne=(where,update)=>{
    return new Promise((resolve,reject)=>{
        Conversation.updateOne(where,update).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};
