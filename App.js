import React, { useState, useEffect } from 'react';

function App() {
  const [queries, setQueries] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/queries')
      .then(res => res.json())
      .then(data => setQueries(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    setQueries([...queries, data.query]);
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Company Query Submission</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br/><br/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Submit Query</button>
      </form>
      <h3>Submitted Queries</h3>
      <ul>
        {queries.map(q => (
          <li key={q.id}>
            <strong>{q.title}</strong>: {q.description} [{q.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
