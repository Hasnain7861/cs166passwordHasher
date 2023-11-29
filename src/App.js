import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './App.css'; 

function App() {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      setHashedPassword(hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <form className="password-form" onSubmit={handleFormSubmit}>
        <label>
          Enter Password:
          <input type="password" value={password} onChange={handleInputChange} />
        </label>
        <button type="submit">Hash Password</button>
      </form>

      {hashedPassword && (
        <div className="result-container">
          <h3>Hashed Password:</h3>
          <p>{hashedPassword}</p>
        </div>
      )}
    </div>
  );
}

export default App;
