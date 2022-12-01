import React, {useState} from 'react';


function App () {
  const [ form, setForm ] = useState({
    amount: 0,
    description: "",
    date: "",
    
  });


  async function handleSubmit (e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5556/transaction", {
      method: "POST",
      body: form,
    });
    console.log(res.json());
  }

  function handleInput(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          onChange={handleInput}
          value={form.amount}
          placeholder="Enter transaction"
        />
        <input
          type="text"
          name="description"
          onChange={handleInput}
          value={form.description}
          placeholder="Enter transaction details"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
