const axios = require('axios');
const baseUrl = 'https://comicvine.gamespot.com/api'
const COMICVINE_API_KEY = process.env.COMICVINE_API_KEY;

class CharController {

  // Tampilkan 20 random characters ketika mengunjungi /characters
  static async getAllChars(req, res ,next) {
    try {
      const response = await axios.get(`${baseUrl}/characters/?api_key=${COMICVINE_API_KEY}&format=json&limit=20`);
      res.status(200).json(response.data.results);
    } catch (err) {
      next(err);
    }
  }

  // Cari character berdasarkan nama, ambil nama dari req params name
  static async findCharsByName(req, res, next) {
    try {
      const name = req.params.name;
      const response = await axios.get(`${baseUrl}/characters/?api_key=${COMICVINE_API_KEY}&format=json&filter=name:${name}`);
      res.status(200).json(response.data.results);
    }
    catch (err) {
      next(err);
    }
  }
}


module.exports = CharController;