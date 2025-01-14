import React, {useState} from "react";
// Replace this with your actual Tailwind CSS library

import {toast} from "react-toastify";

function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    country: "",
    address: "",
  });
  const User1 =
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";

  const [userImage, setUserImage] = useState(null);

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveClick = () => {
    console.log(hello);
  };

  const handleAvatarClick = () => {
    document.getElementById("image-upload").click();
  };

  return (
    <>
      <div className="propertycontainer">
        <div
          onClick={handleAvatarClick}
          className="cursor-pointer flex items-center"
        >
          <img
            src={userImage || User1}
            alt="User Avatar"
            className="w-20 h-20 mr-5 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="text-xl font-light">Muqeet</h4>
            <p className="text-sm text-gray-600">Edit Profile</p>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              value={userData.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 border rounded w-full"
              value={userData.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone No
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              value={userData.phoneNo}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              value={userData.country}
            />
          </div>
          <div colSpan="2">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              value={userData.address}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-[45%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
