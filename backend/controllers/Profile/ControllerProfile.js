var db = require('../config/dbconnections');

const Profile = async (req, res) => {
        const { username } = req.params;
        if (!username) return res.status(400).json({ message: 'Username required' });
    
        const sql = 'SELECT username FROM login WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: `Username ${username} not found` });
            }
            res.json(results[0]); // Returns the user object with username
        });
};

module.exports = { Profile };