  const fs = require('fs');
  const path = require('path');
const CONSTANT = require('../Config/constant');

  function saveData(name, value) {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const sanitizeFileName = (str) => {
      // Kiểm tra xem chuỗi có tồn tại không
      if (str === null || str === undefined) {
        return ''; // hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
      }
    
      // Sử dụng biểu thức chính quy để thay thế các kí tự đặc biệt bằng dấu gạch dưới
      const sanitizedStr = str.replace(/[\\/:"*?<>|]/g, '_');
      
      // Kiểm tra nếu tên đã được xử lý có kí tự đặt biệt hay không
      const containsSpecialChars = sanitizedStr !== str;
    
      // Nếu không có kí tự đặt biệt, giữ nguyên tên, ngược lại trả về tên đã xử lý
      return containsSpecialChars ? sanitizedStr : str;
    };

    let counter = 1;
    // let sanitizedContent = sanitizeFileName(content);
    let fileName = `${sanitizeFileName(name)}-${day}${month}${year}.json`;
    const dataFolderPath = path.join(__dirname, CONSTANT.DATA_PATH);
    let filePath = path.join(dataFolderPath, fileName);

    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath);
    }

    while (fs.existsSync(filePath)) {
      fileName = `${sanitizeFileName(name)}-${day}${month}${year}-${counter}.json`;
      filePath = path.join(dataFolderPath, fileName);
      counter++;
    }

    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf-8');

    console.log(`Data saved to: ${filePath}`);
  }


  function getListAccessToken() {
    try {
      const filePath = path.join(__dirname, 'accessTokens.json');

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const accessTokenList = JSON.parse(fileContent);

      return accessTokenList.AccessToken;
    } catch (error) {
      console.error('Error reading access tokens:', error);
      throw error;
    }
  }

  module.exports = {
      saveData: saveData,
      getListAccessToken: getListAccessToken
    };
