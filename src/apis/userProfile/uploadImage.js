import axios from "axios";

export const UploadImage = async (formData, token, logOut) => {
  let res = "";
  let err = "";
  console.log(formData);

  try {
    // Make the API request using axios.post
    res = await axios.post(
      "https://staging.pythagorasvastgoedcalculator.nl/api/upload/profileimage/s3",
      formData,

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
      console.log("Image upload error:", error.response.data);
    }
    err = error;
  }
  return res || err;
};
