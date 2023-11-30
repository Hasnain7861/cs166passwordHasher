import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    const simplePasswords = ['123456', 'password', 'qwerty', 'abc123', 'letmein'];
    const hashedPasswords = simplePasswords.map(async (p) => {
      const salt = "$2a$10$8JHsXZ7Z9Z7Z9Z7Z9Z7Z9Z";
      const hash = await bcrypt.hash(p, salt);
      return { password: p, hash };
    });

    Promise.all(hashedPasswords).then(setPasswordList);
  }, []);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const salt = "$2a$10$8JHsXZ7Z9Z7Z9Z7Z9Z7Z9Z";
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
          <input type="text" value={password} onChange={handleInputChange} />
        </label>
        <button type="submit">Hash Password</button>
      </form>

      {hashedPassword && (
        <div className="result-container">
          <h3>Hashed Password:</h3>
          <p>{hashedPassword}</p>
        </div>
      )}

      <div className="password-list">
        <h3>Test Passwords and Their Hashes:</h3>
        <ul>
          {passwordList.map(({ password, hash }, index) => (
            <li key={index}>
              <strong>Password:</strong> {password} <br/><strong>Hash:</strong> {hash}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
