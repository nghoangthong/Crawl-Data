import React, { useState } from "react";
import "./ConfirmFormData.css";

const ConfirmFormData = ({ rowData, onClose }) => {
  console.log("rowData:", rowData);
  console.log("rowData:", rowData.Name);

  // State để lưu trữ giá trị các trường thông tin
  const [mainInfo, setMainInfo] = useState({
    fullName: rowData.Name,
    phoneNumber: "",
    email: "",
    note: rowData.Comment,
  });

  const [detailsInfo, setDetailsInfo] = useState([
    {
      Item1: "",
      Item2: "",
      Item3: "",
      Item4: "",
      Item5: "",
      total1: "",
    },
  ]);

  // Hàm xử lý khi trường thông tin main thay đổi
  const handleMainInfoChange = (e) => {
    const { name, value } = e.target;
    setMainInfo((prevMainInfo) => ({
      ...prevMainInfo,
      [name]: value,
    }));
  };

  // Hàm xử lý khi trường thông tin details thay đổi
  const handleDetailsInfoChange = (index, field, value) => {
    setDetailsInfo((prevDetailsInfo) => {
      const updatedDetailsInfo = [...prevDetailsInfo];
      updatedDetailsInfo[index][field] = value;
      return updatedDetailsInfo;
    });
  };

  // Hàm xử lý khi nút "+" được nhấn
  const handleAddRow = () => {
    setDetailsInfo((prevDetailsInfo) => [
      ...prevDetailsInfo,
      {
        Item1: "",
        Item2: "",
        Item3: "",
        Item4: "",
        Item5: "",
        total1: "",
      },
    ]);
  };

  // Hàm xử lý khi nút Submit được nhấn
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="confirm-form-container">
      <form onSubmit={handleSubmit} id="formCFD">
        <h3 className="confirm-form-title">
          Main:
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </h3>
        <table id="main-table">
          <thead>
            <tr>
              <th>Họ Tên</th>
              <th>SDT</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="fullName"
                  value={mainInfo.fullName}
                  onChange={handleMainInfoChange}
                  className="confirm-form-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="phoneNumber"
                  value={mainInfo.phoneNumber}
                  onChange={handleMainInfoChange}
                  className="confirm-form-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={mainInfo.email}
                  onChange={handleMainInfoChange}
                  className="confirm-form-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        <label className="confirm-form-label">
          Note:
          <textarea
            name="note"
            value={mainInfo.note}
            onChange={handleMainInfoChange}
            className="confirm-form-textarea"
          />
        </label>
        
        <h3 className="confirm-form-title">Detail:</h3>
        <table id="detail-table">
          <thead>
            <tr>
              <th>Item1</th>
              <th>Item2</th>
              <th>Item3</th>
              <th>Item4</th>
              <th>Item5</th>
              <th>Total1</th>
            </tr>
          </thead>
          <tbody>
            {detailsInfo.map((detail, index) => (
              <tr key={index}>
                {Object.entries(detail).map(([field, value]) => (
                  <td key={field}>
                    {field === "Item1" ? (
                      <select
                        value={value}
                        onChange={(e) =>
                          handleDetailsInfoChange(
                            index,
                            field,
                            e.target.value
                          )
                        }
                        className="confirm-form-input"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleDetailsInfoChange(
                            index,
                            field,
                            e.target.value
                          )
                        }
                        className="confirm-form-input"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddRow} className="add-row-button">
          +
        </button>
        <button type="submit" className="confirm-form-button">
          Submit
        </button>
      </form>
    </div>
  );
  
};

export default ConfirmFormData;
