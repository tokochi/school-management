import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { AutoCompleteComponent } from "@syncfusion/ej2-react-dropdowns";
import Store from "electron-store";
import "moment/locale/fr";
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import TextBox from "../component/button/TextBox";
import PrintInvoice from "../component/invoice/PrintInvoiceMembership";
import { loadStudents, loadClasses, useStore } from "../contexts/Store";
import ProductFormPopUp from "../component/form/StudentForm";
import add from "./../data/icons/add.png";
import deletePng from "./../data/icons/delete.png";
import deletePng2 from "./../data/icons/delete2.png";
import done from "./../data/icons/done.png";
import minus from "./../data/icons/minus.png";
import print from "./../data/icons/print.png";
import Animation from "../component/animation";
import PopupDialog from "../component/dialog/PopupDialog";
import StudentForm from "../component/form/StudentForm";
import levels from "../data/levels";
import modules from "../data/modules";
const { ipcRenderer } = require("electron");
moment.locale("fr");

export default function Membership() {
  const schema = {
    company: {
      type: "object",
    },
  };
  const store = new Store({ schema });
  const membership = useStore((state) => state.membership);

  const classes = useStore((state) => state.classes);
  const students = useStore((state) => state.students);
  const setTotalMembership = useStore((state) => state.setTotalMembership);
  const [title, setTitle] = useState(0);
  const [showPrintDiv, setShowPrintDiv] = useState(true);
  const gridRef = useRef();
  const [date, setDate] = useState(new Date());
  const theme = useStore((state) => state.theme);
  const [close, setClose] = useState(false);
  const [wrongStudent, setWrongStudent] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [wrongModule, setWrongModule] = useState(false);
  const [wrongLevel, setWrongLevel] = useState(false);
  let validateBtn = useRef();
  const normalButton = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm ${theme.nav} ${theme.text} duration-150 ease-in-out`;
  const reactToPrint = useReactToPrint({
    content: () => gridRef.current,
    print: (target) =>
      new Promise(() => {
        let data = target.contentWindow.document.documentElement.outerHTML;
        let blob = new Blob([data], { type: "text/html; charset=utf-8" });
        let url = URL.createObjectURL(blob);
        ipcRenderer.send("previewComponent2", url);
      }),
  });
  useEffect(() => {
    if (!showPrintDiv) {
      reactToPrint();
      setShowPrintDiv(true);
      validateBtn.current.click();
    }
  }, [showPrintDiv]);
  useEffect(() => {
    setClose(false);
  }, [close]);
  function status(props) {
    if (props?.deposit === 0) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-rose-100 text-rose-500">Non Payé</p>;
    if (props?.deposit === props?.payment) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-emerald-100 text-emerald-600 ">Payé</p>;
    if (props?.deposit < props?.payment) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-amber-100 text-amber-600 ">Vérsement</p>;
  }
  const toCurrency = useStore((state) => state.toCurrency);

  return (
    <div className={`${theme.nav} ${theme.text} m-2 shadow-lg rounded-sm h-[700px] overflow-x-hidden relative`}>
      <div className="flex h-full justify-center">
        <div id="left" className={`${theme.back}   flex-1 min-w-[480px]`}>
          <div className="flex  items-center justify-center my-2">
            <hr className="w-[150px]" />
            <span className={`mx-1 ${theme.textXl}`}>Élève</span>
            <hr className="w-[150px]" />
          </div>
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Date:</span>
            <div className={` ${theme.name === "classic" && "border-slate-200 border"} w-[200px]   rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
              <DatePickerComponent
                id="expired"
                name="expired"
                width="198"
                value={date}
                onChange={(e) => setDate(e.value)}
                placeholder="Date"
                format="dddd MMMM y"
                floatLabelType="Never"></DatePickerComponent>
            </div>
          </div>
          <div id="supplier" className="flex items-center  mb-2">
            <span className="px-4  text-sm font-medium min-w-[120px]">Élèves:</span>
            <TextBox
              type="dropdown"
              id="brand"
              width="w-[200px]"
              value={membership?.student?.name}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, student: e.itemData } }));
                setWrongStudent(false);
              }}
              fields={{ value: "name", text: "name" }}
              dataSource={students}
            />
            <div className="ml-2">
              <PopupDialog
                id="addStudent"
                close={close}
                header="Ajouter un Élève"
                width="850px"
                bg="bg-white"
                svg={
                  <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                }
                footer={() => (
                  <div>
                    <ul className="flex items-center justify-end gap-6">
                      <li>
                        <button className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => {}}>
                          Ajouter
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                          onClick={(e) => {
                            setClose(true);
                          }}>
                          Annuler
                        </button>
                      </li>
                    </ul>
                  </div>
                )}>
                <StudentForm />
              </PopupDialog>
            </div>
          </div>
          {wrongStudent && <span className="text-xs text-red-400 ml-[100px]">Ce champ est obligatoire</span>}
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Parent:</span>
            <TextBox
              type="text"
              id="brand"
              width="w-[200px]"
              value={membership?.parent}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, parent: e.value } }));
              }}
            />
          </div>
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Mobile N°:</span>
            <TextBox
              type="text"
              id="brand"
              width="w-[200px]"
              value={membership?.student?.phone || ""}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, student: { ...state.membership.student, phone: e.value } } }));
              }}
            />
          </div>
          <div className="flex  items-center justify-center my-2">
            <hr className="w-[150px]" />
            <span className={`mx-1 ${theme.textXl}`}>Classe</span>
            <hr className="w-[150px]" />
          </div>
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Module:</span>
            <TextBox
              type="dropdown"
              id="module"
              width="w-[200px]"
              dataSource={modules}
              popupHeight="400px"
              value={membership?.module}
              fields={{ value: "value", text: "text", groupBy: "type" }}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, module: e.value } }));
                setWrongModule(false);
              }}
            />
          </div>
          {wrongModule && <span className="text-xs text-red-400 ml-[100px]">Ce champ est obligatoire</span>}
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Niveau:</span>
            <TextBox
              type="dropdown"
              id="level"
              name="level"
              value={membership?.student?.level}
              dataSource={levels}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, student: { ...state.membership.student, level: e.value } } }));
                setWrongLevel(false);
              }}
              width="w-[200px]"
              popupHeight="400px"
              fields={{ value: "value", text: "text", groupBy: "type" }}
            />
          </div>
          {wrongLevel && <span className="text-xs text-red-400 ml-[100px]">Ce champ est obligatoire</span>}
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Type:</span>
            <TextBox
              type="dropdown"
              value={membership?.type}
              dataSource={["Cours Soutien", "Formation", "Révision générale", "Cours Annuelle", "Cours Vacances", "Cours Développement"]}
              width="w-[200px]"
              onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, type: e.value } }))}
              popupHeight="400px"
            />
          </div>

          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Séances:</span>
            <TextBox
              type="number"
              format="N0"
              value={membership?.sessions}
              width="w-[200px]"
              onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, sessions: e.value } }))}
              min={0}
            />
          </div>
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Durée:</span>
            <TextBox
              type="dropdown"
              value={membership?.time}
              dataSource={["30 Min", "45 Min", "1H", "1H-30min", "1H-45min", "2H", "2H-30min", "2H-45min", "3H", "3H-30min", "3H-45min", "4H"]}
              width="w-[200px]"
              onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, time: e.value } }))}
              popupHeight="400px"
            />
          </div>
          <div className="flex  items-center justify-center my-2">
            <hr className="w-[150px]" />
            <span className={`mx-1 ${theme.textXl}`}>Montant</span>
            <hr className="w-[150px]" />
          </div>
          <div id="date" className="flex select-none items-center my-2">
            <span className="px-4  text-sm font-medium min-w-[120px] ">Paiment:</span>
            <TextBox
              type="number"
              format="C2"
              min={0}
              step={100}
              id="brand"
              width="w-[200px]"
              value={membership?.payment}
              onChange={(e) => {
                e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, payment: e.value } }));
              }}
            />
          </div>
        </div>
        <div id="right" className="w-full flex flex-col bg-[#1e293b] border-l border-slate-600 select-none">
          <div id="grid" className={`${theme.back} shrink-0 border border-slate-600 `}>
            <div className=" overflow-y-auto h-[530px] shadow-lg rounded-sm">
              <table className="w-full relative   divide-slate-200">
                <thead className={`text-xs sticky top-0 z-10 uppercase  text-center ${theme.text} ${theme.main} border-b border-slate-600`}>
                  <tr className="sticky top-0 z-10 ">
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[20px]">
                      <div className="font-semibold text-center">ID</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Élève</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Module</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Niveau</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Type</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Versement</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center">Total</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap min-w-[100px]">
                      <div className="font-semibold text-center">Status</div>
                    </th>
                    <th className="px-2 sticky top-0 z-10 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                      <div className="font-semibold text-center"></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {membership?.selectedStudents?.map((student, indx) => (
                    <tr className={`text-center `} key={indx}>
                      <td className="text-center p-2">#{indx + 1}</td>
                      <td className="text-center p-2">{student.name}</td>
                      <td className="text-center p-2">{student.module}</td>
                      <td className="text-center p-2">{student.level}</td>
                      <td className="text-center p-2">{student.type}</td>
                      <td className="text-center p-2">
                        {" "}
                        <input
                          onChange={(e) => {
                            const UpdatedStudent = membership.selectedStudents.map((prod) => (e.target.id === prod.id ? { ...student, deposit: parseInt(e.target.value) } : prod));
                            useStore.setState((state) => ({ membership: { ...state.membership, selectedStudents: UpdatedStudent } }));
                            setTotalMembership();
                          }}
                          id={student.id}
                          name={student.id}
                          type="number"
                          min="0"
                          max={student?.payment}
                          step="100"
                          value={parseInt(student.deposit).toFixed(2) || parseInt(student?.payment).toFixed(2)}
                          className="w-[100px]  text-center border-none"
                        />
                      </td>
                      <td className="text-center p-2">{parseInt(student.payment).toFixed(2)}</td>
                      <td className="text-center p-2">{status(student)}</td>
                      <td>
                        <button
                          className=" p-1.5"
                          onClick={(e) => {
                            const UpdatedStudents = useStore.getState().membership?.selectedStudents.filter((stu) => student.index !== stu.index);
                            useStore.setState((state) => ({ membership: { ...state.membership, selectedStudents: UpdatedStudents } }));
                            setTotalMembership();
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
          <div className={`flex items-center ${theme.back} justify-between gap-4 px-2 py-1`}>
            <div id="option" className="flex items-center ">
              <span className="px-4  text-sm font-medium ">Remise:</span>
              <TextBox
                type="number"
                format="C2"
                min={0}
                max={membership.total}
                step={100}
                id="brand"
                width="w-[140px]"
                value={membership.rebate}
                onChange={(e) => {
                  e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, rebate: e.value } }));
                  setTotalMembership();
                }}
              />
            </div>
            <div id="option" className="flex items-center justify-center ">
              <span className="px-4  text-sm font-medium">Vérsement Total:</span>
              <TextBox
                type="text"
                //format="C2"
                readOnly
                id="brand"
                width="w-[140px]"
                value={toCurrency(membership.deposit)}
                //onChange={(e) => e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, deposit: e.value } }))}
              />
            </div>
            <hr className="w-5" />
            <div id="option" className="flex items-center gap-2 whitespace-nowrap border text-base p-1 border-slate-600">
              <span className={`font-medium ${theme.textXl}`}>Total à Payer TTC:</span>
              <span className={`font-medium ml-2  ${theme.textXl}`}>{toCurrency(membership.amount)}</span>
            </div>
          </div>
          <Animation visible={true} from={{ x: 400, y: 0, opacity: 0 }} enter={{ x: 0, y: 0, opacity: 1 }} leave={{}}>
            <div id="validation" className="flex gap-2 items-center p-2 ">
              <div className="bg-emerald-600 hover:bg-emerald-400 p-4 shrink-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    switch (true) {
                      case membership?.student?.name == null:
                        setWrongStudent(true);
                        break;
                      case membership?.module === "":
                        setWrongModule(true);
                        break;
                      case membership?.student?.level === "":
                        setWrongLevel(true);
                        break;
                      case membership?.selectedStudents.some((selected) => selected?.name + selected?.module === membership?.student?.name + membership?.module) === false:
                        useStore.setState((state) => ({
                          membership: {
                            ...state.membership,
                            selectedStudents: [
                              ...state.membership.selectedStudents,
                              {
                                name: membership.student?.name,
                                id: membership.student?._id,
                                gender: membership.student?.gender,
                                module: membership?.module,
                                level: membership?.student?.level,
                                type: membership?.type,
                                sessions: membership?.sessions,
                                time: membership?.time,
                                phone: membership?.phone,
                                deposit: membership?.payment,
                                amount: membership?.payment,
                                rebate: membership?.rebate,
                                payment: membership?.payment,
                                parent: membership?.parent,
                                date,
                                index: state.membership?.selectedStudents?.length + 1,
                              },
                            ],
                          },
                        }));         
                        setTotalMembership();
                        useStore.setState((state) => ({
                          membership: {
                            ...state.membership,
                            student: { name: null, level: null },
                            // parent: "",
                            module: null,
                            type: null,
                            level: null,
                            payment: 2000,
                          },
                        }));
                        break;
                    }
                  }}
                  className="text-xl  text-white gap-2 rounded-sm items-center flex">
                  <span className="">Ajouter</span>
                  <img src={add} className="w-10" />
                </button>
              </div>
              <div className="bg-green-500 shrink-0 hover:bg-green-700 p-4">
                <button
                  ref={validateBtn}
                  onClick={() =>
                    students.forEach((student) => {
                      membership.selectedStudents.forEach((selecStudent) => {
                        if (student._id === selecStudent.id) {
                          if (student.membership.filter((membership) => membership.module === selecStudent.module).length === 0) {
                            ipcRenderer.send("updateStudent", {
                              _id: student._id,
                              credit: parseInt(student.credit || 0) + (parseInt(membership.payment) - parseInt(membership.deposit)),
                              membership: [...student.membership, { ...selecStudent, absenceSession: 0, currentSession: 0, phone: membership.phone }],
                            });
                          }
                          if (membership.isEdit === true) {
                            ipcRenderer.send("updateStudent", {
                              _id: student._id,
                              credit: parseInt(student.credit || 0) + (parseInt(membership.payment) - parseInt(membership.deposit)),
                              membership: student.membership.map((membersh) =>
                                membersh._id === selecStudent._id
                                  ? {
                                      ...membersh,
                                      amount: parseInt(membersh.amount) + parseInt(membership.payment),
                                      deposit: parseInt(membership.deposit),
                                      currentSession: parseInt(membersh.currentSession) - parseInt(membership.sessions),
                                    }
                                  : membersh
                              ),
                            });
                          }
                        }
                      });
                      ipcRenderer.on("refreshGridStudent:update", (e, res) => {
                        ipcRenderer.removeAllListeners("refreshGridStudent:update");
                        store.set("activity", [
                          ...store?.get("activity"),
                          {
                            date: new Date(),
                            page: "facture",
                            action: "ajouter",
                            title: "Abonnement Ajouter",
                            item: membership,
                            user: store?.get("user")?.userName,
                            role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                          },
                        ]);
                        useStore.setState({ toast: { show: true, title: "Abonnement Ajouter a la liste", type: "success" } });
                        setTimeout(() => {
                          useStore.setState({ toast: { show: false } });
                        }, 2000);
                        loadStudents();
                        useStore.setState((state) => ({
                          membership: {
                            student: { name: null, level: null },
                            parent: "",
                            module: null,
                            type: null,
                            level: null,
                            amount: 0,
                            total: 0,
                            rebate: 0,
                            deposit: 0,
                            payment: 2000,
                            selectedStudents: [],
                          },
                        }));
                      });
                    })
                  }
                  className="text-xl  text-white gap-2 rounded-sm items-center flex">
                  <div className="flex flex-col">
                    <span>Valider</span>
                  </div>
                  <img src={done} className="w-10" />
                </button>
              </div>
              <div className="bg-lime-500 shrink-0 hover:bg-lime-700 p-4">
                <button className="text-xl  text-white gap-2 rounded-sm items-center flex" onClick={() => setShowPrintDiv(false)}>
                  <div className="flex flex-col">
                    <span>Imprimer</span>
                  </div>
                  <img src={print} className="w-10" />
                </button>
              </div>
              <div className="bg-rose-500 shrink-0 hover:bg-rose-700 p-4">
                <button
                  onClick={() => {
                    useStore.setState((state) => ({ membership: { ...state.membership, selectedStudents: [] } }));
                    setTotalMembership();
                  }}
                  className="text-xl  text-white gap-2 rounded-sm items-center flex">
                  <div className="flex flex-col">
                    <span>Suprimer</span>
                  </div>
                  <img src={deletePng} className="w-10" />
                </button>
              </div>
            </div>
          </Animation>
        </div>
      </div>
      <div ref={gridRef} className={`${showPrintDiv && "hidden"} `}>
        {/* <PrintInvoice /> */}
      </div>
    </div>
  );
}
