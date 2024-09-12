const con = require('../config/dbconnections');

const SetDevices = (req, res) => {
    const { deviceName, location, latitude, longitude } = req.body;

    InitLevel(deviceName)
    const sqlInsert = 'INSERT IGNORE INTO settings (DEVICE_ID, LOCATION, lat, lng) VALUES (?, ?, ?, ?)';
    con.query(sqlInsert, [deviceName, location, latitude, longitude], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            const sqlUpdate = 'UPDATE settings SET LOCATION=?, lat=?, lng=? WHERE DEVICE_ID=?';
            con.query(sqlUpdate, [location, latitude, longitude, deviceName], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err });
                }
                console.log("Device details updated successfully");
            });
        }
        return res.json(results);
    });
}



const InitLevel= (dev_id)=>{
    const curr_date = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
    const sql= 'INSERT into latest (DEVICE_ID, CAP_DATETIME, DIST_M) VALUES (?, ?, ?);'
    con.query(sql,[dev_id, curr_date, 0], (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Device details updated successfully");
    });
} 

module.exports = {SetDevices} ;