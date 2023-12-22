import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth(app);
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  function handleRegistration(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password.length >= 6 || !/[A-Z]/.test(password) || !specialCharacters.test(password)) {
      return setError('Password must be 6 characters with a capital letter and a special character!');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        setSuccess('User registration successful!');

        updateProfile(user, {
          displayName: name,
          photoURL: 'https://www.gstatic.com/webp/gallery/1.webp'
        })
          .then(() => {
            console.log('Profile updated!');
          })
          .catch(error => {
            // An error occurred
            console.log(error);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <form action="#" className="my-5" onSubmit={handleRegistration}>
      <div className="pb-5">
        <input type="Your Name" value={name} onChange={e => setName(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Your Name" />
      </div>
      <div className="pb-5">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Email" />
      </div>

      <div className="pb-5">
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" />
      </div>

      <button type="submit" className="bg-blue-500 p-2 w-full text-white rounded">
        Register
      </button>
      <p className={`${error ? 'my-2 text-red-700' : 'hidden'}`}>{error}</p>
      <p className={`${success ? 'my-2 text-green-700' : 'hidden'}`}>{success}</p>
    </form>
  );
};

export default RegisterForm;
