import React, { useState, useEffect } from "react";
import "./App.css";
// import SaveDataButton from "./components/SaveDataButton";
import CustomDataDisplay from "./components/CustomDisplay";

function App() {
  const [commentId, setCommentId] = useState("");
  const [commentData, setCommentData] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Thêm state mới

  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/token");
        const data = await response.json();
        const tokens = Object.entries(data);
        setTokenList(tokens);
        if (tokens.length > 0) {
          setSelectedToken(tokens[0][1]);
          setSelectedUser(tokens[0][0]); // Set giá trị mặc định khi có dữ liệu
        }
      } catch (error) {
        console.error("Error fetching token list:", error);
      }
    };

    fetchTokenList();
  }, []);

  const handleTokenChange = (e) => {
    const selectedUser = tokenList.find(
      ([user, token]) => token === e.target.value
    )[0];
    setSelectedToken(e.target.value);
    setSelectedUser(selectedUser);
  };

  const handleInputChange = (e) => {
    setCommentId(e.target.value);
  };

  const handleGetComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/comments?commentId=${commentId}&token=${selectedToken}`
      );
      const data = await response.json();
      setCommentData(data);
      console.log('Type of commentData:', typeof commentData);

    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  };


  return (
    <div className="App">
      <h1>Data Facebook</h1>
      <label htmlFor="tokenDropdown">Choose Access Token:</label>
      <select
        id="tokenDropdown"
        onChange={handleTokenChange}
        value={selectedToken}
      >
        {tokenList.map(([user, token], index) => (
          <option key={index} value={token}>
            {user}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="URL?"
        value={commentId}
        onChange={handleInputChange}
      />
      <button onClick={handleGetComment}>Submit</button>

      {commentData && ( 
        <div>
          
          <CustomDataDisplay data={commentData} name={selectedUser} url={commentId} />
          {/* <SaveDataButton
            data={commentData}
            name={selectedUser}
            url={commentId}
          /> */}
        </div>
      )}
    </div>
  );
}

export default App;
