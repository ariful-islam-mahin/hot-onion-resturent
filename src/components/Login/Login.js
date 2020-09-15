import React, { useContext, useState } from 'react';
import logo from '../../logo2.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig/firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    // const [user, setUser] = useState({
    //     isLoggedIn:false,
    //     name:'',
    //     email:'',
    //     password:'',
    //     error:'',
    //     success:false
    // });

    const [newUser, setNewUser] = useState(true);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, email} = res.user;
            const signedInUser = {...user};
            signedInUser.email = email;
            signedInUser.name = displayName;
            setUser(signedInUser)
            history.replace(from);
            
        })
        .catch(error => {
          console.log(error, error.message)
        });
    }

    const fbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            // ...
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage)
            // ...
          });
    }

    const handleBlur = (e) => {
        let isFormValid = false;
        const password = e.target.name === 'password'
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(password){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFormValid = isPasswordValid && passwordHasNumber
        }
        if(isFormValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(user.name);
                history.replace(from);
                setUser(newUserInfo)
            })
            .catch(function(error) {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(user.name);
                history.replace(from);
                setUser(newUserInfo)
            })
            .catch(function(error) {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }

        e.preventDefault()
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        })
        .then(function() {
            console.log('user name updated successfully')
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    

    return (
        <div className='text-center mt-5 '>
            <img className='w-25' src={logo} alt=""/>
            <br/>
            <button onClick={googleSignIn} className='text-white border-0 bg-danger p-2 w-25 rounded my-2 mt-4'>Google sign in</button>
            <br/>
            <button onClick={fbSignIn} className='text-white border-0 bg-danger p-2 w-25 rounded my-2'>Facebook login</button>
            <form className='mt-2' onSubmit={handleSubmit}>
                {
                    newUser && 
                    <input className='border-0 bg-light p-2 w-25 rounded my-2' type="text" onBlur={handleBlur} name='name' placeholder='Name' required/>
                }
                <br/>
                <input className='border-0 bg-light p-2 w-25 rounded my-2' type="email" onBlur={handleBlur} name='email' placeholder='Email' required/>
                <br/>
                <input className='border-0 bg-light p-2 w-25 rounded my-2' type="password" onBlur={handleBlur} name='password' placeholder='Password' required/>
                <br/>
                <input className='text-white border-0 bg-danger p-2 w-25 rounded my-3' type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
            </form>
            <p onClick={() => setNewUser(!newUser)} className={newUser ? 'text-danger' : 'text-secondary'} style={{cursor:'pointer'}}>Already have an account</p>
            {
                user.success ? <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p> : <p style={{color:'red'}}>{user.error}</p>
            }
        </div>
    );
};

export default Login;