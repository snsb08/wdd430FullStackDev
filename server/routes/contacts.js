var express = require('express');
var router = express.Router();
module.exports = router; 

//add to the existing imports the sequence generator
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

//router get method for getting the list of contacts in the contacts collection in the database
router.get('/',(req, res, next)=>{
    //call the Contact model find() method to get all contacts in the collection
    Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
          message: 'Contacts fetched successfully!',
          contacts: contacts
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// router post method is responsible for adding a new contact to the collection in the database
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("contacts");
  
    const contact = new Contact({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    contact.save()
      .then(createdDocument => {
        res.status(201).json({
          message: 'Contact added successfully',
          contact: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  //save method is responsible for updating an existing contact in the database.
  router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.description = req.body.description;
        contact.url = req.body.url;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
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
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });

  //router delete is responsible for deleting an existing contact in the database
  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
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
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });