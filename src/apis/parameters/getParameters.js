import axios from "axios";

export const GetParameters = async (token, logOut) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.get(
      "https://staging.pythagorasvastgoedcalculator.nl/api/get/standardparameter",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      logOut();
      console.log("logging Out");
    } else if (error.response) {
      console.log("Update parameters error:", error.response.data);
    }
    err = error;
  }
  return res || err;
};
