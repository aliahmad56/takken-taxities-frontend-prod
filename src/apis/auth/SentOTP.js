import axios from "axios";
import { toast } from "react-toastify";

export const SentOTP = async (number) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/auth/send-otp",
      number
    );
  } catch (error) {
    if (error.response) {
      console.log("Failed to send OTP:", error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      console.error("Request error:", error.request);
      toast.error("Something went wrong. Please try again later.");
    } else {
      console.error("Error:", error.message);
      toast.error("Something went wrong. Please try again later.");
    }
    err = error;
  }
  return res || err;
};
