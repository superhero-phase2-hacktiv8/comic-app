class ComicController {
  static getAllComics(req, res, next) {
    res.send('Get all comics lewat controller');
  }
}


module.exports = ComicController;