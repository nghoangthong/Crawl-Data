import React, { useState } from "react";
import "./ConfirmFormData.css";
import SaveDataButton from "./SaveDataButton";

const ConfirmFormData = ({ rowData, onClose }) => {
  // State để lưu trữ giá trị của mainInfo và detailsInfo
  const [formData, setFormData] = useState({
    mainInfo: {
      avatar: rowData.Avatar,
      fullName: rowData.Name,
      phoneNumber: "",
      email: "",
      note: rowData.Comment,
    },
    detailsInfo: [
      {
        Item1: "",
        Item2: "",
        Item3: "",
        Item4: "",
        Item5: "",
        total1: "",
      },
    ],
  });

  // Hàm xử lý khi trường thông tin main thay đổi
  const handleMainInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      mainInfo: {
        ...prevFormData.mainInfo,
        [name]: value,
      },
    }));
  };

  // Hàm xử lý khi trường thông tin details thay đổi
  const handleDetailsInfoChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedDetailsInfo = [...prevFormData.detailsInfo];
      updatedDetailsInfo[index][field] = value;
      return {
        ...prevFormData,
        detailsInfo: updatedDetailsInfo,
      };
    });
  };

  // Hàm xử lý khi nút "+" được nhấn
  const handleAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      detailsInfo: [
        ...prevFormData.detailsInfo,
        {
          Item1: "",
          Item2: "",
          Item3: "",
          Item4: "",
          Item5: "",
          total1: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSave = async () => {
    const name = formData.mainInfo.fullName
    await SaveDataButton(name, formData);
  };

  return (
    <div className="confirm-form-container">
      <form onSubmit={handleSubmit} id="formCFD">
        <h3 className="confirm-form-title">
          Main
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </h3>
        <table id="main-info-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Họ Tên</th>
              <th>SDT</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={formData.mainInfo.avatar} alt="Avatar" />
              </td>
              <td>
                <input
                  type="text"
                  name="fullName"
                  value={formData.mainInfo.fullName}
                  onChange={handleMainInfoChange}
                  className="confirm-form-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.mainInfo.phoneNumber}
                  onChange={handleMainInfoChange}
                  className="confirm-form-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={formData.mainInfo.email}
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
            value={formData.mainInfo.note}
            onChange={handleMainInfoChange}
            className="confirm-form-textarea"
          />
        </label>
        <h3 className="confirm-form-title">Detail</h3>
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
            {formData.detailsInfo.map((detail, index) => (
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
  
        <button type="button" onClick={handleSave} className="confirm-form-button">
          Save
        </button>
      </form>
    </div>
  );
  
};

export default ConfirmFormData;
