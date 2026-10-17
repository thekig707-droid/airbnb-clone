import React, { useState } from 'react';

function AddListing({ onAddSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); // Naya state: Loading dikhane ke liye

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    const newProperty = { 
      title, 
      description,
      address, 
      price: Number(price),
      image: image || undefined 
    };

    try {
      const response = await fetch('http://localhost:5001/api/listings', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        const savedProperty = await response.json();
        onAddSuccess(savedProperty); 
        
        // Form khali kar do
        setTitle('');
        setDescription('');
        setAddress('');
        setPrice('');
        setImage('');
        alert("Property successfully live ho gayi! 🎉");
      } else {
        alert("Property add fail! (Details check karein)");
      }
    } catch (error) {
      console.log("Error adding property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)', border: '1px solid #ebebeb' }}>
      <div style={{ marginBottom: '25px', borderBottom: '1px solid #ebebeb', paddingBottom: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', color: '#222' }}>List a New Property</h2>
        <p style={{ margin: '5px 0 0 0', color: '#717171', fontSize: '14px' }}>Fill in the details below to make your property live on Haven.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ROW 1: Title & Price */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={labelStyle}>Property Title <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              placeholder="e.g. Luxury Beachfront Villa" 
              value={title} onChange={(e) => setTitle(e.target.value)} required 
              style={inputStyle}
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={labelStyle}>Price per night (₹) <span style={{color: 'red'}}>*</span></label>
            <input 
              type="number" 
              placeholder="e.g. 5000" 
              value={price} onChange={(e) => setPrice(e.target.value)} required 
              style={inputStyle}
            />
          </div>
        </div>

        {/* ROW 2: Location & Image */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={labelStyle}>Full Address / Location <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              placeholder="e.g. North Goa, Near Baga Beach" 
              value={address} onChange={(e) => setAddress(e.target.value)} required 
              style={inputStyle}
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={labelStyle}>Image URL (Optional)</label>
            <input 
              type="text" 
              placeholder="https://images.unsplash.com/..." 
              value={image} onChange={(e) => setImage(e.target.value)} 
              style={inputStyle}
            />
          </div>
        </div>

        {/* ROW 3: Description */}
        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Property Description <span style={{color: 'red'}}>*</span></label>
          <textarea 
            placeholder="Describe what makes your place unique..." 
            value={description} onChange={(e) => setDescription(e.target.value)} required 
            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              background: isLoading ? '#ffb3c1' : '#ff385c', 
              color: 'white', 
              border: 'none', 
              padding: '12px 30px', 
              borderRadius: '8px', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold', 
              fontSize: '16px',
              transition: '0.2s'
            }}
          >
            {isLoading ? 'Publishing...' : 'Publish Property'}
          </button>
        </div>
        
      </form>
    </div>
  );
}

// Styling Variables
const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  fontSize: '14px',
  color: '#222'
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid #cccccc',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default AddListing;