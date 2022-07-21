import React, { useEffect } from 'react';
import './App.css';
import Feed from './components/Feed';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import Login from './components/Login';
import { auth } from './Firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          displayName: userAuth.displayName,
          uid: userAuth.uid,
          photoURL: userAuth.photoURL,
        }))
      } else {
        // user is logged out
        dispatch(logout());
      }
    })

  }, []);
  return (
    <div className="app">
      <Header />
      {!user ? (<Login />) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
        </div>

      )}
    </div>
  );
}

export default App;
