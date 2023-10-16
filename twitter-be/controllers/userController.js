// Contoh data
/* const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))


let lastId = Math.max(...data.map(item => item.id));

module.exports = {
    getAll: (req, res) => {
        res.status(201).send(data)
    },

    login: (req, res) => {
        const { email, password } = req.query;
        const result = data.filter(
          (item) => item.email == email && item.password == password
        );
        if (result.length == 1) {
          res.status(200).send(result);
        } else {
          res.status(400).send("User not found");
        }
      },

    // Menampilkan data atau mengambil
    getById: (req, res) => {
        const id = parseInt(req.params.id);
        const users = data.filter(user => user.id == id);
        
        if (users.length > 0) {
            res.status(200).send(users[0]);
        } else {
            res.status(400).send({ message: 'User not found' });
        }
    },
    // mempost data
    postById: ((req, res) => {
        const newUser = req.body;
        if (data.length === 0) {
            newUser.id = 1;
        } else {
            newUser.id = lastId + 1;
        }
        data.push(newUser);
        fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
        
        res.status(201).send(newUser);
    }),
    // mengubah data
    putById: (req, res) => {
        const id= req.params.id;
        const updateUser = req.body;
        const userIndex = data.findIndex(user => user.id==id);
        if (userIndex !== -1) {
            data[userIndex] = {...data[userIndex], ...updateUser};
            res.status(200).send(data[userIndex]);
        }else {
            res.status(400).send({message: 'User not found'})
        }
    },
    // menghapus data
    deleteById: (req, res) => {
        const id = parseInt(req.params.id);
        const index = data.findIndex(user => user.id === id);
    
        if (index !== -1) {
            data.splice(index, 1);
            fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
            res.status(200).send();
        } else {
            res.status(400).send({ message: 'User not found' });
        }
    },
    // seperti update tapi by parameter
    patchById: (req, res) => {
        const id = parseInt(req.params.id);
        const updateData = req.body;
        const userIndex = data.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            data[userIndex] = { ...data[userIndex], ...updateData };
            res.status(200).send(data[userIndex]);
            fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
        } else {
            res.status(400).send({ message: 'User not found' });
        }
    }
}; */

const fs = require ('fs')
const { param } = require('../routers/userRouter')
const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))




module.exports = {
    getAll: (req, res) => {
        res.status(201).send(data)
    },
    login: (req, res) => {
        
        const userData = data.filter((item) => item.email==req.query.email && item.password==req.query.password )
        // const id = data.find((item => item.id == req.params.id))
        fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
        res.status(200).send(userData)
    },
    getById: (req, res) => {
        
        const id = data.filter(item => item.id == req.params.id )
        // const id = data.find((item => item.id == req.params.id))
        fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
        res.status(200).send(id)},
    addUser: (req, res) => {
        const id = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1
        req.body.id = id
        data.push(req.body)
        fs.writeFileSync('./db.json', JSON.stringify(data), 'utf-8')
        res.status(202).send("register success")          
    },
    // deleteById: (req, res) => {
    //     const idx = data.findIndex(item => item.id == req.params.id)
    //     if (idx >= 0){
    //         data.splice(idx, 1)
    //         res.status(200).send(data)
    //     }
    //     else {
    //         res.status(400).send ("User Not Found")
    //     }
    // },
    // edit: (req, res) => {
    //     const id = +req.params.id;
    //     const updateData = req.body
    //     const userIndex = data.findIndex(user => user.id === id);

    //     if (userIndex !== -1){
    //         data[userIndex] = {...data[userIndex], ...updateData};
    //         res.status(200).send(data[userIndex])
    //     }
    //     else {
    //         res.status(400).send ({message: "User not found"})
    //     }
    // }
}

