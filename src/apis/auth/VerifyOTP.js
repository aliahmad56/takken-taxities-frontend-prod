import axios from "axios";

export const VerifyOTP = async otpObject => {
  let res = "";
  let err = "";
 
 

  try {
 
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/auth/verify-otp",
      otpObject,
    
    );
  } catch (error) {
    if (error.response) {
  
        console.error('Response error:', error.response.data);
      } else if (error.request) {
      
        console.error('Request error:', error.request);
      } else {
       
        console.error('Error:', error.message);
      }
    err = error;
  }
  return res || err;
};
