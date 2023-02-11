import Store from "electron-store";
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { loadStudents, loadTeachers, useStore } from "../../contexts/Store";
import Transition from "../../utils/Transition";
const { ipcRenderer } = require("electron");

function DropdownNotifications({ align }) {
//   const theme = useStore((state) => state.theme);
//   const normalButton = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-2 py-1 border border-slate-200 hover:border-slate-300 shadow-sm ${theme.nav} ${theme.text} duration-150 ease-in-out`;
//  const [dropdownOpen, setDropdownOpen] = useState(false);
//   const trigger = useRef(null);
//   const dropdown = useRef(null);
//     const schema = {
//       revenueTime: { type: "object", default: { time: new Date() } },
//       notifications: { default: { productAlert: true, clients: true, providers: true, revenue: true }, type: "object" },
//     };
//   const store = new Store({ schema });
//   const lastTime = store.get("revenueTime")
//   const notify = store.get("notifications");
//   const toCurrency = useStore((state) => state.toCurrency);
//   const productsData = useStore((state) => state.products);
//   const customersData = useStore((state) => state.customers);
//   const providersData = useStore((state) => state.providers);
//   const vendingsData = useStore((state) => state.vendings).filter((vente) => Math.abs(moment(vente.time).diff(moment(), "days"))<1);
//   const total = vendingsData.reduce((acc, cur) => acc + cur.amount, 0);
//  const totalBuyPrice = vendingsData.reduce((acc, cur) => acc + cur.totalbuyPrice, 0);
//   const outStock = productsData.filter((prodct) => prodct.quantity <= (prodct.qtyAlert || 0) && prodct.notification === true && Math.abs(moment(prodct?.lastTimeNotify).diff(moment(), "days")) > 3);
//   const customerCredit = customersData.filter((cust) => cust.credit > 0 && Math.abs(moment(cust?.lastTimeNotify).diff(moment(), "days")) > 3);
//   const providerCredit = providersData.filter((cust) => cust.credit > 0 && Math.abs(moment(cust?.lastTimeNotify).diff(moment(), "days")) > 3);
//   const revenueNotify = notify?.revenue && Math.abs(moment(lastTime || new Date()).diff(moment(), "days")) > 0;



  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!dropdown.current) return;
  //     if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
  //     setDropdownOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }) => {
  //     if (!dropdownOpen || keyCode !== 27) return;
  //     setDropdownOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  return ( <div></div>
    // <div className="relative inline-flex  ">
    //   <button
    //     ref={trigger}
    //     className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${dropdownOpen && "bg-slate-200"}`}
    //     aria-haspopup="true"
    //     onClick={() => setDropdownOpen(!dropdownOpen)}
    //     aria-expanded={dropdownOpen}>
    //     <span className="sr-only">Notifications</span>
    //     <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    //       <path className="fill-current text-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
    //       <path
    //         className="fill-current text-slate-400"
    //         d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
    //       />
    //     </svg>
    //     {(outStock?.length > 0 || customerCredit?.length > 0 || providerCredit?.length > 0 || revenueNotify?.length > 0) && (
    //       <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 animate-pulse border-white rounded-full"></div>
    //     )}
    //   </button>

    //   <Transition
    //     className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80  ${theme.back} border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
    //       align === "right" ? "right-0" : "left-0"
    //     }`}
    //     show={dropdownOpen}
    //     enter="transition ease-out duration-200 transform"
    //     enterStart="opacity-0 -translate-y-2"
    //     enterEnd="opacity-100 translate-y-0"
    //     leave="transition ease-out duration-200"
    //     leaveStart="opacity-100"
    //     leaveEnd="opacity-0">
    //     <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
    //       <div className={`text-xs font-semibold  ${theme.text} uppercase pt-1.5 pb-2 px-4`}>Notifications</div>
    //       <ul>
    //         {notify.productAlert &&
    //           outStock.map((product) => (
    //             <li key={uuidv4()} className={`${theme.name === "classic" ? "border-b border-slate-200 hover:bg-gray-300" : "border-b border-slate-600 hover:bg-gray-600"}    last:border-0`}>
    //               <Link
    //                 className="block py-2 px-4 "
    //                 to="#0"
    //                 onClick={() => {
    //                   setDropdownOpen(!dropdownOpen);
    //                   productsData.forEach((curProduct) => {
    //                     if (curProduct._id === product._id) {
    //                       ipcRenderer.send("updateProduct", {
    //                         _id: product._id,
    //                         lastTimeNotify: new Date(),
    //                       });
    //                       ipcRenderer.on("refreshGridProduct:update", (e, res) => {
    //                         loadProducts();
    //                         ipcRenderer.removeAllListeners("refreshGridProduct:update");
    //                       });
    //                     }
    //                   });
    //                 }}>
    //                 <div className="block text-sm  mb-2">
    //                   <h2 className={`font-semibold  ${theme.textXl}`}>Produits En Rupture de Stock ‼️</h2>
    //                   <hr className="w-full mb-4" />

    //                   <div className="flex items-center justify-between">
    //                     <div className={`${theme.text} whitespace-nowrap font-medium  text-base  px-2`}>
    //                       <span>📦{product.name}</span>
    //                     </div>
    //                     <div className="px-2">
    //                       <div className={`${normalButton} bg-red-100 `}>
    //                         Quantité: <span className="text-red-600 ml-2 whitespace-nowrap"> {product.quantity}</span>
    //                       </div>
    //                     </div>
    //                   </div>

    //                 </div>
    //                 <span className={`block text-xs font-medium  ${theme.text}`}>{moment().format("LLLL")}</span>
    //               </Link>
    //             </li>
    //           ))}
    //         {notify.clients &&
    //           customerCredit.map((customer) => (
    //             <li key={uuidv4()} className={`${theme.name === "classic" ? "border-b border-slate-200 hover:bg-gray-300" : "border-b border-slate-600 hover:bg-gray-600"}    last:border-0`}>
    //               <Link
    //                 className="block py-2 px-4 hover:opacity-90"
    //                 to="#0"
    //                 onClick={() => {
    //                   setDropdownOpen(!dropdownOpen);
    //                   customersData.forEach((curCustomer) => {
    //                     if (curCustomer._id === customer._id) {
    //                       ipcRenderer.send("updateCustomer", {
    //                         _id: customer._id,
    //                         lastTimeNotify: new Date(),
    //                       });
    //                       ipcRenderer.on("refreshGridCustomer:update", (e, res) => {
    //                         loadCustomers();
    //                         ipcRenderer.removeAllListeners("refreshGridCustomer:update");
    //                       });
    //                     }
    //                   });
    //                 }}>
    //                 <div className="block text-sm  mb-2">
    //                   <h2 className={`font-semibold  ${theme.textXl}`}> Crédits Clients No Payé ‼️</h2>
    //                   <hr className="w-full mb-4" />
    //                   <div className="flex items-center justify-between">
    //                     <div className={`${theme.text}  font-medium  text-base whitespace-nowrap px-2`}>
    //                       <span>{customer.name}</span>
    //                     </div>
    //                     <div className="px-2">
    //                       <div className={normalButton}>
    //                         Crédit: <span className="text-red-600 ml-2 whitespace-nowrap">{toCurrency(customer.credit)}</span>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <span className={`block text-xs font-medium  ${theme.text}`}>{moment().format("LLLL")}</span>
    //               </Link>
    //             </li>
    //           ))}
    //         {notify.providers &&
    //           providerCredit.map((provider) => (
    //             <li key={uuidv4()} className={`${theme.name === "classic" ? "border-b border-slate-200 hover:bg-gray-300" : "border-b border-slate-600 hover:bg-gray-600"}    last:border-0`}>
    //               <Link
    //                 className="block py-2 px-4 hover:opacity-90"
    //                 to="#0"
    //                 onClick={() => {
    //                   setDropdownOpen(!dropdownOpen);
    //                   providersData.forEach((curProvider) => {
    //                     if (curProvider._id === provider._id) {
    //                       ipcRenderer.send("updateProvider", {
    //                         _id: provider._id,
    //                         lastTimeNotify: new Date(),
    //                       });
    //                       ipcRenderer.on("refreshGridProvider:update", (e, res) => {
    //                         loadProviders();
    //                         ipcRenderer.removeAllListeners("refreshGridProvider:update");
    //                       });
    //                     }
    //                   });
    //                 }}>
    //                 <div className="block text-sm  mb-2">
    //                   <h2 className={`font-semibold  ${theme.textXl}`}> Déttes Fournisseurs No Payé ‼️</h2>
    //                   <hr className="w-full mb-4" />
    //                   <div className="flex items-center justify-between">
    //                     <div className={`${theme.text}  font-medium  text-base whitespace-nowrap px-2`}>
    //                       <span>{provider?.name}</span>
    //                     </div>
    //                     <div className="px-2">
    //                       <div className={normalButton}>
    //                         Détte: <span className="text-red-600 ml-2 whitespace-nowrap">{toCurrency(provider.credit)}</span>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <span className={`block text-xs font-medium  ${theme.text}`}>{moment().format("LLLL")}</span>
    //               </Link>
    //             </li>
    //           ))}
    //         {revenueNotify && (
    //           <li key={uuidv4()} className={`${theme.name === "classic" ? "border-b border-slate-200 hover:bg-gray-300" : "border-b border-slate-600 hover:bg-gray-600"}    last:border-0`}>
    //             <Link
    //               className="block py-2 px-4 hover:opacity-90"
    //               to="#0"
    //               onClick={() => {
    //                 store?.set("revenueTime", { time: new Date() });
    //                 setDropdownOpen(!dropdownOpen);
    //               }}>
    //               <div className="">
    //                 <h2 className={`font-semibold  ${theme.textXl}`}>Revenue Quotidien ‼️</h2>
    //                 <hr className="w-full mb-4" />
    //                 <div className="flex gap-2 flex-col mb-4 justify-center">
    //                   <div className={normalButton}>
    //                     Nombre Total Ventes:<span className="text-green-600 ml-2 text-right">{vendingsData.length}</span>
    //                   </div>
    //                   <div className={normalButton}>
    //                     Chiffre D'affaires Ventes:
    //                     <span className="text-green-600 ml-2 text-right">{toCurrency(total)}</span>
    //                   </div>
    //                   <div className={normalButton}>
    //                     Bénéfice Ventes:
    //                     <span className="text-green-600 ml-2 text-right">{toCurrency(total - totalBuyPrice)}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <span className={`block text-xs font-medium  ${theme.text}`}>{moment().format("LLLL")}</span>
    //             </Link>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </Transition>
    // </div>
  );
}

export default DropdownNotifications;
