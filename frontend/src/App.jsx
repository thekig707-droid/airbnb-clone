import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Database se aane wali properties ko store karne ke liye
  const [listings, setListings] = useState([]);

  // Jaise hi website khule, backend (Port 5001) se data mangwao
  useEffect(() => {
    fetch('http://localhost:5001/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.log("Data laane mein error:", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Airbnb Clone mein aapka swagat hai! "Goa Edition"🚀</h1>
      <h2>Hamari Properties:</h2>
      
      {listings.length === 0 ? (
        <p>Loading properties...</p>
      ) : (
        listings.map((property) => (
          <div key={property._id} style={{ 
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            padding: '15px', 
            marginTop: '15px',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p><strong>Location:</strong> {property.address}</p>
            <p><strong>Price:</strong> ₹{property.price} / night</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;