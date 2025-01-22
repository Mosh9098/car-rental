import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-description">
        <h1>Contact Vismart Four Wheels</h1>
        <p>VISMART FOUR WHEELS is a car rental company in Kenya. We offer amazing rates for all types of automobiles available in the market. From sedans, SUVs, and minivans, you can be sure you will find what you need at Vismart Four Wheels car rental agency. You can contact us using the form below.</p>
        <div className="whatsapp-contact">
          <div className="whatsapp-icon">
            <img src="whatsapp-icon.png" alt="WhatsApp" />
          </div>
          <span>+254 799 913 533</span>
        </div>
      </div>
      <div className="contact-form">
        <form>
          <div className="form-group">
            <input type="text" placeholder="First Name" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Phone Number" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" rows="4"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
