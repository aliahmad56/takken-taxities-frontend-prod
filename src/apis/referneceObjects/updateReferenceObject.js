import axios from "axios";

export const UpdateReferenceObject = async (formData, token, logOut) => {
  let res = "";
  let err = "";

  console.log(formData, token);
  try {
    // Make the API request using axios.post
    res = await axios.put(
      "https://staging.pythagorasvastgoedcalculator.nl/api/update/refrenceproperty",
      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.log("Update Valuation error:", error.response.data);
    }
    if (error.response.status === 401) {
      console.log("TOkken Expired Logginh Out");
      logOut();
    }
    err = error;
  }
  return res || err;
};
