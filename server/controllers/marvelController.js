const axios = require('axios')

class marvelController {
    static getAll(req, res, next) {
      let urlMarvel = `https://gateway.marvel.com:443/v1/public/comics`

      axios.get(urlMarvel, {
        params: {
          apikey: process.env.API_KEY_MARVEL,
          ts: 1,
          hash: process.env.HASH_MARVEL
        }
      })
      .then( response => {
        let comics = response.data.data.results.map( comic => {
          return {
            id: comic.id,
            title: comic.title,
            description: comic.description  
          }
        })
        res.status(200).json(comics)
      })
      .catch( err => {
        next()
      })
    }

    static favorite(){
      let favorited = {
        comic_id: null,
        title: null,
        user_id: req.access_token
      }
      User.create(favorited)
      .then( response => {
        res.status(200).json(response)
      })
      .catch( err => {
        next()
      })
    }

    static unfavorite(){
      let condition = {
        where: {
            comic_id: ""
        }
      }
      Todo.destroy(condition)
      .then(data  => {
        res.status(200).json({message: `unfavorited`})
      })
      .catch(err => {
        next(err)
      })
    }

    static showFavorite(){
      User.findAll({
        where: {
          user_id: req.access_token
        }
      })
      .then( response => {
        res.status(200).json(response)
      })
      .catch(err => {
        next(err)
      })
    }
    
  }
  
  module.exports = marvelController;