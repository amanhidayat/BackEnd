const db = require(`../models`)
const User = db.User

module.exports = {
    register: async (req, res) => {
        try { 
            const { username, email, password} = req.body
            await User.create({
                username,
                email, 
                password
            })
            const result = await User.create({ 
                username,
                email,
                password
            })
            res.status(200).send('Register Success')
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await User.findAll()
            res.status(200).send({ result })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },
    
    getById: async (req, res) => {
        try {
          const result = await User.findOne({
            attributes: {
                exclude: ["password"]
            },
            where: {
              id: req.params.id
            }
          });
          res.status(200).send({ result });
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: error.message });
        }
      },
      

    deleteById: async (req, res) => {
        try {
            const users = req.params.id;
            const result = await User.destroy({
                where: {
                    id: users
                }
            });
    
            if (result === 1) {
                res.status(200).send({ message: 'Pengguna berhasil dihapus' });
            } else {
                res.status(404).send({ message: 'Pengguna tidak ditemukan' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Terjadi kesalahan saat menghapus pengguna' });
        }
},

editById: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const result = await User.update(
        {
          username,
          email,
          password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("user has update");
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  }

    
}
