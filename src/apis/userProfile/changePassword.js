import axios from "axios";
import { toast } from "react-toastify";

export const ChangePassword = async (passwordData, token, logOut) => {
  let res = "";
  let err = "";
  console.log(passwordData, token);

  try {
    // Make the API request using axios.post
    res = await axios.put(
      "https://staging.pythagorasvastgoedcalculator.nl/api/update/password/",
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      logOut();
      console.log("logging Out");
    }
    if (error.response) {
      console.log("Response error:", error.response.data.message);
      toast.error(error.response.data.message);
    } else if (error.request) {
      console.log("Request error:", error.request);
      toast.error("Something went wrong. Please try again later.");
    } else {
      console.log("Error:", error.message);
      toast.error("Something went wrong. Please try again later.");
    }
    err = error;
  }
  return res || err;
};
