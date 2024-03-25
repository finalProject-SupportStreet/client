import { useContext, useState } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  trashButton,
} from "../reuseable/styles/reuseableComponents.jsx";
import { UserContext } from "../context/userContext.jsx";

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [uploadImg, setUploadImg] = useState(null);

  // image Upload
  function handleImageUpload(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a file reader object

    // Define a callback function to be executed when file reading is complete
    reader.onloadend = () => {
      // Convert the image file to a base64 string
      const imageData = reader.result;
      // Update the state with the base64 string representing the uploaded image
      setUploadImg(imageData);
    };

    if (file) {
      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    }
  }
  function handleButtonClick() {
    // Trigger the file input click event programmatically
    document.getElementById("image").click();
  }
  function handleDeleteImage() {
    // Reset the uploaded image state
    setUploadImg(null);
  }

  // Trash symbol
  const trash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );

  // Function to handle delete form field
  const onDelete = async (fieldName) => {
    console.log("fieldName:", fieldName);

    try {
      const res = await fetch(`http://localhost:5500/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          [fieldName]: null,
        }),
      });
      const data = await res.json();
      setUserData(data.user);
      alert("Removed successfully!");
    } catch (error) {
      console.log(error);
    }

    // window.location.reload();
    return;

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData };
      // Delete the targeted field
      delete updatedUserData[fieldName];
      return updatedUserData;
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataProps = Object.fromEntries(formData);
    // console.log(formDataProps);
    const updatedData = {};
    for (let nameAttr in formDataProps) {
      // console.log(nameAttr);
      if (formDataProps[nameAttr] !== "") {
        updatedData[nameAttr] = formDataProps[nameAttr];
      }
    }

    console.log("updatedData:", updatedData);

    try {
      const res = await fetch(`http://localhost:5500/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...updatedData,
        }),
      });
      const data = await res.json();
      setUserData(data.user);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Groups:", userData.groups);
  // console.log("userData:",userData);
  // return null
  return (
    <div className="update-profile">
      <div className="flex flex-col border-2 relative">
        {/* Display the uploaded image */}
        {uploadImg && (
          <div className="relative">
            <img src={uploadImg} alt="" className="h-40 pb-2 object-contain" />
            {/* Trash symbol */}
            <button
              className="absolute top-2 -right-4 p-1 opacity-70 rounded-full border-2 bg-red-500 text-white hover:bg-red-600 transition duration-300 hover:opacity-100"
              onClick={handleDeleteImage}
            >
              🗑️
            </button>
          </div>
        )}
        {!uploadImg && (
          <img
            src="../avatar-icon.jpg"
            alt=""
            className="h-40 pb-2 object-contain"
          />
        )}
        <div className="relative bottom-8 left-20">
          {/* Button for image upload */}
          <button
            className="p-1 rounded-2xl border-2 bg-slate-50"
            onClick={handleButtonClick}
          >
            +
          </button>
          <h2 className="border-2 right-20 top-2 relative text-center">
            {" "}
            {userData.firstName}{" "}
          </h2>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="aboutMe"
          id="aboutMe"
          // value={userData.groups}

          cols="23"
          rows="5"
          placeholder={
            userData.aboutMe
              ? userData.aboutMe
              : "Hier kannst du dich mit deinen eigenen Worten vorstellen."
          }
          className={inputStyle}
        ></textarea>
        {/* <div>
          <label htmlFor="groups">Groups:</label>
          <select
            multiple
            value={userData.groups}
            // onChange={handleSelectChange}
            id="groups"
            name="groups"
          >
            
            {userData.groups}
          </select>
        </div> */}
        <div className="relative">
          <label htmlFor="firstName" className={labelStyle}>
            firstName:
            <button
              type="button"
              className={trashButton}
              onClick={() => onDelete("firstName")}
            >
              {trash}
            </button>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder={userData.firstName}
            className={inputStyle}
          />
        </div>
        <div className="relative">
          <label htmlFor="lastName" className={labelStyle}>
            lastName:
            <button
              type="button"
              className={trashButton}
              onClick={() => onDelete("lastName")}
            >
              {trash}
            </button>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={userData.lastName}
            className={inputStyle}
          />
        </div>
        <div className="relative">
          <label htmlFor="email" className={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={userData.email}
            className={inputStyle}
          />
        </div>
        <div className="relative">
          <label htmlFor="street" className={labelStyle}>
            Street:
            <button
              type="button"
              className={trashButton}
              onClick={() => onDelete("street")}
            >
              {trash}
            </button>
          </label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder={userData.address[0].street}
            className={inputStyle}
          />
        </div>
        <div className="relative">
          <label htmlFor="number" className={labelStyle}>
            Number:
            <button
              type="button"
              className={trashButton}
              onClick={() => onDelete("number")}
            >
              {trash}
            </button>
          </label>
          <input
            type="text"
            id="number"
            name="number"
            placeholder={userData.address[0].number}
            className={inputStyle}
          />
        </div>
        <div className="relative">
          <label htmlFor="zip" className={labelStyle}>
            ZIP:
            <button
              type="button"
              className={trashButton}
              onClick={() => onDelete("zip")}
            >
              {trash}
            </button>
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder={userData.address[0].zip}
            className={inputStyle}
          />
        </div>
        {/* Add other form fields as needed */}
        <button type="submit" className={buttonStyle}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
