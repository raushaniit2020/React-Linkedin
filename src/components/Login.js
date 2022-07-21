import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../Firebase';
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilepic, setProfilepic] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if (!name) {
            alert("Please enter your full name!")
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilepic
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            displayName: name,
                            uid: userAuth.user.uid,
                            photoURL: profilepic,

                        }))
                    })
            }).catch(error => alert(error))

    }

    const logintoapp = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch(login({
                    email: userAuth.user.email,
                    displayName: userAuth.user.displayName,
                    uid: userAuth.user.uid,
                    photoURL: userAuth.user.photoURL,
                }))
            }).catch(error => alert(error));

    }

    return (
        <div className='login'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1024px-LinkedIn_Logo.svg.png" alt="" />

            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Full Name(required if registering)' type="text" />
                <input value={profilepic} onChange={e => setProfilepic(e.target.value)} placeholder='Profile Pic(optional)' type="text" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" />
                <button type='submit' onClick={logintoapp}>Sign In</button>

            </form>
            <p>Not a member ? <span className='login__register' onClick={register}>Register Now</span></p>

        </div>
    )
}

export default Login
