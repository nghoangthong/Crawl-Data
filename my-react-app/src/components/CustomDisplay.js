import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./CustomDataDisplay.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomDataDisplay = ({ data, name, url }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  const removeQuotes = (str) => str.replace(/"/g, "");

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter(
          (selectedIndex) => selectedIndex !== index
        );
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows([...Array(dataArray.length).keys()]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSave = async () => {
    try {
      const selectedData = selectedRows.map((index) => {
        const item = dataArray[index];
        return {
          id: removeQuotes(item.id),
          message: item.message ? removeQuotes(item.message) : null,
          created_time: removeQuotes(item.created_time),
        };
      });

      const numberOfJsonToCombine = selectedData.length;

      const combinedData = selectedData.slice(0, numberOfJsonToCombine);

      const response = await axios.post("http://localhost:3001/v1/save", {
        data: combinedData,
        name: name,
        url: url,
      });

      console.log("Data saved successfully:", response.data);
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  useEffect(() => {
    try {
      if (!data) {
        throw new Error("Data is undefined or null");
      }

      let newdataArray;

      if (Array.isArray(data.data)) {
        newdataArray = data.data;
      } else if (Array.isArray(data)) {
        newdataArray = data;
      } else if (data.feed && Array.isArray(data.feed.data)) {
        newdataArray = data.feed.data.flatMap((item) => {
          if (item.comments && item.comments.data) {
            return item.comments.data.map((comment) => ({
              id: removeQuotes(comment.id),
              message: comment.message ? removeQuotes(comment.message) : null,
              created_time: removeQuotes(comment.created_time),
            }));
          }
          return [];
        });
      } else {
        newdataArray = [data];
      }

      setDataArray(newdataArray); // Set data array once when component mounts
    } catch (error) {
      console.error("Error rendering table:", error);
    }
  }, [data]); // Run this effect only when 'data' changes

  const renderTable = () => {
    try {
      if (!dataArray) {
        throw new Error("DataArray is undefined or null");
      }
  
      const fieldNames = Object.keys(dataArray[0]);
  
      const headerRow = (
        <tr>
          {/* Di chuyển cột checkbox sang bên phải */}
          <th>STT</th>
          {fieldNames.map((fieldName) => (
            <th key={fieldName}>{fieldName}</th>
          ))}
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </th>
        </tr>
      );
  
      const dataRows = dataArray.map((item, index) => (
        <tr key={index}>
          {/* Di chuyển ô checkbox sang bên phải */}
          <td>{index + 1}</td>
          {fieldNames.map((fieldName) => (
            <td key={fieldName}>
              {fieldName === "created_time"
                ? format(new Date(item[fieldName]), "yyyy-MM-dd HH:mm:ss")
                : removeQuotes(JSON.stringify(item[fieldName]))}
            </td>
          ))}
          <td>
            <input
              type="checkbox"
              onChange={() => handleRowSelect(index)}
              checked={selectedRows.includes(index)}
            />
          </td>
        </tr>
      ));
  
      return (
        <div>
          <button onClick={handleSave} id="saveButton">
            Save
          </button>
          <ToastContainer />
          <table>
            <thead>{headerRow}</thead>
            <tbody>{dataRows}</tbody>
          </table>
        </div>
      );
    } catch (error) {
      console.error("Error rendering table:", error);
      return (
        <div className="error-container">{JSON.stringify(data, null, 2)}</div>
      );
    }
  };
  
  return (
    <div>
      <h2>Custom Data:</h2>
      {renderTable()}
    </div>
  );
};

export default CustomDataDisplay;
