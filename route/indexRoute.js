const express = require("express")
const tokenValidation = require("../middleware/authentication")
const { signupController, loginController, getCurrentUserInfo } = require("../controller/userController")
const { addItemToMenu, getAllOrder } = require("../controller/adminController")
const multer = require('multer');
const { getAllMenu } = require("../controller/menuController");
const { addToCart, userCartItems, placeOrder } = require("../controller/orderController");
const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./images")
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage });

// router.use(tokenValidation)

router.route('/user/signup').post(signupController)
router.route('/user/login').post(loginController)
router.route("/admin/addToMenu").post(upload.single("image"),addItemToMenu)
router.route("/menu").get(getAllMenu)
router.route("/current_user").get(tokenValidation, getCurrentUserInfo)


// router.route("/user/setlocation").post(setLocation).get(getLocation)

router.route('/order').post(tokenValidation,addToCart)
router.route("/order/:userid").get(tokenValidation,userCartItems)
router.route("/checkout").get(tokenValidation,placeOrder)
// router.route('/order/checkout').post(calculateTotal).


module.exports=router