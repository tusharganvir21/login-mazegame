import { useState, useMemo, useEffect } from "react";
import { generateMaze, solve } from "./util";
import { IconButton } from "@mui/material";
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';

function Game() {
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState("playing");
  const [size, setSize] = useState(10);
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [userName, setUserName] = useState(""); // Store the username

  // Get logged-in user's details from localStorage
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = users.find((user) => user.email === loggedInEmail);
      if (loggedInUser) {
        setUserName(loggedInUser.name); // Set the logged-in user's name
      }
    }
  }, []);

  const maze = useMemo(() => generateMaze(size, size), [size, gameId]);
  const solution = useMemo(() => {
    const s = new Set();
    const solutionPath = solve(maze, userPosition[0], userPosition[1]);
    solutionPath.forEach((path) => {
      const [x, y] = path;
      s.add(String(x) + "-" + String(y));
    });
    return s;
  }, [size, userPosition[0], userPosition[1], gameId]);

  useEffect(() => {
    const lastRowIndex = maze.length - 1;
    const lastColIndex = maze[0].length - 1;
    if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
      setStatus("won");
    }
  }, [userPosition[0], userPosition[1]]);

  const makeClassName = (i, j) => {
    const rows = maze.length;
    const cols = maze[0].length;
    let arr = [];
    if (maze[i][j][0] === 0) {
      arr.push("border-t-2 border-white");
    }
    if (maze[i][j][1] === 0) {
      arr.push("border-r-2 border-white");
    }
    if (maze[i][j][2] === 0) {
      arr.push("border-b-2 border-white");
    }
    if (maze[i][j][3] === 0) {
      arr.push("border-l-2 border-white");
    }
    if (i === rows - 1 && j === cols - 1) {
      arr.push("bg-green-500"); // destination color
    }
    if (i === userPosition[0] && j === userPosition[1]) {
      arr.push("bg-red-600", "rounded-full"); // current position color
    }

    if (solution.has(String(i) + "-" + String(j))) {
      arr.push("bg-peachpuff"); // solution path color
    }
    return arr.join(" ");
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (status !== "playing") {
      return;
    }
    const key = e.code;
    const [i, j] = userPosition;
    if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
      setUserPosition([i - 1, j]);
    }
    if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
      setUserPosition([i, j + 1]);
    }
    if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
      setUserPosition([i + 1, j]);
    }
    if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
      setUserPosition([i, j - 1]);
    }
  };

  const handleUpdateSettings = () => {
    setSize(Number(document.querySelector("input[name='mazeSize']").value));
    setUserPosition([0, 0]);
    setStatus("playing");
    setGameId(gameId + 1);
  };

  const handlePlayNewGame = () => {
    setStatus("playing");
    setUserPosition([0, 0]);
    setGameId(gameId + 1);
  };

  const handleArrowMove = (direction) => {
    const [i, j] = userPosition;
    if (direction === "up" && maze[i][j][0] === 1) {
      setUserPosition([i - 1, j]);
    } else if (direction === "right" && maze[i][j][1] === 1) {
      setUserPosition([i, j + 1]);
    } else if (direction === "down" && maze[i][j][2] === 1) {
      setUserPosition([i + 1, j]);
    } else if (direction === "left" && maze[i][j][3] === 1) {
      setUserPosition([i, j - 1]);
    }
  };

  return (
    <div className="App bg-[#0f172a] text-white h-full my-4 flex flex-col items-center" onKeyDown={handleMove} tabIndex={-1}>
      <div className="setting self-start p-2">
        <label htmlFor="mazeSize" className="text-sm p-5 hidden sm:block">
          Size of maze (5-40):
        </label>
        <input
          type="number"
          id="mazeSize"
          name="mazeSize"
          min="5"
          max="40"
          defaultValue="10"
          className="text-lg text-black"
        />
      </div>
      <div className="setting self-start p-2">
        <button
          onClick={handleUpdateSettings}
          className="m-5 px-4 py-2 text-sm bg-gray-800 text-white rounded"
        >
          Restart game with new settings
        </button>
      </div>
      <p className="text-lg mt-2">use WSAD or Arrow Keys to move</p>

      <table id="maze" className="mt-4 border-collapse">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={`${makeClassName(i, j)} w-8 h-8 sm:w-10 sm:h-10`}>
                  <div className="w-full h-full rounded-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile controls */}
      <div className="mobile-controls mt-4 flex justify-center gap-4">
        <IconButton
          onClick={() => handleArrowMove("left")}
          className="bg-gray-800"
          sx={{ fontSize: 40 }} // Increase the icon size
        >
          <ArrowCircleLeftTwoToneIcon className="text-white" sx={{ fontSize: 40 }} />
        </IconButton>
        <div className="flex flex-col gap-4">
          <IconButton
            onClick={() => handleArrowMove("up")}
            className="bg-gray-800"
            sx={{ fontSize: 40 }} // Increase the icon size
          >
            <ArrowCircleUpTwoToneIcon className="text-white" sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            onClick={() => handleArrowMove("down")}
            className="bg-gray-800"
            sx={{ fontSize: 40 }} // Increase the icon size
          >
            <ArrowCircleDownTwoToneIcon className="text-white" sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <IconButton
          onClick={() => handleArrowMove("right")}
          className="bg-gray-800"
          sx={{ fontSize: 40 }} // Increase the icon size
        >
          <ArrowCircleRightTwoToneIcon className="text-white" sx={{ fontSize: 40 }} />
        </IconButton>
      </div>


      {status !== "playing" && (
        <div className="info mt-4 p-3 text-center bg-cornsilk text-green-800">
          <p className="text-xl font-semibold uppercase">Congratulations, {userName || "Player"} 🥳! You won the game!</p>
          <button
            onClick={handlePlayNewGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
