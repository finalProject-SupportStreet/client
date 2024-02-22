import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { postDate } from "./reuseable/fetchData.jsx";
import { buttonStyle, inputStyle, labelStyle } from "./reuseable/styles/reuseableComponents.jsx";

const UserLogin = () => {
  const [, setLoggedIn] = useOutletContext();
  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
    const el = event.target.elements;
    const body = {
      email: el.email.value,
      password: el.password.value,
      // username: el.username.value,
    };
    // console.log(body);
    try {
      const data = await postDate("login",  body)
      // console.log(data);
      setLoggedIn(true);
      navigate("/")
    } catch (error) {
      navigate("/login")
    }

  };
  return (
    <form
      className="h-96 flex flex-col justify-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
      onSubmit={login}
    >
      <div className="p-2 bg-slate-500/15 shadow-lg rounded w-full gap-2">
         <label htmlFor="email" className="border-b-2">
          E-Mail:{" "}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={inputStyle}
        />
        {/* <label htmlFor="username" className={labelStyle}>
          Username:{" "}
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className={inputStyle}
        /> */}
        <p className="text-red-500">This field is required</p>
        <label htmlFor="password" className={labelStyle}>Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          className={inputStyle}
        />
      </div>
      {/*  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3> */}
      <button className={buttonStyle}>Login</button>
      

    </form>
  );
};

export default UserLogin;
