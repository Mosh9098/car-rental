import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import emailjs from 'emailjs-com';

function RentalForm({ car }) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [rentalStart, setRentalStart] = useState('');
  const [rentalEnd, setRentalEnd] = useState('');
  const [rentalDuration, setRentalDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const signatureRef = useRef(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(rentalStart);
    const endDate = new Date(rentalEnd);
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); 
    const pricePerDay = parseFloat(car.price.replace(/[^\d.]/g, ''));
    const totalPrice = numberOfDays * pricePerDay; 

    setRentalDuration(numberOfDays);
    setTotalPrice(totalPrice);

    // Get the signature data URL
    const signatureData = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');

    // EmailJS parameters
    const templateParams = {
      customer_name: customerName,
      id_number: idNumber,
      phone_number: phoneNumber,
      email: email,
      rental_start: rentalStart,
      rental_end: rentalEnd,
      rental_duration: numberOfDays,
      total_price: totalPrice,
      car_make: car.make,
      car_model: car.model,
      car_price: car.price,
      signature: signatureData
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.error('FAILED...', error);
      });

    navigate('/');
  };

  return (
    <div className="rental-form-container">

      <form className="rental-form" onSubmit={handleSubmit}>
        <h3>Rental Agreement</h3>
        <label>Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </label>
        <label>ID Number:
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
        </label>
        <label>Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Rental Start:
          <input type="date" value={rentalStart} onChange={(e) => setRentalStart(e.target.value)} />
        </label>
        <label>Rental End:
          <input type="date" value={rentalEnd} onChange={(e) => setRentalEnd(e.target.value)} />
        </label>
        <label>Signature:
          <SignatureCanvas 
            ref={signatureRef} 
            penColor="black"
            canvasProps={{className: 'signature-canvas'}}
          />
        </label>
        <button type="submit">Submit Rental</button>
      </form>
      
      <div className="selected-car-detail">
        <h2>Selected Car Details</h2>
        <img src={car.image} alt={`${car.make} ${car.model}`} />
        <p>{`Make: ${car.make}`}</p>
        <p>{`Model: ${car.model}`}</p>
        <p>{`Price: ${car.price}`}</p>
        <p>{`Rental Duration: ${rentalDuration} days`}</p>
        <p>{`Total Price: ${totalPrice}`}</p>
      </div>
    </div>
  );
}

export default RentalForm;
