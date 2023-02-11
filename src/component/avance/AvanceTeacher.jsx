import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import React, { useState } from "react";
import TextBox from "../button/TextBox";
import Store from "electron-store";
import { loadTeachers, useStore } from "../../contexts/Store";
const { ipcRenderer } = require("electron");

export default function AvanceTeacher({ header, id, svg, children, width, footer, content, onChange, close, fields, dataSource, ...rest }) {
  const teachersData = () => useStore((state) => state.teachers);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const store = new Store();
  const [requiredName, setRequiredName] = useState(false);
  const [requiredPrice, setRequiredPrice] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState(new Date());
  const [slectedTeacher, setSlectedTeacher] = useState("");
const theme = useStore((state) => state.theme);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}
        className={`btn ${theme.button} hover:opacity-80 text-white`}>
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Ajouter Versement</span>
      </button>
      <DialogComponent
        id={id}
        isModal
        allowDragging
        header="Réglement Crédits"
        visible={dropdownOpen}
        showCloseIcon={true}
        closeOnEscape
        width="500"
        open={() => setDropdownOpen(true)}
        close={() => setDropdownOpen(false)}
        footerTemplate={() => (
          <div>
            <ul className="flex items-center justify-end gap-6">
              <li>
                <button
                  className={`btn ${theme.button} hover:opacity-80 text-white`}
                  onClick={() => {
                    switch (true) {
                      case slectedTeacher === "":
                        setRequiredName(true);
                        break;
                      case amount === 0:
                        setRequiredPrice(true);
                        break;
                      default:
                        amount > 0 &&
                          ipcRenderer.send("updateTeacher", {
                            credit: parseInt(slectedTeacher.credit) - parseInt(amount),
                            _id: slectedTeacher._id,
                            avance: [...slectedTeacher.avance, { credit: slectedTeacher.credit, date, amount, paymentType, name: slectedTeacher.name, teacherId: slectedTeacher._id }],
                          });
                        ipcRenderer.on("refreshGridTeacher:update", (e, res) => {
                          ipcRenderer.removeAllListeners("refreshGridTeacher:update");
                          setAmount(0);
                          setSlectedTeacher("");
                          setPaymentType("");
                          setDropdownOpen(false);
                          store?.set("activity", [
                            ...store?.get("activity"),
                            {
                              date: new Date(),
                              page: "Avance fournisseur",
                              action: "ajouter",
                              item: {
                                name: slectedTeacher.name,
                                type: "Avance",
                                amount: parseInt(amount),
                                credit: parseInt(slectedTeacher.credit) - parseInt(amount),
                              },
                              user: store?.get("user")?.userName,
                              title: "Nouvelle Avance Fournisseur Ajouter",
                              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                            },
                          ]);
                          useStore.setState({ toast: { show: true, title: "Avance Ajouter Avec Succés", type: "success" } });
                          setTimeout(() => {
                            useStore.setState({ toast: { show: false } });
                          }, 2000);
                          loadTeachers();
                          // window.location.reload();
                        });
                        break;
                    }
                  }}>
                  Terminer
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={(e) => {
                    setAmount(0);
                    setSlectedTeacher("");
                    setPaymentType("");
                    setDropdownOpen(false);
                  }}>
                  Annuler
                </button>
              </li>
            </ul>
          </div>
        )}>
        <div className="">
          <table>
            <tbody>
              <tr>
                <td className="p-4 w-[220px] text-sm font-medium">Choisir Fournisseur:</td>
                <td className="w-[320px]">
                  <TextBox
                    type="dropdown"
                    id="teacher"
                    width="full"
                    onChange={(e) => {
                      e.itemData != null && setSlectedTeacher(e.itemData);
                      setRequiredName(false);
                    }}
                    dataSource={teachersData()}
                    fields={{ value: "_id", text: "name" }}
                    popupHeight="200px"
                    title="Choisir le Fournisseur"
                  />
                  {requiredName && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
                </td>
              </tr>
              <tr>
                <td className="p-4 w-[220px] text-sm font-medium">Date Réglement:</td>

                <td className="w-[320px]">
                  <DateTimePickerComponent
                    id="date"
                    name="date"
                    width="260"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    placeholder="Date de paiment"
                    format="dddd MMMM y - HH:mm"
                    floatLabelType="Never"></DateTimePickerComponent>
                </td>
              </tr>
              <tr>
                <td className="p-4 w-[220px] text-sm font-medium">Mode de Paiement:</td>
                <td className="w-[320px]">
                  <TextBox
                    type="dropdown"
                    id="paymentType"
                    width="full"
                    value={paymentType}
                    onChange={(e) => e.value != null && setPaymentType(e.value)}
                    dataSource={["Espéce", "Chéque", "Virement"]}
                    popupHeight="200px"
                    title="Mode de Paiement"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-4 w-[220px] text-sm font-medium">Crédits initial:</td>
                <td className="w-[320px] text-rose-500 select-none">
                  <TextBox
                    type="number"
                    // readonly
                    // showSpinButton={false}
                    enabled={false}
                    format="N2"
                    label="DA"
                    id="credit"
                    width="w-[200px]"
                    value={slectedTeacher.credit}
                    step={100}
                    min={0}
                    title="Montant Avance"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-4 w-[220px] text-sm font-medium">Montant:</td>
                <td className="w-[320px]">
                  <TextBox
                    type="number"
                    format="N2"
                    label="DA"
                    id="amount"
                    width="w-[200px]"
                    max={slectedTeacher.credit}
                    onChange={(e) => {
                      e.value != null && setAmount(e.value);
                      setRequiredPrice(false);
                    }}
                    step={100}
                    min={0}
                    title="Montant Avance"
                  />
                  {requiredPrice && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
                </td>
              </tr>
              <tr>
                <td className={`p-4 w-[220px] text-sm font-medium`}>Crédits restant:</td>
                <td className={`w-[320px] select-none ${slectedTeacher.credit === amount ? "text-emerald-500" : "text-amber-500"}`}>
                  <TextBox type="number" enabled={false} format="N2" label="DA" id="creditLeft" width="w-[200px]" step={100} min={0} value={slectedTeacher.credit - amount} title="Crédits restant" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogComponent>
    </>
  );
}
