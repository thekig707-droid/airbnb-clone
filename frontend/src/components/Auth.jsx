import React, { useState } from 'react';

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      // YAHAN CHANGE HAI: localhost hataya, seedha endpoint call hoga
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(isLogin ? "Login Successful! 🎉" : "Account Created! 🎉");
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify(data));
        onLoginSuccess(data); 
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.log("Auth error:", error);
    }
  };

  return (
    <div className="add-listing-container">
      <h3>{isLogin ? 'Login to Haven' : 'Join Haven'}</h3>
      <form onSubmit={handleSubmit} className="add-listing-form">
        {!isLogin && (
          <input 
            type="text" placeholder="Full Name" 
            value={name} onChange={(e) => setName(e.target.value)} required 
          />
        )}
        <input 
          type="email" placeholder="Email Address" 
          value={email} onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p 
        onClick={() => setIsLogin(!isLogin)} 
        style={{ color: '#ff385c', cursor: 'pointer', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}
      >
        {isLogin ? "Naya account banana hai? Sign up yahan karein" : "Pehle se account hai? Login karein"}
      </p>
    </div>
  );
}

export default Auth;