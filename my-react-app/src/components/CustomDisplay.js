import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmFormData from './ConfirmFormData';
import Modal from 'react-modal';
import "./CustomDataDisplay.css";
import SaveDataButton from "./SaveDataButton"

const CustomDataDisplay = ({ data, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isConfirmFormVisible, setIsConfirmFormVisible] = useState(false);



  const removeQuotes = (str) => str.replace(/"/g, "");

  const confirmData = (rowData) => {
    setSelectedRowData(rowData);
    setIsConfirmFormVisible(true);
  };

  const handleConfirmFormClose = () => {
    setIsConfirmFormVisible(false);
    setSelectedRowData(null);
  };

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
        return item;
      });

      const numberOfJsonToCombine = selectedData.length;

      const combinedData = selectedData.slice(0, numberOfJsonToCombine);
      const response = await SaveDataButton(name, combinedData);

      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
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

      setDataArray(newdataArray);
    } catch (error) {
      console.error("Error rendering table:", error);
    }
  }, [data]);

  const renderTable = () => {
    try {
      if (!dataArray) {
        throw new Error("DataArray is undefined or null");
      }

      const fieldNames = Object.keys(dataArray[0]);

      const headerRow = (
        <tr>
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
          <td>{index + 1}</td>
          {fieldNames.map((fieldName) => (
            <td key={fieldName}>
              {fieldName === "created_time" ? (
                format(new Date(item[fieldName]), "yyyy-MM-dd HH:mm:ss")
              ) : fieldName === "Avatar" ? (
                <img
                  src={item[fieldName]}
                  alt=""
                  style={{ maxWidth: "100px" }}
                />
              ) : (
                removeQuotes(JSON.stringify(item[fieldName]))
              )}
            </td>
          ))}
          <td>
            <input
              type="checkbox"
              onChange={() => handleRowSelect(index)}
              checked={selectedRows.includes(index)}
            />
          </td>
              <td>
      <button onClick={() => confirmData(item)}>Confirm</button>
    </td>
        </tr>
      ));

      return (
        <div>
          <button onClick={handleSave} id="saveButton">
            Save
          </button>
          <ToastContainer />
          <table className="tableCD">
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
      <Modal
        isOpen={isConfirmFormVisible}
        onRequestClose={handleConfirmFormClose}
        contentLabel="Confirm Form Modal"
      >
        {selectedRowData && (
          <ConfirmFormData rowData={selectedRowData} onClose={handleConfirmFormClose} />
        )}
      </Modal>
      {renderTable()}
    </div>
  );
};

export default CustomDataDisplay;
