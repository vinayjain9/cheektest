"use client"; // Mark this as a Client Component

import SubLayout from "../../components/SubLayout";
import React, { useState, useEffect } from "react";

interface Data {
  brand: string;
  company: string;
  type: string;
  category: string;
}
const LABELS = ['brand', 'company', 'type', 'category'];

const Category: React.FC = () => {
  // const [text, setText] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);

  const [inputs, setInputs] = useState<Data>({
    brand: '',
    company: '',
    type: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const savedData = await response.json();
      setData(savedData);
    };

    fetchData();
  }, []);
const handleInputChange = (field: keyof Data, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

 const handleSave = async () => {
    if (Object.values(inputs).every((val) => val)) {
      // Save the data to the server (and file)
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        // Update the local state with the new data
        setData((prevData) => [...prevData, inputs]);
        // Clear the input fields after saving
        setInputs({
          brand: '',
          company: '',
          type: '',
          category: '',
        });
      } else {
        console.error('Failed to save data');
      }
    }
  };

  return (
    <SubLayout>
      <div className=" bg-slate-200 h-full p-3">
        <h1 className="font-bold text-2xl flex items-center justify-center "> Add Category </h1>
  
        <div>

  <div className="p-3 bg-slate-200 h-full">
      <h1>Save Data to File</h1>
      <div style={{ marginBottom: '10px' }}>
        {LABELS.map((label) => (
          <div key={label} className="mb-4">
            <label className="block text-gray-700 capitalize">{label}</label>
            <input
              type="text"
              value={inputs[label as keyof Data]} // Dynamically bind input value
              onChange={(e) =>
                handleInputChange(label as keyof Data, e.target.value)
              }
              placeholder={`Enter ${label}`}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      <h2>Data Table</h2>
      {data.length > 0 ? (
        <table border={1} style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              {LABELS.map((label) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.company}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data saved yet.</p>
      )}
    </div>
  
        </div>
        
      </div>

    {/* <div className="p-3 bg-slate-200 h-full">
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
    </div> */}
</SubLayout>
  );
};

export default Category;
