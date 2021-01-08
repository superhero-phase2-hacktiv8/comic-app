const axios = require('axios')
const { Comic } = require('../models');

class ComicController {
    static async getAll(req, res, next) {
        try {
            const data = await Comic.findAll({
                where: {
                    userId: req.user.id
                }
            })
            console.log(data);
            return res.status(200).json({ status: 'success', data })
        } catch (error) {
            return next(error)
        }
    }

    static select2marvel(req, res, next) {
        let urlMarvel = `https://gateway.marvel.com:443/v1/public/comics`
        axios.get(urlMarvel, {
                params: {
                    apikey: process.env.API_KEY_MARVEL,
                    ts: 1,
                    hash: process.env.HASH_MARVEL
                }
            })
            .then(response => {
                let comics = response.data.data.results.map(comic => {
                    return {
                        id: comic.id,
                        title: comic.title,
                        description: comic.description
                    }
                })
                const filter = comics.filter(item => item.title.includes(req.query.search))
                res.status(200).json(filter)
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static async favorite(req, res, next) {
        try {

            const { comic_id } = req.body;

            if (!comic_id) {
                return next({ name: 'selectCharacter' })
            }

            const urlMarvel = `https://gateway.marvel.com:443/v1/public/comics/${comic_id}`

            const dataMarvel = await axios.get(urlMarvel, {
                params: {
                    apikey: process.env.API_KEY_MARVEL,
                    ts: 1,
                    hash: process.env.HASH_MARVEL
                }
            })

            const favorited = {
                comicId: comic_id,
                title: dataMarvel.data.data.results[0].title,
                userId: req.user.id
            }

            const comicCheck = await Comic.findOne({ where: { comicId: comic_id, userId: req.user.id } })

            if (comicCheck) return next({ name: 'exists' });


            const comic = await Comic.create(favorited)

            return res.status(201).json({
                status: 'success',
                message: 'succesfully add new favorite comic',
                data: comic
            });
        } catch (error) {
            next(error)
        }
    }

    static async unfavorite(req, res, next) {
        try {
            const comic = await Comic.findByPk(req.params.id);

            if (!comic) {
                return next({ name: 'notFound' })
            }

            comic.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'successfully delete data'
            })
        } catch (error) {
            return next(error)
        }
    }


}

module.exports = ComicController;