import React, {useState} from 'react';

const BetForm = () => {
  const [price, setPrice] = useState(null);
  const [address, setAddress] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      if (price && address) {
        const result = await fetch('/api/bet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({price, address}),
        });
        const data = await result.json();
        setMessage(data.message);
      } else {
        setMessage('Please enter a valid price and address.');
      }
    } catch (error) {
      setMessage('Bet request failed, please try again.');
    }
  };

  return (
    <div>
      <h2>Predict The Highest Price Of Bitcoin in 2024</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pric:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cryptocurrency Address:
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">BET</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default BetForm;
