const router = require ('express').Router()

const { userController } = require('../controllers')




router.get("/", userController.getAll)
router.get("/login", userController.login)
router.post("/", userController.addUser)
router.get("/:id", userController.getById)




module.exports = router