const { Router } = require('express');
const router = Router();

const cat_state = require('../cat_state.json');

router.get('/',(req,res) => {
    res.json(cat_state);
});

module.exports = router;