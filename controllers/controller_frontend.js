//const connect = require('../models/db.js');

const home = (req, res, next) => {
    res
    .status(200)
    .render('pages/home.html', {home:{
      heading:"mon TitreHOME",
      img: "/img/monts.jpg"
    }})   
}

const about = (req, res, next) => {
  res.render('pages/about.html', {about:{
    heading:"mon heading about",
    img: "/img/desert.jpg"
  }})
}

const register = (req, res, next) => {
  res.render('pages/register.html')
}

const loggin = (req, res, next) => {
  res.render('pages/loggin.html')
}

module.exports = {
  home,
  about,
  register,
  loggin
}

