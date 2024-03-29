import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Register() {
   const [email, setEmail] = useState(""/*m.jouza7@yahoo.com*/);
  const [password, setPassword] = useState(""/*123*/);
  const [username, setUsername] = useState(""/*Jouza 7*/);

  const registerFunc = (e) => {
  //  نكتب الامر هذا لاني ما ابي الصفحة تتحدث وتطلع لي النتيجة 
    e.preventDefault();

    console.log("reg");
    const newUser = {
      // ES6
      email,
      // "email": "email value in the state"
      password,
      username,
    };
    axios
      .post(`http://localhost:5000/users/register`, newUser)
      .then((response) => {
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <div className="Register">
      <form action="">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Write email here ..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Write password here ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          class="form-control"
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Write username here ..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          class="form-control" 
        />
        <br />
        <input type="submit" value="Register" onClick={registerFunc} class="btn btn-secondary" />
        <Link to='/login'>Have An Account?</Link>
      </form>
    </div>
  );
}