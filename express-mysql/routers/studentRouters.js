const router = require('express').Router()
const { studentControllers } = require('../controllers')

router.get("/", studentControllers.getAll)
router.get("/:id", studentControllers.getById)
router.post("/", studentControllers.addStudent)
router.delete("/:id", studentControllers.deleteById)
router.patch("/:id", studentControllers.updateById)

module.exports = router