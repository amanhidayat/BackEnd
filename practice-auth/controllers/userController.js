const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
   register: async (req, res) => {
      try {
         const { username, email, password } = req.body;
         const isEmailExist = await User.findOne({
            where: {
               email
            }
         })

         if (isEmailExist) {
            return res.status(489).send({
               message: 'email has been used'
            })
         }

         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password, salt)
         
         await User.create({
             username, email, password:hashPassword });
         res.status(200).send({ message: "Success" });
      } catch (error) {
         console.log(error);
      }
   },

   

   getAll: async (req, res) => {
      try {
         const result = await User.findAll();
         res.status(200).send({ result });
      } catch (error) {
         console.log(error);
      }
   },
   login: async (req, res) => {
      try {
         const { email,password } = req.body

         const isUserExist = await User.findOne({
            where: {
               email
            }
         })

         if (!isUserExist == null) {
            res.status(400).send({
               message: 'user not found'
            })
         }

         const isValid = await bcrypt.compare(password, isUserExist.password)
         if (!isValid) {
            res.status(400).send({
               message:'incorrect password'
            })
         }

         const payload = { id: isUserExist.id, isAdmin: isUserExist.isAdmin }
         const token = jwt.sign(payload, 'JCWD0208', { expiresIn: '1h'})
         token

         res.status(200).send({
            message: "login success",
            result: isUserExist,
            token: token

         })

      } catch (err) {
         console.log(err);
         res.status(400).send({ err: err.message})
      }
   },
   keeplogin: async (req, res) => {
      try {
         const result = await User.findOne({
            where: {
               id: req.user.id
            }
         })
         res.status(200).send("keep login")
      } catch (err) {
         console.log(err);
         res.status(400).send({ err: err.message})
      }
   },
   editUser: async (req, res) => {
      try {
        const { username, email, password } = req.body
        const userId = req.user.id
        const result = await User.update(req.body, {
          where: {
            id: req.user.id,
          },
        });
        res.status(200).send({ data: result });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
      }
    },
    editPassword: async(req, res) => {
      try {
         const { password } = req.body
         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password, salt)

         await User.update({ password: hashPassword }, {
            where: {
               id: req.user.id
            }
         })

         res.status(200).send({ edit: password });
       } catch (err) {
         console.log(err);
         res.status(400).send({ message: err.message });
       }
     },
    
};