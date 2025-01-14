import axios from "axios";
import { toast } from "react-toastify";

export const LoginApi = async (loginData, t) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/auth/login",
      loginData
    );
  } catch (error) {
    if (error.response && error.response.data.message === "password is wrong") {
      toast.error(t("authPage.error.wrongPassword"));
    } else {
      toast.error(t("authPage.error.wrongfeilds"));
    }
    err = error;
  }
  return res || err;
};
