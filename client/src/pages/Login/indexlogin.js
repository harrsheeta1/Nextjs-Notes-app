import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import styles from "@/styles/login.module.css";

const SERVER_URL = "http://localhost:5500";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const res = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && isLogin && data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/dashboard";
    } else if (!isLogin && res.ok) {
      alert("Sign up successful! You can now log in.");
      toggleForm();
    } else {
      alert(data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to Notes App!!</h1>

      <div className={styles.container}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</Button>
        <div className={styles.switch}>
          {isLogin ? (
            <span>
              Don’t have an account? <a onClick={toggleForm}>Sign Up</a>
            </span>
          ) : (
            <span>
              Already have an account? <a onClick={toggleForm}>Login</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
