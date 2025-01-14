import axios from "axios";

export const GetAllValuationReferenceObject = async (
  valuationId,
  token,
  logOut
) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.get(
      `https://staging.pythagorasvastgoedcalculator.nl/api/${valuationId}/refrenceproperty`,

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
      console.log("Update parameters error:", error.response.data);
      console.log("error", error.response);
    }
    err = error;
  }
  return res || err;
};
