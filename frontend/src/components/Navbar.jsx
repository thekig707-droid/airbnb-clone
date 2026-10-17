import React from 'react';

function Navbar({ user, onLogout, isHostMode, setIsHostMode }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', borderBottom: '1px solid #ebebeb', backgroundColor: 'white' }}>
      
      {/* LEFT: Premium Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff385c">
          <path d="M12 2L2 12h3v8h14v-8h3L12 2z"/>
        </svg>
        <h2 style={{ color: '#ff385c', margin: 0, fontSize: '24px', letterSpacing: '-1px' }}>Haven</h2>
      </div>

      {/* RIGHT: User Profile & Host Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Agar user login hai, toh Host switch dikhao */}
        {user && (
          <button 
            onClick={() => setIsHostMode(!isHostMode)}
            style={{ background: 'transparent', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', padding: '10px', borderRadius: '20px' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f7f7f7'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isHostMode ? "Switch to Guest" : "Airbnb your home"}
          </button>
        )}

        {/* User Profile / Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '16px' }}>☰</span>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'black', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                {user.name.charAt(0).toUpperCase()}
              </span>
              <button 
                onClick={onLogout} 
                style={{ background: 'none', border: 'none', color: '#ff385c', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <span style={{ background: '#717171', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              👤
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;