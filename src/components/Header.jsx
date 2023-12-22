import React, { useContext } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { Context } from '../context/AppContext';

const Header = () => {
  const { user, userPhoto, setUser } = useContext(Context);
  const auth = getAuth(app);
  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser('');
        return <Navigate to={'/'} />;
      })
      .catch(error => {
        console.log(error);
      });
  }

  const navItems = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>

      <li>
        <NavLink className={`${user ? '' : 'hidden'}`} to={'/dashboard'}>
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink to={'/login'} className={`${!user ? '' : 'hidden'}`}>
          Login
        </NavLink>
      </li>
      <li>
        <button className={`${user ? '' : 'hidden'}`} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header>
      <div className={`navbar bg-base-100`}>
        <div className="flex-1">
          <Link to={'/'} className="text-4xl font-bold text-red-600">
            T<span className="text-yellow-500">M</span>
          </Link>
        </div>
        <div className="navbar-start">
          <div className="dropdown">
            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-100`}>
              {navItems}
            </ul>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className={`menu menu-horizontal px-1 `}>{navItems}</ul>
          </div>
        </div>

        <div className="flex-none">
          <div className={`dropdown dropdown-end ml-2 ${user ? '' : 'hidden'}`}>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile Picture" className="bg-white" src={userPhoto} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={'/dashboard'}>{user}</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
