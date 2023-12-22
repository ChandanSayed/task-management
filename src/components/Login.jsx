import React, { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Context } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const Login = () => {
  const { user, loading } = useContext(Context);
  const [login, setLogin] = useState(true);

  function handleForm(e) {
    e.preventDefault();
    setLogin(prev => !prev);
  }

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="h-screen min-h-screen max-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full p-4 rounded shadow-2xl text-gray-700 sm:w-96">
        <p className="text-center pb-2 text-3xl">Welcome</p>
        <div className="pb-5 text-sm text-center">
          <p className={`${login ? '' : 'hidden'}`}>
            You don´t have an account?{' '}
            <a href="#" onClick={handleForm} className="text-blue-500">
              Register now!
            </a>
          </p>
          <p className={`${!login ? '' : 'hidden'}`}>
            You already have an account?{' '}
            <a href="#" onClick={handleForm} className="text-blue-500">
              Login now!
            </a>
          </p>
        </div>
        {login ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
