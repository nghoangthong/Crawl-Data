const model = require('./model');
const CONSTANTS = require('./constant');
const axios = require('axios');



async function getComments(req, res,) {
    try {
      const dataFE = req.query.commentId;
      const accessToken = req.query.token;
      console.log('dataFE', dataFE)
      const url = CONSTANTS.URL_FACEBOOK + dataFE;
      console.log('url:', url)
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      let value = req.body.data;
      let name = req.body.name;
      let url = req.body.url;
      model.saveData(name, url, value);
      return res.status(200).json('success');
    } catch (error) {
      console.error('Error data:', error);
      throw error;  
    }

  }

  module.exports = { getComments, accessToken, saveData
  }
