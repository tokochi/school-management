import Store from "electron-store";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../contexts/Store";
import UserAvatar from "../../data/icons/user.png";
import Transition from "../../utils/Transition";

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const theme = useStore((state) => state.theme);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const schema = { user: { type: "object" } };
  const store = new Store({ schema });
  const loggedUser = useStore((state) => state.user);
  const isLoggedIn = store?.get("isLoggedIn");
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="inline-flex">
      <button ref={trigger} className="inline-flex justify-center items-center group" aria-haspopup="true" onClick={() => setDropdownOpen(!dropdownOpen)} aria-expanded={dropdownOpen}>
        <div className="relative">
          <img className="w-8 h-8 rounded-full" src={store?.get("user")?.logo || UserAvatar} width="32" height="32" alt="User" />
          {isLoggedIn && <div className="absolute top-0 left-6 w-2.5 h-2.5 bg-emerald-500  rounded-full"></div>}
        </div>

        <div className="flex items-center truncate">
          <span className=" truncate ml-2 text-sm font-medium group-hover:text-slate-800 capitalize">{loggedUser?.userName}</span>
          <svg className="relative w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 ${theme.back} border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === "right" ? "right-0" : "left-0"}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0">
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            {/* <div className="font-medium text-slate-800">Tokochi SARL.</div> */}
            <div className={`text-xs ${theme.text} italic`}>Administrateur</div>
          </div>
          <ul>
            <li>
              <Link className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3" to="/settings/account" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Param??tres
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/login"
                onClick={() => {
                  store?.set("user", {});
                  store?.set("reset", true);
                  store?.set("isLoggedIn", false);
                  useStore.setState((state) => ({ isLoggedIn: false }));
                  setDropdownOpen(!dropdownOpen);
                }}>
                D??connection
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
