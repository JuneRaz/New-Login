import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import OtpTimer from 'otp-timer';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiOtpInput } from 'mui-one-time-password-input'

const validateOtp = async (otp, form, nav) => {
  try {
    const response = await axios.post(`http://localhost:7000/validateotp/${otp}`, form);
    toast.success('OTP verified successfully! Redirecting to login...');
    setTimeout(() => {
      nav('/', { replace: true });
    }, 2000); // Adjust the delay time as necessary
  } catch (error) {
    toast.error('OTP verification failed. Please try again.');
    console.error(error);
  }
};

const RegistrationOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = '';
  //const formData = location.state.formData;

  const [otp, setOtp] = useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const [showTimer, setShowTimer] = useState(true);
  const handleClick = (status) => {
    setShowTimer(status);
  };

  useEffect(() => {
    // You can add additional logic here if needed
  }, [formData]);

  const paperStyle = {
    padding: 20,
    height: 400,
    width: 400,
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '7%',
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div>
          <h5>We've sent a One-Time Password to the contact number you've provided</h5>
          
          <MuiOtpInput value={otp} onChange={handleChange} length={6} onComplete={() => validateOtp(otp, formData, navigate)}/>
          <br />
          {showTimer && <OtpTimer seconds={10} resend={() => handleClick(true)} text="Resending OTP in ..." />}
          
        </div>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default RegistrationOtp;

/*

<Button
            style={{ textAlign: 'center' }}
            color="secondary"
            onClick={() => validateOtp(otp, formData, navigate)}
          >
            Submit
          </Button>
*/