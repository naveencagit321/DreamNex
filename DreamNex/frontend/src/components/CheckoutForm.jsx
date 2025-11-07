import React, { useState } from 'react';

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment processing here
        console.log('Payment data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label>Card Number:</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Expiry Date:</label>
                <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
            </div>
            <div>
                <label>CVV:</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
            </div>
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default CheckoutForm;