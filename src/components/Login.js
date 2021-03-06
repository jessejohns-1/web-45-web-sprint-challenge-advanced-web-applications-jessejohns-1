import axios from "axios";
import React, {useState} from "react";
import { useHistory } from "react-router";

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

const Login = () => {
  
  //Declare and init credential state
  const [credentials, setCredentials] = useState({
      username: "",
      password: ""
  })
  
  //Declare and init error state
  const [error, setError] = useState("");
  //Declare variable to hold base URL
  const baseUrl = "http://localhost:5000/api";
  //Destructure push from useHistory to redirect
  const {push} = useHistory();

  //Change handler
  const handleChange = (e) => {
    //Set credential state
    setCredentials({
      //Spread in current state of credentials
      ...credentials,
      [e.target.name]: e.target.value
     })
  }


  const login = (e) => {
    //Prevent default behavior
    e.preventDefault();
    //Axios post calls server, interpolate baseURL, pass in credentials state
    axios.post(`${baseUrl}/login`, credentials)
    //then set the token
    .then(res =>{
      //localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.payload);
      //Redirect to protected content
      push("/bubbles");
    })

    //Set the error state
    .catch(error => {
      setError("Please validate username and password");
      console.log(error);
    })
  }
  
  return (
    <div>
        <h1>Welcome to the Bubble App!</h1>
        <div className="login-form">
          <h2>Log in to pick your color</h2>
        </div>
  
        <p id="error" className="error">{error}</p>

          {/* //1. Build a form containing a username and password field. */}
          {/* //6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password" */}
        <form onSubmit={login}>
          <input
            id = "username"
            type = "text"
            name = "username"
            value = {credentials.username}
            onChange = {handleChange}
            placeholder = {"username"}
            />
          <input
            id = "password"
            type ="password"
            name ="password"
            value ={credentials.password}
            onChange ={handleChange}
            placeholder = {"password"}
            />
            {/* //7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit" */}
          <button id = "submit">Login</button>
        </form>
      </div>
    );
  }

  
export default Login;

//Task List:
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with 
//the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//8. MAKE SURE YOUR ERROR p tag contains the id="error"