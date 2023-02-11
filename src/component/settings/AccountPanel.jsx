import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import Store from "electron-store";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../contexts/Store";
import facebook from "../../data/icons/facebook.png";
import Image from "../../data/icons/user.png";
import card from "../../data/icons/userCard.png";
import Animation from "../animation";
import PopupDialog from "../dialog/PopupDialog";
import deletePng from "./../../data/icons/delete.png";
export default function AccountPanel() {
  const schema = {
    user: { default: { name: "John Wick", facebook: "John-Wick", email: "Email@gmail.com", phone: "05 40 22 27 82", pages: [] }, type: "object" },
    users: {
      type: "array",
      default: [],
    },
  };
  const theme = useStore((state) => state.theme);
  const navigate = useNavigate();
  const store = new Store({ schema });
  const [refresh, setRefresh] = useState(false);
  const users = store?.get("users");
  //store?.set("users", [{ userName:"admin", password:"admin", isAdmin: true,caisse:1, pages: ["/products", "/provider", "/customers", "/sell", "/buy", "/caisse", "/facture", "/bonAchat"] }]);
  return (
    <div className={`grow overflow-y-auto  h-[calc(100vh_-_190px)] ${theme.back} ${theme.textXl} transition-colors  duration-300`}>
      <div className=" p-4 ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/add");
            }}
            className={`btn ${theme.button} hover:bg-indigo-600 text-white`}>
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Ajouter Compte</span>
          </button>
        </div>
        <div className="relative flex gap-10 shrink-0">
          <Animation visible={true} from={{ x: -400, y: 0, opacity: 0 }} enter={{ x: 0, y: 0, opacity: 1 }} leave={{}}>
            <div>
              <img className="max-w-[300px] flex-1 bg-transparent drop-shadow-md rounded-3xl" src={card} />
              <div className="absolute bg-transparent top-[20px]  left-[80px] shrink-0">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center h-20 p-4 bg-transparent rounded-lg  border-gray-300 border-dashed cursor-pointer  hover:bg-gray-10">
                  <div className="flex flex-col justify-center items-center pt-5 pb-4">
                    <img htmlFor="dropzone-file" className="w-[100px] h-[100px]  rounded-full bg-contain" src={store?.get("user")?.logo || Image} width="80" height="80" alt="User upload" />
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={(e) => {
                      const temp = store.get("user");
                      store.set("user", { ...temp, logo: e.target.files[0].path });
                      const temparray = users.filter((user) => user.userName !== temp.userName);
                      store.set("users", [...temparray, { ...temp, logo: e.target.files[0].path }]);
                      setRefresh(!refresh);
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("user");
                  e.target.value != null && store.set("user", { ...temp, userName: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("user")?.userName}
                className="p-0 w-[250px] top-[120px] capitalize  left-[20px] border-none absolute bg-transparent text-center text-2xl font-semibold text-slate-700 z-10"
                type="text"
              />
              <span className="p-0 w-[250px] top-[145px]  left-[20px] border-none absolute bg-transparent text-center text-sm italic  text-slate-700 z-10">
                {store?.get("user")?.isAdmin ? "Administrateur" : "Employée"}
              </span>
              <div className="absolute top-[265px]  left-[20px] text-white flex gap-2 items-center">
                <label className="block text-sm font-medium " htmlFor="business-id">
                  Nom:
                </label>
                <input
                  id="business-id"
                  onChange={(e) => {
                    const temp = store.get("user");
                    e.target.value != null && store.set("user", { ...temp, name: e.target.value });
                    const temparray = users.filter((user) => user.userName !== temp.userName);
                    store.set("users", [...temparray, { ...temp, name: e.target.value }]);
                    setRefresh(!refresh);
                  }}
                  value={store?.get("user")?.name}
                  className="p-0 w-[230px] text-slate-300 border-none bg-transparent"
                  type="text"
                />
              </div>
              <div className="absolute top-[295px]  left-[20px] text-white flex gap-2 items-center">
                <label className="block text-sm font-medium " htmlFor="business-id">
                  Caisse N°:
                </label>
                <input
                  id="business-id"
                  min="1"
                  onChange={(e) => {
                    const temp = store.get("user");
                    e.target.value != null && store.set("user", { ...temp, caisse: e.target.value });
                    const temparray = users.filter((user) => user.userName !== temp.userName);
                    store.set("users", [...temparray, { ...temp, caisse: e.target.value }]);
                    setRefresh(!refresh);
                  }}
                  value={store?.get("user")?.caisse}
                  className="p-0 w-[50px] text-slate-300 border-none bg-transparent"
                  type="number"
                />
              </div>
              <div className="absolute top-[325px]  left-[20px] text-white flex gap-2 items-center">
                <label className="block text-sm font-medium " htmlFor="business-id">
                  Email:
                </label>
                <input
                  id="business-id"
                  onChange={(e) => {
                    const temp = store.get("user");
                    e.target.value != null && store.set("user", { ...temp, email: e.target.value });
                    const temparray = users.filter((user) => user.userName !== temp.userName);
                    store.set("users", [...temparray, { ...temp, email: e.target.value }]);
                    setRefresh(!refresh);
                  }}
                  value={store?.get("user")?.email}
                  className="p-0 w-[220px] text-slate-300 border-none bg-transparent"
                  type="email"
                />
              </div>
              <div className="absolute top-[355px]  left-[20px] text-white flex gap-2 items-center">
                <label className="block text-sm font-medium " htmlFor="business-id">
                  Télephone:
                </label>
                <input
                  id="business-id"
                  onChange={(e) => {
                    const temp = store.get("user");
                    e.target.value != null && store.set("user", { ...temp, phone: e.target.value });
                    const temparray = users.filter((user) => user.userName !== temp.userName);
                    store.set("users", [...temparray, { ...temp, phone: e.target.value }]);
                    setRefresh(!refresh);
                  }}
                  value={store?.get("user")?.phone}
                  className="p-0 w-[200px] text-slate-300 border-none bg-transparent"
                  type="email"
                />
              </div>
              <div className="absolute top-[425px]  left-[70px] text-white flex gap-2 items-center">
                <img className="w-[30px] h-[30px]" src={facebook} />
                <input
                  id="name"
                  onChange={(e) => {
                    const temp = store.get("user");
                    e.target.value != null && store.set("user", { ...temp, facebook: e.target.value });
                    const temparray = users.filter((user) => user.userName !== temp.userName);
                    store.set("users", [...temparray, { ...temp, facebook: e.target.value }]);
                    setRefresh(!refresh);
                  }}
                  value={store?.get("user")?.facebook}
                  className="p-0 w-[170px] border-none bg-transparent  text-white z-10"
                  type="text"
                />
              </div>
            </div>
          </Animation>
          <section className="max-w-[600px] relative h-[480px] overflow-x-hidden overflow-y-auto">
            <h2 className="text-xl  font-bold mb-5"> Liste Utilisateurs</h2>
            <div className="flex">
              <div className=" ">
                <div className="flex relative flex-wrap  gap-5 items-center justify-between p-2">
                  <Animation visible={true} from={{ x: 400, y: 0, opacity: 0 }} enter={{ x: 0, y: 0, opacity: 1 }} leave={{}}>
                    {store?.get("users").map((user) => (
                      <div key={uuidv4()} className="flex m-2 flex-col justify-between border h-[135px] border-indigo-300 bg-[#1d252f]  drop-shadow-md rounded-xl p-2">
                        <div className="flex items-center justify-between">
                          <div key={uuidv4()} className="w-20 relative ">
                            <img className="w-[80px] h-[80px] border border-indigo-50 rounded-full bg-contain" src={user?.logo || Image} width="80" height="80" />
                            {user.userName === store.get("user").userName && <div className="absolute top-0 right-0 w-4 h-4 animate-pulse bg-emerald-500 border-2 border-white rounded-full"></div>}
                          </div>
                          <div key={uuidv4()} className="flex flex-col p-2 items-center text-white">
                            <span className="font-semibold capitalize">{user.userName}</span>
                            <span className="text-sm text-slate-200 italic capitalize">{user?.isAdmin ? "Administrateur" : "employé"}</span>
                            <span className="text-slate-200">{user.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 ">
                          {user.userName !== store.get("user")?.userName && (
                            <button
                              id={user}
                              disabled={user.userName === store.get("user")?.userName}
                              onClick={(e) => {
                                const temparray = users.filter((cur) => cur.userName !== user.userName);
                                store.set("users", temparray);
                                setRefresh(!refresh);
                              }}
                              className="btn bg-indigo-500  hover:bg-indigo-600 text-white ">
                              <img className="w-[20px] h-[20px] " src={deletePng} />
                            </button>
                          )}
                          <PopupDialog
                            id="addBrand"
                            close={close}
                            header="Autorisation"
                            width="500px"
                            bg="bg-indigo-500"
                            svg={
                              <svg className="w-[20px] h-[20px]  text-white shrink-0" viewBox="0 0 24 24">
                                <path
                                  d="M18.414062 2C18.158188 2 17.902031 2.0974687 17.707031 2.2929688L16 4L20 8L21.707031 6.2929688C22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062L19.121094 2.2929688C18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5L3 17L3 21L7 21L18.5 9.5L14.5 5.5 z"
                                  fill="#fff"
                                />
                              </svg>
                            }>
                            <table className="table-auto w-[450px]">
                              <tbody>
                                {user.userName !== store.get("user")?.userName && (
                                  <tr id="admin" className="border-b  border-slate-200">
                                    <td className="flex flex-col justify-center pb-5">
                                      <span className="text-slate-800 text-lg font-semibold">Compte Administrateur</span>
                                      <span className="text-slate-800 text-sm italic">Ajouter comptes,modifier paramètres,accès tous les pages </span>
                                    </td>
                                    <td className="">
                                      <div>
                                        <label htmlFor="checked"></label>
                                        <SwitchComponent
                                          id="checked"
                                          checked={user?.isAdmin}
                                          change={(e) => {
                                            e.checked
                                              ? store.set(
                                                  "users",
                                                  users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, isAdmin: true } : curUser))
                                                )
                                              : store.set(
                                                  "users",
                                                  users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, isAdmin: false } : curUser))
                                                );
                                          }}></SwitchComponent>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                <tr id="vente" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Ventes</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/sell")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser?.pages?.filter((page) => page !== "/sell");
                                          const addedPages = [...filtredPages, "/sell"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="achat" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Achat</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/buy")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/buy");
                                          const addedPages = [...filtredPages, "/buy"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="product" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Produit</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/products")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/products");
                                          const addedPages = [...filtredPages, "/products"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="customer" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Client</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/customers")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/customers");
                                          const addedPages = [...filtredPages, "/customers"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="provider" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Fournisseur</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/provider")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/provider");
                                          const addedPages = [...filtredPages, "/provider"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="caisse" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Caisse</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/caisse")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/caisse");
                                          const addedPages = [...filtredPages, "/caisse"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="facture" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Facture</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/facture")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/facture");
                                          const addedPages = [...filtredPages, "/facture"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="bonAchat" className="border-b border-slate-200">
                                  <td className="flex flex-col justify-center">
                                    <span className="text-slate-800 text-lg font-semibold">Bon d'achat</span>
                                    <span className="text-slate-800 text-sm italic">ajouter, supprimer, modifier</span>
                                  </td>
                                  <td className="">
                                    <div>
                                      <label htmlFor="checked"></label>
                                      <SwitchComponent
                                        id="checked"
                                        checked={user?.pages?.includes("/bonAchat")}
                                        change={(e) => {
                                          const myUser = store?.get("users")?.find((curUser) => user.userName === curUser.userName);
                                          const filtredPages = myUser.pages.filter((page) => page !== "/bonAchat");
                                          const addedPages = [...filtredPages, "/bonAchat"];
                                          e.checked
                                            ? store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: addedPages } : curUser))
                                              )
                                            : store.set(
                                                "users",
                                                users.map((curUser) => (user.userName === curUser.userName ? { ...curUser, pages: filtredPages } : curUser))
                                              );
                                        }}></SwitchComponent>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </PopupDialog>
                        </div>
                      </div>
                    ))}
                  </Animation>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-3 border-t border-slate-200">
          <div className="flex self-end">
            <button
              onClick={(e) => {
                const user = store.get("user");
                store.set("user", { userName: user.userName });
                location.reload();
              }}
              // type="submit"
              className={`btn ${theme.nav} ${theme.text} border-slate-200 hover:border-slate-300 text-slate-600`}>
              Reset
            </button>
            <button
              type="submit"
              onClick={(e) => {
                window.location.reload();
              }}
              //  type="submit"
              className={`btn ${theme.button} hover:bg-indigo-600 text-white ml-3`}>
              Sauvgarder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
