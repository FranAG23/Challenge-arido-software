const { Router } = require('express');
const router = Router ();

const { getUsers, createUser, getSecurity_group_by_user, getUser } = require('../controllers/index.controller');

router.get('/users', getUsers);
router.get('/user/:user_name', getUser);
router.get('/user_group/:user_name', getSecurity_group_by_user);
router.post('/users/insert',createUser);

module.exports = router;