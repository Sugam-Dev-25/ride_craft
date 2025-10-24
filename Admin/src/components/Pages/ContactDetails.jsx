import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../../service/api'; // Assuming you already have these functions in `api.js`

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]); // State to store contacts

  // Fetch contacts from the backend when the component mounts
  const fetchContacts = async () => {
    try {
      const response = await getContacts(); // API call to fetch contacts
      setContacts(response.data); // Set the contacts in state
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Handle deleting a contact
  const handleDelete = async (id) => {
    try {
      await deleteContact(id); // Call delete function from API
      alert('Contact deleted');
      fetchContacts(); // Refresh the contact list after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Fetch contacts when component mounts
  useEffect(() => {
    fetchContacts(); // Call fetchContacts to get the data on initial render
  }, []);

  return (
    <div className="mt-2">
      <div className="card shadow mb-4">
        {/* Card Header */}
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Contact Details</h5>
        </div>

        {/* Card Body - Table */}
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle text-center w-100">
            <thead className="table-dark" style={{ backgroundColor: "#000000ff" }}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Terms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{`${contact.firstName} ${contact.lastName}`}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || 'N/A'}</td>
                    <td>{contact.message}</td>
                    <td>{contact.streetAddress}</td>
                    <td>{contact.city}</td>
                    <td>{contact.state}</td>
                    <td>{contact.zipCode}</td>
                    <td>{contact.terms ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
