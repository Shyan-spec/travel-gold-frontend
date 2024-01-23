import React, { useState } from 'react';

export const Createaccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleCreateAccount = () => {
    // Implement your account creation logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    // You can add your account creation logic here (e.g., API calls, validation, etc.)
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />

        <button type="button" onClick={handleCreateAccount}>
          Create Account
        </button>
      </form>
    </div>
  );
};
