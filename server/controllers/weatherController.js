const axios = require('axios');

class weatherController {

    static async getWeather(req, res, next) {
        const { lat, lon } = req.params
        try {
            let url = `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lon}&units=metric`
            const weather = await axios.get(url, {
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "useQueryString": true
                }
            })
            res.status(200).json(weather.data)
        } catch (err) {
            next(err)
        }

    }
}

module.exports = weatherController