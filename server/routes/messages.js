var express = require('express');
var router = express.Router();
module.exports = router; 

//add to the existing imports the sequence generator
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

//router get method for getting the list of messages in the messages collection in the database
router.get('/',(req, res, next)=>{
    //call the Message model find() method to get all messages in the collection
   Message.find()
        .then((messages) =>{
        if(error) {
            return res.status(500).json({
                tittle: 'An error occured',
                error: error
            });
        }
        return res.status(200).json({
            //list of messages
            messages: messages 
        })
    })
});

// router post method is responsible for adding a new message to the collection in the database
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    message.save()
      .then(createdDocument => {
        res.status(201).json({
          message: 'Message added successfully',
          message: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  //save method is responsible for updating an existing message in the database.
  router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.name = req.body.name;
        message.description = req.body.description;
        message.url = req.body.url;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });

  //router delete is responsible for deleting an existing message in the database
  router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });