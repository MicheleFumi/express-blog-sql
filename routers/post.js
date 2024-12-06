const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/postControllers.js')



router.get('/', postControllers.index)
router.get('/:id', postControllers.show)
router.post('/', postControllers.store)
router.put('/:slug', postControllers.update)
router.delete('/:id', postControllers.destroy)


module.exports = router