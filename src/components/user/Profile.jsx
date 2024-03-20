import { useContext, useState } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
} from "../reuseable/styles/reuseableComponents.jsx";
import { UserContext } from "../context/userContext.jsx";

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(UserContext);

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
      const res = await fetch(
        `http://localhost:5500/edit/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...updatedData,
          }),
        }
      );
      const data = await res.json();
      setUserData(data.user);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Groups:",userData.groups);

  return (
    <div className="update-profile">
      <div className="flex flex-col border-2 ">
        <img
          src="../avatar-icon.jpg"
          alt=""
          className="h-40 pb-2 object-contain"
        />
        <div className="relative bottom-8 left-20">
          <button className="p-1 rounded-2xl border-2 bg-slate-50">+</button>
          <h2 className="border-2 right-20 top-2 relative text-center">
            {" "}
            {userData.firstName}{" "}
          </h2>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="aboutMe"
          id="aboutMe"
          // value={userData.groups}

          cols="23"
          rows="5"
          placeholder= {userData.aboutMe ? userData.aboutMe : "Hier kannst du dich mit deinen eigenen Worten vorstellen."}       
          
          className={inputStyle}
        ></textarea>
        <div>
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
        </div>
        <div>
          <label htmlFor="firstName" className={labelStyle}>
            firstName:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder={userData.firstName}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelStyle}>
            lastName:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={userData.lastName}
            className={inputStyle}
          />
        </div>
        <div>
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
        <div>
          <label htmlFor="street" className={labelStyle}>
            Street:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder={userData.address[0].street}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="number" className={labelStyle}>
            Number:
          </label>
          <input
            type="number"
            id="number"
            name="number"
            placeholder={userData.address[0].number}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="zip" className={labelStyle}>
            ZIP:
          </label>
          <input
            type="number"
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
