import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaFlag } from 'react-icons/fa';

const Stopwatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = () => setLaps([...laps, time]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy-blue text-white">
      <h1 className="text-4xl mb-6 font-bold">Stopwatch</h1>
      <div className="flex items-center justify-center mb-4">
        <div className="border-8 border-blue-500 rounded-full p-10 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="text-6xl animate-pulse">{formatTime(time)}</div>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        {!isActive && time === 0 && (
          <button className="btn" onClick={handleStart}>
            <FaPlay /> Start
          </button>
        )}
        {isActive && (
          <button className="btn" onClick={handlePause}>
            <FaPause /> Pause
          </button>
        )}
        {!isActive && time > 0 && (
          <button className="btn" onClick={handleStart}>
            <FaPlay /> Resume
          </button>
        )}
        <button className="btn" onClick={handleReset}>
          <FaRedo /> Reset
        </button>
        <button className="btn" onClick={handleLap} disabled={!isActive}>
          <FaFlag /> Lap
        </button>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-2xl mb-2 font-semibold">Laps</h2>
        <ul className="space-y-1">
          {laps.map((lapTime, index) => (
            <li key={index} className="text-lg bg-blue-600 rounded-lg p-2 shadow-md">{formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
