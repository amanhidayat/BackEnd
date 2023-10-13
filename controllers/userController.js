// Contoh data

const data = [
    { id: 1, username: 'Aman', password: "Asd"},
    { id: 2, username: 'Hidayat', password: "Asd"},
    { id: 3, username: 'Bob', password: "Asd"},
]

let lastId = Math.max(...data.map(item => item.id));

module.exports = {
    getAll: (req, res) => {
        res.status(201).send(data)
    },
    // Menampilkan data atau mengambil
    getById: (req, res) => {
        const id = parseInt(req.params.id);
        const users = data.filter(user => user.id == id);
        
        if (users.length > 0) {
            res.status(200).send(users[0]);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    },
    // mempost data
    postById: ((req, res) => {
        const newUser = req.body;
        newUser.id = lastId + 1;
        lastId = newUser.id;

        data.push(newUser);
        res.status(201).json(newUser);
    }),
    // mengubah data
    putById: (req, res) => {
        const id= req.params.id;
        const updateUser = req.body;
        const userIndex = data.findIndex(user => user.id==id);
        if (userIndex !== -1) {
            data[userIndex] = {...data[userIndex], ...updateUser};
            res.status(200).json(data[userIndex]);
        }else {
            res.status(404).json({message: 'User not found'})
        }
    },
    // menghapus data
    deleteById: (req, res) => {
        const id = parseInt(req.params.id);
        const index = data.findIndex(user => user.id === id);
    
        if (index !== -1) {
            data.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },
    // seperti update tapi by parameter
    patchById: (req, res) => {
        const id = parseInt(req.params.id);
        const updateData = req.body;
        const userIndex = data.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            data[userIndex] = { ...data[userIndex], ...updateData };
            res.status(200).json(data[userIndex]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
};




