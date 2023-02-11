import { DialogComponent } from "@syncfusion/ej2-react-popups";
import moment from "moment";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { loadDepenses, useStore } from "../../contexts/Store";
import deletePng2 from "./../../data/icons/delete2.png";

const { ipcRenderer } = require("electron");

export default function DepenseList({ header, id, svg, children, width, footer, content, onChange, close, fields, dataSource, ...rest }) {
  const depenseData = () => useStore((state) => state.depenses);
  const theme = useStore((state) => state.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toCurrency = useStore((state) => state.toCurrency);
  return (
    <>
      <button
        className=" btn p-1 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}>
        <svg className="w-5 h-5 fill-current text-indigo-500 shrink-0" viewBox="0 0 24 24">
          <path d="M2 5L2 7L22 7L22 5L2 5 z M 2 11L2 13L22 13L22 11L2 11 z M 2 17L2 19L22 19L22 17L2 17 z" />
        </svg>
      </button>
      <DialogComponent
        id={id}
        allowDragging
        isModal
        header="Liste des Dépense"
        visible={dropdownOpen}
        showCloseIcon={true}
        closeOnEscape
        width="900px"
        open={() => setDropdownOpen(true)}
        close={() => setDropdownOpen(false)}
        content={() => (
          <div className={`${theme.nav} shadow-lg rounded-sm border border-slate-600 relative`}>
            <div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full  divide-slate-200">
                  {/* Table header */}
                  <thead className={`text-xs uppercase text-center ${theme.text} ${theme.main}  border-t border-slate-600`}>
                    <tr>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">ID</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Date</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Déscription</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Type</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Montant</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Remarque</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {depenseData().map((depense, index) => (
                      <tr className="text-center" key={uuidv4()}>
                        <td key={uuidv4()} className="text-left p-2">
                          {"#" + depense?._id.slice(-6)}
                        </td>
                        <td key={uuidv4()}>{moment(depense?.date).format("DD/MM/YYYY")}</td>
                        <td key={uuidv4()}>{depense?.description}</td>
                        <td key={uuidv4()}>{depense?.type}</td>
                        <td key={uuidv4()}>{toCurrency(depense?.amount)}</td>
                        <td key={uuidv4()}>{depense?.comment}</td>
                        <td key={uuidv4()}>
                          <button
                            id={depense._id}
                            className=" p-1.5"
                            onClick={(e) => {
                              ipcRenderer.send("deleteDepense", { _id: e.target.parentElement.attributes[0].value });
                              ipcRenderer.on("refreshGridDepense:delete", (e, res) => {
                                loadDepenses();
                                ipcRenderer.removeAllListeners("refreshGridDepense:delete");
                                store?.set("activity", [
                                  ...store?.get("activity"),
                                  {
                                    date: new Date(),
                                    page: "Dépense",
                                    action: "supprimer",
                                    title: "Dépense Supprimer",
                                    item: { name: "Dépense", amount: depense?.amount, description: depense?.description, type: depense?.type },
                                    user: store?.get("user")?.userName,
                                    role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                                  },
                                ]);
                                setDropdownOpen(false);
                              });
                            }}>
                            <img src={deletePng2} width="25" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}></DialogComponent>
    </>
  );
}
