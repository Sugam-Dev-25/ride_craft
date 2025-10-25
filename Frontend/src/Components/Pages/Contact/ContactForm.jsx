import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createContact, getContacts } from '../../../service/api';
import "./contact-form.css";

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState([]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      await createContact(data);
      alert('Message Sent!');
      getData();  // Fetch new data after successful submission
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch data
  const getData = async () => {
    try {
      const contacts = await getContacts();
      setFormData(contacts);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight:"800", fontSize:"20px", lineHeight:"2" }}>
            Full Name
          </label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="First Name"
              {...register('firstName', { required: 'First name is required' })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
            />
          </div>
          {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
          {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight:"800", fontSize:"20px", lineHeight:"2" }}>
            Address
          </label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Street Address"
              {...register('streetAddress', { required: 'Street Address is required' })}
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="State"
              {...register('state', { required: 'State is required' })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="ZIP Code"
              {...register('zipCode', { required: 'ZIP Code is required' })}
            />
          </div>
          {errors.streetAddress && <small className="text-danger">{errors.streetAddress.message}</small>}
          {errors.city && <small className="text-danger">{errors.city.message}</small>}
          {errors.state && <small className="text-danger">{errors.state.message}</small>}
          {errors.zipCode && <small className="text-danger">{errors.zipCode.message}</small>}
        </div>

        {/* Contact Information */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight:"800", fontSize:"20px", lineHeight:"2" }}>
            Contact Information
          </label>
          <div className="d-flex">
            <input
              type="email"
              className="form-control me-2"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              {...register('phone', { required: 'Phone is required' })}
            />
          </div>
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
          {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight:"800", fontSize:"20px", lineHeight:"2" }}>
            Message
          </label>
          <textarea
            className="form-control message-textarea"
            rows="4"
            placeholder="Message"
            {...register('message', { required: 'Message is required' })}
          ></textarea>
          {errors.message && <small className="text-danger">{errors.message.message}</small>}
        </div>

        {/* Terms & Conditions */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            {...register('terms', { required: 'You must accept the terms' })}
          />
          <label className="form-check-label">
            I agree to the Terms and Privacy Policy
          </label>
          {errors.terms && <small className="text-danger">{errors.terms.message}</small>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-dark w-100 submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
