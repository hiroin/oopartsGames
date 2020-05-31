var express = require('express');
var router = express.Router();
const Ooparts = require('../models/ooparts');

router.get('/test', (req, res, next) => {
  res.render('test', { title: 'OOpartsゲーム一覧' });
  console.log('/test OK');

  const axios = require('axios');
  axios.get('https://erogamescape.dyndns.org/').then(res => {
    console.log(res.data);
  });

});

router.get('/', (req, res, next) => {
  Ooparts.fetchOOpartsGames().then((Games) => {
    res.render('index', { title: 'OOpartsゲーム一覧', games: Games, path: '/' });
  });
});

router.get('/order/:order', (req, res, next) => {
  Ooparts.fetchOOpartsGames('releaseDate').then((Games) => {
    res.render('index', { title: 'OOpartsゲーム一覧', games: Games, path: '/order' });
  });
});

module.exports = router;
