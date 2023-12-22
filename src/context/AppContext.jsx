import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const Context = createContext(null);

export default function AppContext({ children }) {
  const [user, setUser] = useState('');
  const [uId, setUId] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [setAllTasks, allTasks] = useState([]);

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUId(uid);
        setUser(user.displayName);
        setUserPhoto(user.photoURL);
        setLoading(false);
        // ...
      } else {
        console.log('User is signed out');
        setLoading(false);
      }
    });
  }, []);
  return <Context.Provider value={{ setAllTasks, allTasks, user, userPhoto, setUser, setUserPhoto, loading, setLoading, uId }}>{children}</Context.Provider>;
}
