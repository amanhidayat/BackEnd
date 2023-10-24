const router = require('express').Router();
const { userController } = require('../controllers')

router.post('/', userController.register)
router.get('/', userController.getAll)
router.get('/:id',userController.getById )
router.delete('/:id',userController.deleteById)
router.patch('/:id',userController.editById)



module.exports = router

