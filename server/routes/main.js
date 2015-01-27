var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('main', {
    title: 'mean bastard'
  });
});

module.exports = router;
