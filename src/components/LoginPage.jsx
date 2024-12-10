import React, { useState } from "react";
import { TextField, Button, Alert, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Fetch the list of users from localStorage with error handling
    let users = [];
    try {
      const storedUsers = localStorage.getItem("users");
      users = storedUsers ? JSON.parse(storedUsers) : []; // Fallback to empty array if no users are found
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = []; // Fallback to empty array on error
    }

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setError("");
      alert("Login successful!");

      // Store authentication state and the logged-in email
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("loggedInEmail", email); // Ensure this is set

      // Redirect to dashboard after successful login
      navigate("/"); // Redirects to the dashboard page
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1f2937",
          padding: { xs: 3, sm: 4 },
          borderRadius: 2,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          width: { xs: "90%", sm: 400 }, // Full width on mobile, max 400px on larger screens
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          color="white"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }} // Font size scaling for responsiveness
        >
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
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
              marginBottom: 2,
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
            aria-label="Email"
            required
          />
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
              marginBottom: 3,
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
            aria-label="Password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#2563eb",
              "&:hover": {
                backgroundColor: "#3b82f6",
              },
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.125rem" }, // Font size scaling for responsiveness
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          color="gray.400"
          textAlign="center"
          sx={{ marginTop: 2 }}
        >
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
