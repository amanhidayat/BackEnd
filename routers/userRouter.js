const router = require('express').Router()
const { userController } = require('../controllers')

router.get("/", userController.getAll)
router.get("/:id", userController.getById)
router.post("/", userController.postById)
router.put("/:id", userController.putById)
router.delete("/:id", userController.deleteById)
router.patch("/:id", userController.patchById)

module.exports = router 