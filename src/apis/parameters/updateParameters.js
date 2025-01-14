import axios from "axios";

export const UpdateParameters = async (formData, token, logOut) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/standardparameter/",
      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      console.log("TOkken Expired Logging Out");
      logOut();
    }
    if (error.response) {
      console.log("Update parameters error:", error.response.data);
    }
    err = error;
  }
  return res || err;
};
