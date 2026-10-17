import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PropertyDetails() {
  // YEH HAI MAGIC TRICK: Pichle page se bheja hua data yahan pakad rahe hain
  const { state } = useLocation();
  const navigate = useNavigate();
  const property = state?.property;

  // Agar galti se bina data ke page khul jaye, toh wapas bhej do
  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Property Not Found</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', background: '#ff385c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px' }}>
      
      {/* HEADER SECTION */}
      <h1 style={{ fontSize: '28px', marginBottom: '5px', color: '#222' }}>{property.title}</h1>
      <p style={{ color: '#222', fontWeight: '500', textDecoration: 'underline', marginBottom: '25px', cursor: 'pointer' }}>
        {property.address}
      </p>

      {/* BADI HERO IMAGE */}
      <div style={{ width: '100%', height: '60vh', minHeight: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
        <img
          src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* TWO COLUMN LAYOUT (Left: Details, Right: Booking Card) */}
      <div style={{ display: 'flex', gap: '8%', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: Asli Details */}
        <div style={{ flex: '1.5', minWidth: '300px' }}>
          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #ebebeb', paddingBottom: '24px', marginBottom: '24px' }}>
            Entire home hosted by {property.host?.name || 'Haven Host'}
          </h2>
          
          <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#222', marginBottom: '40px' }}>
            {property.description}
          </div>

          <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '30px', paddingBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>What this place offers</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', color: '#222', fontSize: '16px' }}>
              <li>📶 Fast Wi-Fi</li>
              <li>🚗 Free parking on premises</li>
              <li>❄️ Air conditioning</li>
              <li>🍳 Fully equipped kitchen</li>
              <li>📺 Flat-screen TV</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Reservation Card */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ background: '#fff', border: '1px solid #dddddd', borderRadius: '12px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.12)', position: 'sticky', top: '24px' }}>
            
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '24px' }}>
              <span style={{ fontSize: '22px', fontWeight: 'bold' }}>₹{property.price?.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '16px', color: '#222', marginLeft: '5px' }}> night</span>
            </div>

            <button 
              onClick={() => alert("Booking System jald hi aayega! 😉")}
              style={{ width: '100%', background: '#ff385c', color: '#fff', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', transition: '0.2s' }}
            >
              Reserve
            </button>
            
            <p style={{ textAlign: 'center', color: '#717171', fontSize: '14px', margin: 0 }}>You won't be charged yet</p>
            
            <div style={{ marginTop: '20px', borderTop: '1px solid #ebebeb', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total before taxes</span>
              <span>₹{property.price?.toLocaleString('en-IN')}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;