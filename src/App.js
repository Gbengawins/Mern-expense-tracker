import React, {useState, useEffect} from 'react';


function App () {
  const [ form, setForm ] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const [ transactions, setTransactions ] = useState([]);


  async function fetchTransactions() {
    const res = await fetch("http://localhost:5556/transaction");
    const data = await res.json();
    setTransactions(data);
  }

  useEffect(() => { }, [])

  async function handleSubmit (e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5556/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // const data = await res.json();
    if (res.ok) { 
      fetchTransactions();

    }
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
      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            { transactions.map((trx) => (
            <tr key={trx._id}>
              <td>{trx.amount}</td>
              <td>{trx.description}</td>
              <td>{trx.date}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
