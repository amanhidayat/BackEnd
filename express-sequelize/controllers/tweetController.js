const db = require(`../models`)
const Tweet = db.Tweet
const User = db.User

module.exports = {
    createTweet: async (req, res) => {
        try { 
            await Tweet.create(req.body);
            res.status(200).send('Tweet berhasil dibuat');
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
        }
    },

    getAllTweet: async (req, res) => {
        try {
            const result = await Tweet.findAll(
                {
                    include: {
                        model: User,
                        require: true,
                        attributes:['username','email']
                        
                    }
                }
            )
            res.status(200).send({ result })
            
        } catch (error) {
            console.log(error);
            res.status(400).send({message:error.message})
        }
    },
    
    getTweetById: async (req, res) => {
        try {
            const result = await Tweet.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({ result });
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    },
    
    deleteTweetById: async (req, res) => {
        try {
            const tweetId = req.params.id;
            const result = await Tweet.destroy({
                where: {
                    id: tweetId
                }
            });
    
            if (result === 1) {
                res.status(200).send({ message: 'Tweet berhasil dihapus' });
            } else {
                res.status(404).send({ message: 'Tweet tidak ditemukan' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Terjadi kesalahan saat menghapus tweet' });
        }
    },
    
    updateTweetById: async (req, res) => {
        try {
            const { userName, email, tweet } = req.body;
            const result = await Tweet.update(
                {
                    userName,
                    email,
                    tweet,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.status(200).send("Tweet berhasil diperbarui");
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    }
}
