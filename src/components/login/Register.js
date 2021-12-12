import axios from "axios";
import React from "react";
import { useState } from "react";
import './style.css'
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
export default function Register() {
  const [input, setInput] = useState({ username: "", password: "" });
const history=useHistory()

const handelSubmit= async (e)=>{
    e.preventDefault()
    try{
    const response=await axios.post('https://footballback-end.herokuapp.com/Register',{...input})
    history.push('/Login')
    } catch(error){
        console.log(error);
    }
}

  return (
    <form onSubmit={handelSubmit}>
      <div class="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label for="username">
          <b>username</b>
        </label>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          id="username"
          onChange={(e) =>
            setInput((state) => ({ ...state, [e.target.name]: e.target.value }))
          }
          required
        />
        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          onChange={(e) =>
            setInput((state) => ({ ...state, [e.target.name]: e.target.value }))
          }
          required
        />
        <hr />
        <p>
          By creating an account you agree to our{" "}
          <a href="#">Terms & Privacy</a>.
        </p>
        <button type="submit" class="registerbtn">
          Register
        </button>
      </div>
      <div class="container signin">
        <p>
          Already have an account? <Link to="/Login">sign in</Link>
        </p>
      </div>
    </form>
  );
}
