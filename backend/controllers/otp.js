const db = require('../config/dbconnections');
const axios =require('axios');
const { InsertUser } = require("./userRegister");
const SP_API_KEY='4d06c95cff331a0c1a230e89f0e6158d';

function generate_otp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function SendSemaphore(message, mobileNumber) {
  const body = {
    apikey: SP_API_KEY,
    number: parseInt(mobileNumber),
    message: message,
  };
      try{
      const response = await axios.post("https://api.semaphore.co/api/v4/priority", body);
      console.log(response.data);
      if (response.status === 200) {
        return { message: "OTP is successfully sent" };
      } else {
        console.error("Failed to send OTP via Semaphore:", response.data);
        return { message: "Failed to send OTP" };
      }
    } catch (error) {
      console.error("Error sending OTP via Semaphore:", error);
      return { message: "Error sending OTP" };
    }
}

const SendOtp = (req, res) => {
  const otp = generate_otp();
  // todo: chagne into sessions
  const username = req.body.username; 
  const mobileNumber= req.body.number; 
  const message = `Your One-Time is ${otp}`;
  
  SendSemaphore(message, mobileNumber);

  const sqlInsert = 'INSERT IGNORE INTO otp (username, otp) VALUES (?, ?)';
  db.query(sqlInsert, [username, otp], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (results.affectedRows === 0) {
      const sqlUpdate = 'UPDATE otp SET otp = ? WHERE username = ?';
      db.query(sqlUpdate, [otp, username], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }
        console.log("otp updated successfully")
      });
    } 
    // Send OTP via Semaphore
    return res.json(results);
  });
};

const ValidateOtp = (req, res) => {
  const otp = req.params.otp;
  const sqlSelect = 'SELECT * FROM otp WHERE otp = ?';
  db.query(sqlSelect, [otp], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ message: err });
    }
    if (results.length === 0) {
      return res.json({ message: "Invalid OTP" });
    }
      return InsertUser(req, res);
  });
};

module.exports= {SendOtp, ValidateOtp};