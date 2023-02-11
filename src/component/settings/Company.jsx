import Store from "electron-store";
import React, { useState } from "react";
import { useStore } from "../../contexts/Store";
import facebook from "../../data/icons/facebook.png";
import logo from "../../data/icons/logo.png";
import card from "../../data/icons/visit.png";
import Animation from "../animation";

export default function Company() {
  const theme = useStore((state) => state.theme);
  const schema = {
    company: {
      type: "object",
      default: {
        userName: "AMIN HAMIDI",
        address: "Hay Bensouna Nouvelle Ville",
        email: "Email@gmail.Com",
        phone: "05 40 22 27 82",
        fax: "027 78 78 78",
        site: "www.minishop-dz.com",
        name: "MiniShop Bensouna",
        facebook: "MiniShop Bensouna",
      },
    },
  };
  const [refresh, setRefresh] = useState(false);
  const store = new Store({ schema });
  return (
    <div className={`grow overflow-y-auto  h-[calc(100vh_-_190px)] ${theme.back} ${theme.textXl}`}>
      <div className="p-6">
        <h2 className="text-2xl mb-2 font-bold ">Entreprise</h2>
        <Animation visible={true} from={{ x: 0, y: -400, opacity: 0 }} enter={{ x: 0, y: 0, opacity: 1 }} leave={{}}>
          <section className="flex  items-center justify-center">
            <div className="relative shrink-0 ">
              <img className="w-[600px] bg-transparent drop-shadow-md rounded-3xl" src={card} />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, userName: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.userName}
                className={`p-0 w-[300px] border-none  absolute font-semibold text-slate-800 bg-transparent  text-2xl top-[30px] capitalize left-[50px] z-10`}
                type="text"
              />
              <textarea
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, address: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.address}
                className="p-0 w-[250px] border-none absolute bg-transparent overflow-hidden text-slate-800 text-lg top-[80px] capitalize left-[90px] z-10"
                type="text"
              />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, email: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.email}
                className="p-0 w-[250px] border-none absolute bg-transparent text-slate-800 text-lg top-[150px] capitalize left-[90px] z-10"
                type="text"
              />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, phone: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.phone}
                className="p-0 w-[250px] border-none absolute bg-transparent text-slate-800 text-lg top-[200px] capitalize left-[90px] z-10"
                type="text"
              />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, fax: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.fax}
                className="p-0 w-[250px] border-none absolute bg-transparent text-slate-800 text-lg top-[225px] capitalize left-[90px] z-10"
                type="text"
              />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, site: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.site}
                className="p-0 w-[250px] border-none absolute bg-transparent text-slate-800 text-lg top-[270px]  left-[90px] z-10"
                type="text"
              />
              <input
                id="name"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, name: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.name}
                className="p-0 w-[250px] border-none absolute bg-transparent text-center text-2xl font-semibold text-white top-[120px]  left-[350px] z-10"
                type="text"
              />
              <div className="flex gap-2 top-[300px] absolute left-[380px]">
                <img className="w-[30px] h-[30px]" src={facebook} />
                <input
                  id="name"
                  onChange={(e) => {
                    const temp = store.get("company");
                    e.target.value != null && store.set("company", { ...temp, facebook: e.target.value });
                    setRefresh(!refresh);
                  }}
                  value={store?.get("company")?.facebook}
                  className="p-0 w-[170px] border-none bg-transparent text-center text-white z-10"
                  type="text"
                />
              </div>
              <div className="absolute bg-transparent top-[20px]  left-[410px] ">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center h-20 p-4 bg-transparent rounded-lg  border-gray-300 border-dashed cursor-pointer  hover:bg-gray-10">
                  <div className="flex flex-col justify-center items-center pt-5 pb-4">
                    <img htmlFor="dropzone-file" className="w-[100px] h-[100px] rounded-full bg-contain" src={store?.get("company")?.logo || logo} width="80" height="80" alt="User upload" />
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={(e) => {
                      const temp = store.get("company");
                      store.set("company", { ...temp, logo: e.target?.files[0]?.path });
                      setRefresh(!refresh);
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </section>
        </Animation>
        <section>
          <h2 className="text-xl leading-snug  font-bold mt-5">Informations Financière</h2>
          <div className="flex items-center  space-x-4 mt-5">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                N°RC
              </label>
              <input
                id="location"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, rc: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.rc}
                className="form-input w-full"
                type="text"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                N°IF
              </label>
              <input
                id="location"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, if: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.if}
                className="form-input w-full"
                type="text"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center  space-x-4 mt-5">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                CCP
              </label>
              <input
                id="location"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, ccp: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.ccp}
                className="form-input w-full"
                type="text"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                RIB
              </label>
              <input
                id="location"
                onChange={(e) => {
                  const temp = store.get("company");
                  e.target.value != null && store.set("company", { ...temp, rib: e.target.value });
                  setRefresh(!refresh);
                }}
                value={store?.get("company")?.rib}
                className="form-input w-full"
                type="text"
              />
            </div>
          </div>
        </section>
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
