import axios from "axios";

export const ReferenceValueCalculation = async (formData, token, logOut) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/calculate/refrencevalue",
      formData,

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
    }
    if (error.response) {
      console.log("calulation error:", error.response.data);
    }
    err = error;
  }
  return res || err;
};
