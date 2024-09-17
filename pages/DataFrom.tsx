"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from "react";

interface Data {
  text: string;
}

const DataFrom: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    // Fetch data from the server when the component loads
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const savedData = await response.json();
      setData(savedData);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (text) {
      const newData = { text };

      // Save the data to the server (and file)
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // Update the local state with the new data
        setData((prevData) => [...prevData, newData]);
        setText(""); // Clear the input after saving
      } else {
        console.error("Failed to save data");
      }
    }
  };

  return (
    <div>
      <h1>Save Data to File</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <h2>Data Table</h2>
      {data.length > 0 ? (
        <table border={1} style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data saved yet.</p>
      )}
    </div>
  );
};

export default DataFrom;
