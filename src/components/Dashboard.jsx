import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // To handle redirection

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To track loading state
  const navigate = useNavigate(); // To handle redirection

  useEffect(() => {
    // Get the logged-in user's email from localStorage
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    if (loggedInEmail) {
      // Retrieve all users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Find the logged-in user based on the email
      const loggedInUser = users.find((user) => user.email === loggedInEmail);
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    setIsLoading(false); // Set loading to false after checking
  }, []);

  const handlePlayGame = () => {
    // Navigate to the game page
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[calc(100vh-70px)] text-center px-4 sm:px-6 md:px-8">
        {isLoading ? (
          <p className="text-lg text-gray-300">Loading user data...</p>
        ) : user ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Welcome, {user.name} to the Dashboard!
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Explore your options using the navigation bar above.
            </p>
            {/* Play Game Button for Logged-in User */}
            <button
              onClick={handlePlayGame}
              className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-400 text-lg sm:text-xl"
            >
              Play Game
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">No user is logged in!</h2>
            <p className="text-lg sm:text-xl text-gray-300 mt-4">Login to play a game 🎮 !!</p>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
