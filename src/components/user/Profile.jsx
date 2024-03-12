import { useState } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
} from "../reuseable/styles/reuseableComponents.jsx";

const UpdateProfile = () => {
  // get userData from  localStorage and convert it to JSON object
  // try{
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);
  //   /* if(!userInfo){
  //     window.location.href="/login"
  //   }else{
  //     let id=userInfo._id;
  //   }  */
  //   }catch(err) {console
  //     .log(err);}

  // const [firstName, setFirstName] = useState(userData ? userData.first_name : '');
  // const [lastName, setLastName] = useState(userData? userData.last_name: '');
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('update profile', firstName, lastName);
  //   fetch(`http://localhost:50
  //   00/api/users/${id
  //     }`, {
  //       method:'PUT' ,
  //       headers:{
  //         'Content-Type':'application/json'
  //       },
  //       body:JSON.stringify({
  //         first_name:firstName,
  //         last_name:lastName
  //       })
  //     }).then((res)=> res.json())
  //       .then((data)=>{
  //         alert('profile updated successfully!')
  //         window.location.reload()
  //       });
  // };

  // Method_2
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    // Add other fields as needed
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5500/edit/:id?${userData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: firstName,
        // last_name:lastName
        email: email
      }),
    }).then((res) => res.json());
    console.log("update profile", firstName, email)
    .then((data) => {
      alert("profile updated successfully!");
      window.location.reload();
    });
  };

  return (
    <div className="update-profile">
      <h2 className="pb-6">Update {userData.firstName} Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={labelStyle}>
            firstName:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={userData.firstName}
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
