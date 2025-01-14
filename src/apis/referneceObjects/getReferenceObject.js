import axios from "axios";

export const GetReferenceObject = async (
  valuationId,
  referenceId,
  token,
  logOut
) => {
  let res = "";
  let err = "";

  try {
    // Make the API request using axios.post
    res = await axios.get(
      `https://staging.pythagorasvastgoedcalculator.nl/api/${valuationId}/refrenceproperty/${referenceId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.log("Update :", error.response.data);
      console.log("error", error.response);
    }
    if (error.response.status === 401) {
      console.log("TOkken Expired Logginh Out");
      logOut();
    }
    err = error;
  }
  return res || err;
};
