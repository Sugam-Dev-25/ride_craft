const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// POST route to save form data
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, email, phone, message, terms } = req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      email,
      phone,
      message,
      terms
    });
    await newContact.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Error saving message');
  }
});

// GET route to fetch all form data
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from MongoDB
    res.status(200).json(contacts); // Return contacts as JSON response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// DELETE route to remove a specific contact submission by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;  // Get contact ID from URL parameter
    const contact = await Contact.findByIdAndDelete(contactId); // Delete the contact by ID

    if (!contact) {
      return res.status(404).send('Contact not found'); // If no contact found, return 404
    }

    res.status(200).send('Contact deleted successfully'); // If successful, return a success message
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Error deleting contact');
  }
});

module.exports = router;
