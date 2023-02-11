import { DialogComponent } from "@syncfusion/ej2-react-popups";
import Store from "electron-store";
import moment from "moment/min/moment-with-locales";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../contexts/Store";
import view from "./../../data/icons/view.png";


export default function Activity() {
  const theme = useStore((state) => state.theme);
  const schema = { activity: { type: "array", default: [] } };
  const store = new Store({ schema });
  const [item, setitem] = useState();
  const [activity, setActivity] = useState();
  const toCurrency = useStore((state) => state.toCurrency);
  const normalButton = `inline-flex items-center justify-between w-full  gap-5 text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm ${theme.nav} ${theme.text} duration-150 ease-in-out`;
 const [dropdownOpen, setDropdownOpen] = useState(false);
  //store?.set("activity",[]);
  return (
    <div className={`grow overflow-y-auto shadow-lg h-[calc(100vh_-_190px)] w-full rounded-sm  relative ${theme.back} ${theme.textXl}`}>
      <table className="table-auto w-full divide-slate-200">
        {/* Table header */}
        <thead className={`text-xs sticky top-0 z-50 uppercase  text-center ${theme.nav} ${theme.textXl} `}>
          <tr>
            <th className="px-2  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">ID</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Date</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Page</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Action</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Utilisateur</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Role</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 Z-10 whitespace-nowrap">
              <div className="font-semibold text-center">Article</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {store
            ?.get("activity")
            .reverse()
            .map((db, index) => (
              <tr key={uuidv4()} className={`${index & (1 === 1) && theme.main}`}>
                <td key={uuidv4()} className="text-center w-1/8">
                  #{index + 1}
                </td>
                <td key={uuidv4()} className="text-left capitalize w-1/8">
                  📆 {moment(db?.date).format("LLL")}
                </td>
                <td key={uuidv4()} className="text-center w-1/8 capitalize">
                  {db?.page}
                </td>
                <td key={uuidv4()} className="text-center w-1/8 capitalize">
                  {db?.action === "supprimer" && <p className="capitalize text-center rounded-3xl px-1  bg-rose-100 text-rose-500">{db?.action}</p>}
                  {db?.action === "ajouter" && <p className="capitalize text-center rounded-3xl px-1 bg-emerald-100 text-emerald-600">{db?.action}</p>}
                  {db?.action === "modifier" && <p className="capitalize text-center rounded-3xl px-1 bg-amber-100 text-sky-600">{db?.action}</p>}
                </td>
                <td key={uuidv4()} className="text-center w-1/8 capitalize">
                  {db?.user}
                </td>
                <td key={uuidv4()} className="text-center w-1/8 capitalize">
                  {db?.role}
                </td>
                <td key={uuidv4()} className="text-center w-1/8 capitalize">
                  <div className="flex items-center relative justify-center">
                    <img
                      src={view}
                      onClick={() => {
                        setitem(db?.item);
                        setActivity(db);
                        setDropdownOpen(true);
                      }}
                      className="w-6 h-6 "
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DialogComponent
        header="Activité"
        position={{ X: "center", Y: "150" }}
        allowDragging
        visible={dropdownOpen}
        showCloseIcon={true}
        closeOnEscape
        width="400"
        open={() => setDropdownOpen(true)}
        close={() => setDropdownOpen(false)}>
        <table className="table-auto w-full border-separate border-spacing-2">
          <tbody>
            {item?.index != null && (
              <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] px-2">
                <td>
                  <div className={normalButton}>
                    {activity?.page} N°: <span className="text-green-600 ">{item?.index}</span>
                  </div>
                </td>
              </tr>
            )}
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] px-2">
              <td>
                <div className={normalButton}>
                  Titre: <span className="text-green-600 ml-4">{activity?.title}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] px-2">
              <td>
                <div className={normalButton}>
                  Nom: <span className="text-green-600 ml-4">{item?.name}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] px-2">
              <td>
                <div className={normalButton}>
                  Déscription: <span className="text-green-600 ml-4">{item?.description}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] px-2">
              <td>
                <div className={normalButton}>
                  Date: <span className="text-green-600 ml-4">{moment(item?.time).format("LLL")}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  Quantité: <span className="text-green-600 ml-4">{item?.quantity}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  Prix Vente: <span className="text-green-600 ml-4">{toCurrency(item?.sellPrice)}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  Total TTC: <span className="text-green-600 ml-4">{toCurrency(item?.amount)}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  Nombre Produits: <span className="text-green-600 ml-4">{item?.grid?.length}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  vérsement: <span className="text-green-600 ml-4">{toCurrency(item?.deposit)}</span>
                </div>
              </td>
            </tr>
            <tr className="text-slate-600 capitalize font-medium  text-lg min-w-[100px] my-6">
              <td>
                <div className={normalButton}>
                  Crédit: <span className="text-green-600 ml-4">{toCurrency(item?.crédit)}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </DialogComponent>
    </div>
  );
}
