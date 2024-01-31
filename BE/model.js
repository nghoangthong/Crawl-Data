  const fs = require('fs');
  const path = require('path');

  function saveData(name, content, value) {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const sanitizeFileName = (str) => str.replace(/[\\/:"*?<>|]/g, '_');

    let counter = 1;
    let sanitizedContent = sanitizeFileName(content);
    let fileName = `${sanitizeFileName(name)}-${sanitizedContent}-${day}${month}${year}.json`;
    const dataFolderPath = path.join(__dirname, 'data');
    let filePath = path.join(dataFolderPath, fileName);

    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath);
    }

    while (fs.existsSync(filePath)) {
      fileName = `${sanitizeFileName(name)}-${sanitizedContent}-${day}${month}${year}-${counter}.json`;
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
