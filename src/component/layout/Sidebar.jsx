import logo from "../../data/icons/logo.png";
import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useStore } from "../../contexts/Store";
import Store from "electron-store";
import students from "../../data/icons/students.png";
import renew from "../../data/icons/renew.png";
import teacher from "../../data/icons/teacher.png";
import classe from "../../data/icons/classe.png";
import amount from "../../data/icons/amount.png";
import attendance from "../../data/icons/attendance.png";

export default function Sidebar() {
  const theme = useStore((state) => state.theme);
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef(null);
  const store = new Store();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <div id="sidebar" ref={sidebar} className={` sticky top-0 w-[132px]  flex-none h-screen overflow-hidden select-none ${theme.side} "}`}>
      <div className={`  ${isLoggedIn ? "w-[132px] " : "opacity-0 w-0"} transition-all duration-500 flex-none h-screen  overflow-y-auto  ${theme.side}`}>
        <div className="flex items-center justify-center mt-2 mb-5 select-none">
          <button>
            <img className="w-[60px] h-[60px] rounded-full bg-contain" src={store?.get("company")?.logo || logo} />
          </button>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("membershiplist") && "bg-slate-900"}`}>
          <NavLink end to="/membershiplist" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("membershiplist") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={renew} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Abonnés</span>
            </div>
          </NavLink>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("students") && "bg-slate-900"}`}>
          <NavLink end to="/students" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("students") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={students} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Élèves</span>
            </div>
          </NavLink>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("teachers") && "bg-slate-900"}`}>
          <NavLink end to="/teachers" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("teachers") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={teacher} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Enseignants</span>
            </div>
          </NavLink>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("classes") && "bg-slate-900"}`}>
          <NavLink end to="/classes" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("classes") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={classe} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Classes</span>
            </div>
          </NavLink>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("attendances") && "bg-slate-900"}`}>
          <NavLink end to="/attendances" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("attendances") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={attendance} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Présence</span>
            </div>
          </NavLink>
        </div>
        <div className={`px-5 py-6 border-t-[1px] border-slate-900 ${pathname.includes("depense") && "bg-slate-900"}`}>
          <NavLink end to="/depense" className={`block  text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("depense") && "hover:text-slate-200"}`}>
            <div className="flex flex-col justify-center items-center ">
              <img className=" h-6 " src={amount} />
              <span className="text-sm font-medium   2xl:opacity-100 duration-200">Dépenses</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
