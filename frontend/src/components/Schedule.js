import React, { useState } from 'react';
import axios from 'axios';

function Schedule() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/schedule', { message });
    setResponse(res.data.message);
  };

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Describe your appointment needs" 
        />
        <button type="submit">Schedule</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default Schedule;
