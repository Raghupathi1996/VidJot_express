const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// User Login Route
router.get('/login', (req, res) => {
    res.render('users/login')
})

// User Registration Route
router.get('/register', (req, res) => {
    res.render('users/register')
})

module.exports = router;