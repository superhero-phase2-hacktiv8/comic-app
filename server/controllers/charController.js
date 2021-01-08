const { Character } = require('../models');
const axios = require('axios');
const baseUrl = 'https://comicvine.gamespot.com/api'
const COMICVINE_API_KEY = process.env.COMICVINE_API_KEY;

class CharController {

    // Tampilkan 20 random characters ketika mengunjungi /characters
    static async getAllChars(req, res, next) {
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
                return res.status(200).json(response.data.results);
            } catch (err) {
                return next(err);
            }
        }
        // Cari character favorite user
    static async findCharsByUserId(req, res, next) {
        try {
            const UserId = +req.params.id;
            const charIds = await Character.findAll({
                attributes: ['character_id'],
                where: { UserId },
                raw: true
            })

            const charId = charIds[0].character_id;

            const response = await axios.get(`${baseUrl}/characters/?api_key=${COMICVINE_API_KEY}&format=json&filter=id:${charId}`);

            return res.status(200).json(response.data);
        } catch (err) {
            return next(err);
        }
    }

    static async addCharFavorite(req, res, next) {
        try {
            const { character_id } = req.body;
            const response = await axios.get(`${baseUrl}/characters/?api_key=${COMICVINE_API_KEY}&format=json&filter=id:${character_id}`);
            const name = response.data.results[0].name;
            const deck = response.data.results[0].deck;
            const imgUrl = response.data.results[0].image.original_url;
            const userId = req.user.id;
            const newCharacter = { character_id, userId, name, deck, imgUrl };

            const findFav = await Character.findOne({
                where: { userId, character_id }
            });

            if (findFav) return next({ name: 'exists' });

            const createdChar = await Character.create(newCharacter);

            return res.status(201).json({
                status: 'success',
                message: 'succesfully add new favorite character',
                data: createdChar
            });
        } catch (err) {
            return next(err);
        }
    }
}



module.exports = CharController;