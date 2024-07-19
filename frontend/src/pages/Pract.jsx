import React, { useState } from "react";

function Pract() {
  const [selectedFruit, setSelectedFruit] = useState("");

  const handleChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  return (
    <div>
      <h2>Select a Fruit:</h2>
      <select value={selectedFruit} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
        <option value="date">Date</option>
        <option value="elderberry">Elderberry</option>
      </select>
      {selectedFruit && <p>You selected: {selectedFruit}</p>}
    </div>
  );
}

export default Pract;
