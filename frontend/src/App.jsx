import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddListing from './components/AddListing';
import Auth from './components/Auth'; 
import PropertyDetails from './components/PropertyDetails';
import './App.css';

function MainApp() {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // YAHAN NAYA LINK DALA HAI
    fetch('https://airbnb-clone-dam2.vercel.app/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.log("Failed to fetch listings:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Kya sach mein is property ko delete karna hai?");
    if (!confirmDelete) return;

    try {
      // YAHAN NAYA LINK DALA HAI
      const response = await fetch(`https://airbnb-clone-dam2.vercel.app/api/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        setListings(listings.filter((listing) => listing._id !== id));
      } else {
        alert("Delete fail ho gaya.");
      }
    } catch (error) {
      console.log("Error deleting property:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); 
    navigate('/'); 
  };

  return (
    <div className="app-layout">
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <div style={{ background: '#ffffff', padding: '10px 5vw', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #ebebeb' }}>
              <span 
                onClick={() => navigate('/admin')} 
                style={{ cursor: 'pointer', marginRight: '20px', fontWeight: 'bold', color: '#222' }}
              >
                Become a Host
              </span>
              
              <button 
                onClick={() => setShowAuthModal(true)} 
                style={{ background: '#ff385c', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
              >
                Login / Sign Up
              </button>
            </div>

            <div className="category-nav">
              <div className="category-container">
                <button className="category-pill active">All Stays</button>
                <button className="category-pill">Top Rated</button>
                <button className="category-pill">Beachfront</button>
                <button className="category-pill">Luxury Villas</button>
                <button className="category-pill">Budget Friendly</button>
              </div>
            </div>

            <main className="content-container">
              <section className="feed-header">
                <h1 className="feed-title">Explore Stays</h1>
                <p className="feed-subtitle">Find your next perfect getaway</p>
              </section>

              {listings.length === 0 ? (
                <div className="loader-state"><div className="spinner"></div><p>Fetching properties...</p></div>
              ) : (
                <div className="listing-grid">
                  {listings.map((property) => (
                    <article 
                      key={property._id} 
                      className="stay-card"
                      onClick={() => navigate(`/property/${property._id}`, { state: { property } })}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="thumbnail-wrapper">
                        <img src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"} alt={property.title} className="thumbnail" />
                        <span className="badge">Featured</span>
                      </div>
                      <div className="card-body">
                        <div className="card-row">
                          <h3 className="card-title">{property.title}</h3>
                          <div className="rating"><span>★</span> 4.92</div>
                        </div>
                        <p className="card-location">{property.address}</p>
                        <p className="card-price"><span className="amount">₹{property.price?.toLocaleString('en-IN')}</span> / night</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>

            {showAuthModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                  <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: '15px', left: '15px', background: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                  <h3 style={{ textAlign: 'center', margin: '0 0 15px 0', borderBottom: '1px solid #ebebeb', paddingBottom: '15px', fontSize: '16px' }}>Log in or sign up</h3>
                  
                  <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Welcome to Haven</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <button onClick={() => setShowAuthModal(false)} style={modalBtnStyle}>
                        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        Continue with Mobile Number
                      </button>
                      <button onClick={() => setShowAuthModal(false)} style={modalBtnStyle}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" style={iconStyle} alt="Google Logo" />
                        Continue with Google
                      </button>
                      <button onClick={() => setShowAuthModal(false)} style={modalBtnStyle}>
                        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Continue as Guest
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        } />

        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route path="/admin" element={
          <div style={{ padding: '20px 5vw', minHeight: '80vh', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', color: '#ff385c' }}>Host Dashboard (CMS)</h2>
              <button onClick={() => navigate('/')} style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #222', background: '#fff', fontWeight: 'bold' }}>View Live Site</button>
            </div>

            {!user ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                <Auth onLoginSuccess={(userData) => setUser(userData)} />
              </div>
            ) : (
              <>
                <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '10px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: 0 }}>Welcome back, Host {user.name}!</h3>
                  <button onClick={handleLogout} style={{ background: '#222', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>

                <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', border: '1px solid #e0e0e0', marginBottom: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  <AddListing onAddSuccess={(newListing) => setListings([...listings, newListing])} />
                </div>

                <h3 style={{ marginBottom: '20px' }}>Manage Your Properties</h3>
                <div className="listing-grid">
                  {listings.map((property) => {
                    const isOwner = property.host && (property.host._id === user._id || property.host === user._id);
                    if (!isOwner) return null; 

                    return (
                      <article 
                        key={property._id} 
                        className="stay-card"
                        onClick={() => navigate(`/property/${property._id}`, { state: { property } })}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="thumbnail-wrapper">
                          <img src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"} alt={property.title} className="thumbnail" />
                          <button 
                            className="delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(property._id); }} 
                            title="Delete Property" 
                            style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">{property.title}</h3>
                          <p className="card-location">{property.address}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        } />
      </Routes>
    </div>
  );
}

const modalBtnStyle = { 
  position: 'relative', width: '100%', padding: '12px', borderRadius: '8px', 
  border: '1px solid #b0b0b0', background: '#fff', cursor: 'pointer', 
  fontWeight: '500', fontSize: '15px', color: '#222', display: 'flex', 
  justifyContent: 'center', alignItems: 'center' 
};
const iconStyle = { position: 'absolute', left: '20px', width: '20px', height: '20px' };

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}