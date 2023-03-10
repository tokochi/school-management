import { DialogComponent } from "@syncfusion/ej2-react-popups";
import moment from "moment";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { loadStudents, useStore } from "../../contexts/Store";
import deletePng2 from "./../../data/icons/delete2.png";
import Store from "electron-store";
const { ipcRenderer } = require("electron");

export default function StudentCreditList({ header, id, svg, children, width, footer, content, onChange, close, fields, dataSource, ...rest }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avanceList = () => useStore((state) => state.students).reduce((acc, cur) => acc.concat(cur.avance), []);
  const toCurrency = useStore((state) => state.toCurrency);
  const store = new Store();
  const theme = useStore((state) => state.theme);
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
        header="Liste des Versements"
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
                        <div className="font-semibold text-center">??l??ve</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Ancien Credit</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Versement</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Reste ?? payer</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Status</div>
                      </th>

                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {avanceList().map((avance, indx) => (
                      <tr className="text-center" key={uuidv4()}>
                        <React.Fragment key={uuidv4()}>
                          <td key={uuidv4()} className="text-left p-2">
                            {"#" + avance?._id.slice(-6)}
                          </td>
                          <td key={uuidv4()}>{moment(avance?.date).format("DD/MM/YYYY")}</td>
                          <td key={uuidv4()}>{avance?.studentName}</td>
                          <td key={uuidv4()}>{avance?.credit && toCurrency(avance?.credit)}</td>
                          <td key={uuidv4()}>{avance?.amount && toCurrency(avance?.amount)}</td>
                          <td key={uuidv4()}>{avance?.amount && toCurrency(avance?.credit - avance.amount)}</td>
                          <td key={uuidv4()}>
                            {avance?.credit - avance.amount > 0 ? (
                              <p key={uuidv4()} className="capitalize text-center rounded-3xl px-1 py-1 my-1 bg-rose-100 text-rose-500">
                                Cr??dit
                              </p>
                            ) : (
                              <p key={uuidv4()} className="capitalize text-center rounded-3xl px-1 py-1 my-1 bg-emerald-100 text-emerald-600 ">
                                Acquitt??
                              </p>
                            )}
                          </td>
    
                          <td key={uuidv4()}>
                            <button
                              id={avance?.studentId}
                              idd={avance?._id}
                              amount={avance?.amount}
                              name={avance?.name}
                              className=" p-1.5"
                              onClick={(e) => {
                                setDropdownOpen(false);
                                const custID = e.target.parentElement.attributes[0].value;
                                const avanceID = e.target.parentElement.attributes[1].value;
                                const avanceAmount = parseInt(e.target.parentElement.attributes[2].value);
                                useStore.getState().students.forEach((student, index) => {
                                  if (student._id === custID) {
                                    ipcRenderer.send("updateStudent", {
                                      _id: custID,
                                      credit: parseInt(student.credit) + parseInt(avanceAmount),
                                      avance: student.avance.filter((avance) => avance._id !== avanceID),
                                    });
                                  }
                                });
                                ipcRenderer.on("refreshGridStudent:update", (e, res) => {
                                  store?.set("activity", [
                                    ...store?.get("activity"),
                                    {
                                      date: new Date(),
                                      page: "Avance ??l??ve",
                                      action: "supprimer",
                                      title: "Avance ??l??ve Supprimer",
                                      item: { name: e?.target?.parentElement?.attributes[3]?.value, type: "Avance", amount: parseInt(avanceAmount) },
                                      user: store?.get("user")?.userName,
                                      role: store?.get("user")?.isAdmin ? "Administrateur" : "Employ??e",
                                    },
                                  ]);
                                  loadStudents();
                                  ipcRenderer.removeAllListeners("refreshGridStudent:update");
                                });
                              }}>
                              <img src={deletePng2} width="25" />
                            </button>
                          </td>
                        </React.Fragment>
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
