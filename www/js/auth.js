
document.addEventListener('deviceready', onDeviceReady, false);

// Define onDeviceReady function
function onDeviceReady() {
  // Add event listener to form submit button
  var btn = document.querySelector('#btn')
  btn.addEventListener('click', login);
  console.log('Hello...')
}
import Swal from '../node_modules/sweetalert2/dist/sweetalert2.js'
// Import Firebase libraries
import firebase from '../node_modules/firebase/app';
import getauth from '../node_modules/firebase/auth';
import getdatabase from  '../node_modules/firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyAldA2hNP9ZfRwSEt71l4znoGt2jivHYTw",
  authDomain: "farmleedb.firebaseapp.com",
  projectId: "farmleedb",
  storageBucket: "farmleedb.appspot.com",
  messagingSenderId: "960186733242",
  appId: "1:960186733242:web:63739fb3d9c630ea5ae883"
};


// Initialize Firebase with your project's config
firebase.initializeApp(firebaseConfig);
console.log('Hello Below is:')
console.log(btn)
// document.addEventListener('DOMContentLoaded', function() {
//   btn.addEventListener('submit' , async(s) =>{
//     s.preventDefault();
//     login();
//   })
//   console.log('Helo')
// });


// Sign up function
function signUp(email, password) {
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;
      // Add the user's details to the Firebase database
      firebase.database().ref(`users/${user.uid}`).set({
        email: user.email,
        // Add any additional user details here
      });
    })
    .catch((error) => {
      // Handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

// Login function
function login() {
  
  
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log(`Email: ${email} and password : ${password}`)

  firebase.auth().signInWithCredential(email, password)
    .then(function(userCredential) {
      // User is signed in.
      var user = userCredential.user;

      // Show a Sweet Alert dialog if the login was successful
      Swal({
        title: "Login successful!",
        text: "You have been logged in.",
        icon: "success",
        button: "OK"
      }).then(function() {
        // Redirect the user to the home page or some other page
        window.location.href = "homepage.html";
      });
    })
    .catch(function(error) {
      // Handle errors here by displaying an error message
      var errorCode = error.code;
      var errorMessage = error.message;

      Swal({
        title: "Error",
        text: errorMessage,
        icon: "error",
        button: "OK"
      });
    });
}
function validate(username, password) {
  const database = getdatabase();
  var usersRef = database.ref("users");
  usersRef.orderByChild("username").equalTo(username).on("value", function(snapshot) {
    if (snapshot.exists()) {
      // User found
      var user = snapshot.val();
      var key = Object.keys(user)[0];
      if (user[key].password === password) {
        // Password is correct
        //window.alert("Login successful");
        window.location.assign("mainPage.html");
      } else {
        // Password is incorrect
        //window.alert("Incorrect password");
      }
    } else {
      // User not found
      window.alert("User not found");
    }
  });
}


