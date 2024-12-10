import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
  
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }
  
    // Handle localStorage safely
    let users = [];
    try {
      const storedUsers = localStorage.getItem("users");
      users = storedUsers ? JSON.parse(storedUsers) : []; // Default to empty array if no users are stored
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = []; // Fallback to empty array on error
    }
  
    const existingUser = users.find((user) => user.email === email);
  
    if (existingUser) {
      setError("An account with this email already exists.");
      setSuccess("");
      return;
    }
  
    const newUser = { name, email, password };
    users.push(newUser);
    
    // Save the updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  
    // Set the logged-in user email in localStorage
    localStorage.setItem("loggedInEmail", email);
  
    // Reset form and show success message
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("Registration successful! You can now log in.");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" className="mb-4">
              {success}
            </Alert>
          )}
          <div className="mb-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "rgba(255, 255, 255, 0.7)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00f",
                    boxShadow: "0 0 18px #00f",
                  },
                },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "rgba(255, 255, 255, 0.7)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00f",
                    boxShadow: "0 0 8px #00f",
                  },
                },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "rgba(255, 255, 255, 0.7)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00f",
                    boxShadow: "0 0 8px #00f",
                  },
                },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type="password"
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "rgba(255, 255, 255, 0.7)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00f",
                    boxShadow: "0 0 8px #00f",
                  },
                },
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Register
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
