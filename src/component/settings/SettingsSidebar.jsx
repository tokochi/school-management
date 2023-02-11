import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useStore } from "../../contexts/Store";

function SettingsSidebar() {
  const location = useLocation();
  const { pathname } = location;
  const theme = useStore((state) => state.theme);
  return (
    <div className={`flex flex-nowrap  text-slate-200 overflow-x-scroll ${theme.side} no-scrollbar md:overflow-auto px-3 py-6 min-w-60 `}>
      {/* Group 1 */}
      <div>
        <div className="text-xs font-semibold text-slate-200 uppercase mb-3">Paramètres</div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/account" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/account") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/account") && "text-indigo-400"}`} viewBox="0 0 16 16">
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/account") ? "text-indigo-500" : "hover:text-slate-400"}`}>Mon compte</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/company" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/company") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/company") && "text-indigo-400"}`} viewBox="0 0 16 16">
                <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/company") ? "text-indigo-500" : "hover:text-slate-400"}`}>Entreprise</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/security" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/security") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/security") && "text-indigo-400"}`} viewBox="4 4 24 24">
                <path d="M16 4C13.75 4 12.242188 4.882813 10.886719 5.621094C9.527344 6.359375 8.28125 7 6 7L5 7L5 8C5 15.71875 7.605469 20.738281 10.246094 23.777344C12.886719 26.816406 15.625 27.925781 15.625 27.925781L16 28.078125L16.367188 27.929688C16.367188 27.929688 19.113281 26.832031 21.753906 23.796875C24.394531 20.765625 27 15.746094 27 8L27 7L26 7C23.730469 7 22.484375 6.359375 21.125 5.621094C19.761719 4.882813 18.25 4 16 4 Z M 16 6C17.75 6 18.765625 6.617188 20.171875 7.378906C21.351563 8.019531 22.910156 8.625 24.933594 8.835938C24.742188 15.605469 22.503906 19.894531 20.246094 22.484375C18.195313 24.839844 16.480469 25.65625 16 25.871094C15.523438 25.652344 13.804688 24.824219 11.753906 22.464844C9.496094 19.867188 7.257813 15.578125 7.070313 8.835938C9.097656 8.625 10.660156 8.019531 11.839844 7.378906C13.242188 6.617188 14.25 6 16 6 Z M 16 10C14.34375 10 13 11.34375 13 13C13 14.171875 13.6875 15.238281 14.753906 15.722656L14 21L18 21L17.246094 15.722656C18.3125 15.238281 19 14.171875 19 13C19 11.34375 17.65625 10 16 10Z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/security") ? "text-indigo-500" : "hover:text-slate-400"}`}>Sécurité</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/notifications" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/notifications") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/notifications") && "text-indigo-400"}`} viewBox="0 2 20 20">
                <path d="M12 2C11.172 2 10.5 2.672 10.5 3.5L10.5 4.1953125C7.9131836 4.862095 6 7.2048001 6 10L6 16L4 18L4 19L10.269531 19 A 2 2 0 0 0 10 20 A 2 2 0 0 0 12 22 A 2 2 0 0 0 14 20 A 2 2 0 0 0 13.728516 19L20 19L20 18L18 16L18 10C18 7.2048001 16.086816 4.862095 13.5 4.1953125L13.5 3.5C13.5 2.672 12.828 2 12 2 z M 5.9082031 2.0820312C3.5352031 3.9100312 2 6.772 2 10L4 10C4 7.418 5.2289531 5.1280156 7.1269531 3.6660156L5.9082031 2.0820312 z M 18.091797 2.0820312L16.873047 3.6660156C18.771047 5.1280156 20 7.418 20 10L22 10C22 6.772 20.464797 3.9100312 18.091797 2.0820312 z M 12 6C14.206 6 16 7.794 16 10L16 16L16 16.828125L16.171875 17L7.828125 17L8 16.828125L8 16L8 10C8 7.794 9.794 6 12 6 z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/notifications") ? "text-indigo-500" : "hover:text-slate-400"}`}>Notifications</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/theme" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/theme") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/theme") && "text-indigo-400"}`} viewBox="2 4 24 24">
                <path d="M19 5 A 2 2 0 0 0 17.269531 6L4 6 A 1.0001 1.0001 0 1 0 4 8L17.271484 8 A 2 2 0 0 0 19 9 A 2 2 0 0 0 21 7 A 2 2 0 0 0 19 5 z M 22.859375 6C22.942375 6.321 23 6.653 23 7C23 7.347 22.942375 7.679 22.859375 8L26 8 A 1 1 0 0 0 27 7 A 1 1 0 0 0 26 6L22.859375 6 z M 9 13 A 2 2 0 0 0 7.2714844 14L4 14 A 1.0001 1.0001 0 1 0 4 16L7.2695312 16 A 2 2 0 0 0 9 17 A 2 2 0 0 0 11 15 A 2 2 0 0 0 9 13 z M 12.859375 14C12.942375 14.321 13 14.653 13 15C13 15.347 12.942375 15.679 12.859375 16L26 16 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26 14L12.859375 14 z M 15 21 A 2 2 0 0 0 13.269531 22L4 22 A 1.0001 1.0001 0 1 0 4 24L13.271484 24 A 2 2 0 0 0 15 25 A 2 2 0 0 0 17 23 A 2 2 0 0 0 15 21 z M 18.859375 22C18.942375 22.321 19 22.653 19 23C19 23.347 18.942375 23.679 18.859375 24L26 24 A 1 1 0 0 0 27 23 A 1 1 0 0 0 26 22L18.859375 22 z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/theme") ? "text-indigo-500" : "hover:text-slate-400"}`}>Apparence</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/backup" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/backup") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/backup") && "text-indigo-400"}`} viewBox="2 2 20 20">
                <path d="M12.0625 3.09375C11.011719 3.09375 10.054688 3.789063 9.4375 4.78125L7.53125 8L9.25 9L11.15625 5.84375C11.539063 5.234375 11.863281 5.09375 12.0625 5.09375C12.261719 5.09375 12.554688 5.234375 12.9375 5.84375L15.21875 9.6875L14.1875 10.3125L18 12.5L18 8L16.9375 8.65625L14.65625 4.78125C14.039063 3.789063 13.113281 3.09375 12.0625 3.09375 Z M 7.40625 10L3.6875 12.1875L4.65625 12.78125L2.53125 16.5C1.914063 17.546875 1.773438 18.699219 2.3125 19.625C2.851563 20.550781 3.914063 21 5.09375 21L10 21L10 19L5.09375 19C4.371094 19 4.117188 18.773438 4.03125 18.625C3.945313 18.476563 3.867188 18.152344 4.25 17.5L4.28125 17.5L6.375 13.84375L7.40625 14.5 Z M 19.875 13.78125L18.125 14.8125L19.75 17.5L19.75 17.53125C20.117188 18.117188 20.066406 18.421875 19.96875 18.59375C19.871094 18.765625 19.609375 19 18.90625 19L15 19L15 17.5L11 20L15 22.5L15 21L18.90625 21C20.101563 21 21.191406 20.523438 21.71875 19.59375C22.242188 18.675781 22.082031 17.503906 21.46875 16.5L21.4375 16.5L21.4375 16.46875Z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/backup") ? "text-indigo-500" : "hover:text-slate-400"}`}>Réstauration</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/activity" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes("/settings/activity") && "bg-indigo-50"}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes("/settings/activity") && "text-indigo-400"}`} viewBox="0 0 16 16">
                <path d="M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes("/settings/activity") ? "text-indigo-500" : "hover:text-slate-400"}`}>Activités</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsSidebar;
