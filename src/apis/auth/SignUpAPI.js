import axios from "axios";
import { toast } from "react-toastify";

export const SignUpApi = async signupData => {
  let res = "";
  let err = "";

  try {
 
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/auth/signup",
      signupData,
    
    );
  } catch (error) {
    if (error.response) {
  
        console.log('Response error:', error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.request) {
      
        console.log('Request error:', error.request);
        toast.error("Something went wrong. Please try again later.");
      } else {
       
        console.log('Error:', error.message);
        toast.error("Something went wrong. Please try again later.");
      }
    err = error;
  }
  return res || err;
};
