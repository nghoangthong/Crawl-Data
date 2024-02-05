const model = require('../Model/model');
const CONSTANTS = require('../Config/constant');
const axios = require('axios');
const BOT = require("../BOT/index");
const Until = require("../BOT/Until");



async function getComments(req, res,) {
    try {
      const dataFE = req.query.commentId;
      console.log(dataFE)

      if (dataFE.includes("facebook.com/")){

        let resData = await BOT.runScraper(dataFE);
        return res.json(resData)
      }
      const url = CONSTANTS.URL_FACEBOOK_API + dataFE;
      console.log('url:', url)
      console.log('CONSTANTS.ACCESS_TOKEN:', CONSTANTS.ACCESS_TOKEN)
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${CONSTANTS.ACCESS_TOKEN}`,
        },
      });
    return res.json(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return res.status(500).json({ error: 'URL is incorrect' });
    }
  }

  async function accessToken(req, res) {
    try {
      let dataJson = model.getListAccessToken()
      return res.json(dataJson)
    } catch (error) {
      console.error('Error data:', error);
      throw error;  
    }
  }

  async function saveData(req, res){
    try {
      let dataToSave = req.body.data;
      let filename = req.body.url;
      let processedFileName = Until.extractAllNumbersFromLink(filename);
      model.saveData(processedFileName, dataToSave);
      return res.status(200).json('success');
    } catch (error) {
      console.error('Error data:', error);
      throw error;  
    }
  }
  

  module.exports = { getComments, accessToken, saveData
  }
