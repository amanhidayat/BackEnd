const db = require('../database')

module.exports = {
    getAll: (req, res) => {
        db.query("SELECT * FROM murid", (err, result) => {
            if (err) {
                res.status(400).send({ message: err.message });
            } else {
                res.status(200).send({
                    status: "success",
                    data: result
                });
            }
        });
    },
    getById: (req, res) => {
        const id = req.params.id; 
    
        db.query('SELECT * FROM murid WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.status(400).send({ message: err.message });
            } else {
                if (result.length === 0) {
                    res.status(404).send({
                        status: "not found",
                        data: []
                    });
                } else {
                    res.status(200).send({
                        status: "success",
                        data: result
                    });
                }
            }
        });
    },

    addStudent: (req, res) => {
        const { nama, umur, alamat, gender } = req.body;
    
        db.query(
            `INSERT INTO murid (nama, umur, alamat, gender) VALUES ("${nama}", ${umur}, "${alamat}", "${gender}")`,
           
            (err, result) => {
                if (err) {
                    res.status(400).send({ message: err.message });
                } else {
                    res.status(201).json({ status: "success", data: result });
                }
            }
        );
    },

    deleteById: (req, res) => {
        const id = parseInt(req.params.id);
    
        db.query(`DELETE FROM murid WHERE id = ${id}`, (err, result) => {
            if (err) {
                res.status(400).send({ message: err.message });
            } else if (result.affectedRows === 0) {
                res.status(404).send({ message: 'User not found' });
            } else {
                res.status(200).send({ message: 'User deleted successfully' });
            }
        });
    },

    updateById: (req, res) => {
        const { id } = req.params;
        const query = [];
    
        for (const key in req.body) {
            query.push(`${key} = ${db.escape(req.body[key])}`);
        }
    
        db.query(`UPDATE murid SET ${query.join(", ")} WHERE id = ${db.escape(id)}`, (err, result) => {
            if (err) {
                res.status(400).send({ message: err.message });
            } else {
                res.status(200).send({ 
                    status: "Success",  
                    data: result
                });
            }
        });
    }
    

}

