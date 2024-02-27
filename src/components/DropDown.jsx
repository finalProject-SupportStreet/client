import { Menu, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

function MyDropdown() {
  const [theme, setTheme] = useState(null);

  // Set theme based on user's preference
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark"); // Check for dark mode preference
    } else {
      setTheme("light"); // Set to light mode if not in dark mode
    }
  }, []);

  // Add or remove dark class from document based on theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Add dark class
      localStorage.theme = "dark"; // Whenever the user explicitly chooses dark mode
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark class
      localStorage.theme = "light"; // Whenever the user explicitly chooses light mode
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
  };
  // className="flex items-center flex-col"
  return (
    <Menu>
      <Menu.Button>
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Menu.Button>
       {/* Use the `Transition` component. */}
       <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
      <Menu.Items className="flex items-center flex-col">
        <Menu.Item>
          {({ active }) => (
            <a className={`${active && "bg-blue-500"}`} href="/login">
              Login
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/logout"
            >
              Logout
            </a>
          )}
        </Menu.Item>
        {/* <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item> */}
        <Menu.Item>
          <Menu.Button
            className="bg-green-200 p-1 rounded-s-3xl text-gray-900 dark:text-slate-600"
            onClick={handleThemeSwitch}
          >
            {theme} mode
          </Menu.Button>
        </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MyDropdown;
