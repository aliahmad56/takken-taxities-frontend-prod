import axios from "axios";

export const DeleteReferenceObject = async (id, token, logOut) => {
  let res = "";
  let err = "";
  console.log(id);
  console.log(token);
  try {
    // Pass the id as a part of the URL
    res = await axios.delete(
      `https://staging.pythagorasvastgoedcalculator.nl/api/delete/refrenceproperty/${id}`,
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
    err = error;
  }
  return res || err;
};
