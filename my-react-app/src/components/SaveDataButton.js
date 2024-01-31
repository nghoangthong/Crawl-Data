import React from 'react';
import axios from 'axios';

function SaveDataButton({ data, name, url }) {
  const handleSaveData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/v1/save', {
        data: data,
        name: name,
        url: url,
      });

      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      {data && (
        <button onClick={handleSaveData}>
          Save Data
        </button>
      )}
    </>
  );
}

export default SaveDataButton;
