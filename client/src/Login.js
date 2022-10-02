import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";

export default function Login() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const isLogin = await response.json()
    if(isLogin){
      localStorage.setItem("username", name)
      return navigate("/dashboard");
    }
    setError('No user found')

  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="m-4">Welcome</h1>
      <div
        style={{ width: "400px" }}
        className="d-flex flex-column justify-content-between"
      >
        <Input value={name} type="text" onChange={(e) => setName(e.target.value)} />
        <Button className="mt-4" onClick={login}>Login</Button>
        {error ?
        <p className="text-danger"> No user found </p>
        : null}
      </div>
    </div>
  );
}
