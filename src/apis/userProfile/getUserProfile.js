import axios from "axios";
import { toast } from "react-toastify";

export const GetUserProfile = async (token, logOut) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.get(
      "https://staging.pythagorasvastgoedcalculator.nl/api/show/profile",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      console.log("TOkken Expired Logginh Out");
      logOut();
      console.log("logging Out");
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
