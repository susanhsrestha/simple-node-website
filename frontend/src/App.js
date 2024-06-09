import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/names');
      setNames(response.data);
    } catch (error) {
      console.error('Error fetching names', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/submit', { name });
      setMessage(response.data.message);
      setName('');
      fetchNames();  // Refresh the list after submitting
    } catch (error) {
      console.error('Error submitting the form', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'PPpp');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Your Name</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        <h2>Submitted Names</h2>
        <ul>
          {names.map((entry, index) => (
            <li key={index}>
              {formatTimestamp(entry.timestamp)}: {entry.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
