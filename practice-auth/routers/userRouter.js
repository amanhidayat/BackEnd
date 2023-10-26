const router = require("express").Router();
const { userController } = require("../controllers");
const {  editPassword } = require("../controllers/userController");
const { verifyToken, checkRole } = require("../middleware/auth");

router.get("/", verifyToken, checkRole, userController.getAll);
router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/keep-login",verifyToken, userController.keeplogin)
router.patch("/",verifyToken, userController.editUser)
router.patch("/change-pass", verifyToken, userController.editPassword)

module.exports = router;