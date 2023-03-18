const mongoose = require('mongoose');

//might be different for your project, this is from tutorial
const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);

//Contacts Schema
const contactsSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    imageUrl: {type: String, required: true},
    group: {type: Array, required: true},
});

module.exports = mongoose.model('Contacts', postSchema);

//Documents Schema
const documentsSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    children: {type: Array, required: true}

});

module.exports = mongoose.model('Documents', postSchema);

//Messages Schema
const messagesSchema = mongoose.Schema({
    id: { type: String, required: true},
    subject: {type: String, required: true},
    msgText: {type: String, required: true},
    sender: {type: String, required: true}

});

module.exports = mongoose.model('Messages', postSchema);