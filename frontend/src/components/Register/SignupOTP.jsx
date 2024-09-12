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
  const formData = location.state.formData;

  const [otp, setOtp] = useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const [showTimer, setShowTimer] = useState(true);

  // TODO: just call the handleFormSubmit in ./Signup
  const handleResend = (status) => {
    setShowTimer(status);
    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    axios.post(`http://localhost:7000/sendotp`, formData)
      .then(response => {
        toast.success('OTP sent successfully! Redirecting...');
      })
      .catch(error => {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      });
  };

  useEffect(() => {
    // You can add additional logic here if needed
  }, [formData]);

  const paperStyle = {
    padding: 20,
    height: 250,
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
          {showTimer && <OtpTimer seconds={10} resend={() => handleResend(true)} text="Resending OTP in ..." />}
          <br />
          <MuiOtpInput value={otp} onChange={handleChange} length={6}/>
            <br />
            <Grid container justifyContent="center">
            <Button onClick={() =>validateOtp(otp, formData, navigate)}sx={{backgroundColor: "#00ccff"}} variant="contained">Submit</Button>
            </Grid>
          
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