import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import React, { useState } from "react";
import { loadStudents, useStore } from "../../contexts/Store";
import TextBox from "../button/TextBox";
import Store from "electron-store";
const { ipcRenderer } = require("electron");
import levels from "../../data/levels";
import modules from "../../data/modules";

export default function MembershipForm(props) {
  const theme = useStore((state) => state.theme);
  return (
    <div className="">
      <table>
        <tbody>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Élève:</td>
            <td className="w-[320px] text-rose-500 select-none">
              <TextBox
                type="text"
                id="name"
                readOnly
                //width="w-[200px]"
                value={props?.name}
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Module:</td>
            <td className="w-[320px]">
              <TextBox
                type="dropdown"
                id="module"
                //width="w-[200px]"
                dataSource={modules}
                popupHeight="400px"
                value={props?.module}
                fields={{ value: "value", text: "text", groupBy: "type" }}
                // onChange={(e) => {
                //   e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, module: e.value } }));
                //   setWrongModule(false);
                // }}
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Niveau:</td>
            <td className="w-[320px]">
              <TextBox
                type="dropdown"
                id="level"
                name="level"
                value={props?.level}
                dataSource={levels}
                // onChange={(e) => {
                //   e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, student: { ...state.membership.student, level: e.value } } }));
                //   setWrongLevel(false);
                // }}
                // width="w-[200px]"
                popupHeight="400px"
                fields={{ value: "value", text: "text", groupBy: "type" }}
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Type:</td>
            <td className="w-[320px]">
              <TextBox
                type="dropdown"
                value={props?.type}
                id="type"
                dataSource={["Cours Soutien", "Formation", "Révision générale", "Cours Annuelle", "Cours Vacances", "Cours Développement"]}
                width="w-[200px]"
                // onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, type: e.value } }))}
                popupHeight="400px"
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Date:</td>

            <td className="w-[320px]">
              <DateTimePickerComponent id="date" name="date" width="260" value={props?.date} placeholder="Date" format="dddd MMMM y" floatLabelType="Never"></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Séances:</td>
            <td className="w-[320px]">
              <TextBox
                type="number"
                format="N0"
                id="sessions"
                value={props?.sessions}
                // width="w-[200px]"
                // onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, sessions: e.value } }))}
                min={0}
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Durée:</td>
            <td className="w-[320px]">
              <TextBox
                type="dropdown"
                value={props?.time}
                id="time"
                dataSource={["30 Min", "45 Min", "1H", "1H-30min", "1H-45min", "2H", "2H-30min", "2H-45min", "3H", "3H-30min", "3H-45min", "4H"]}
                // width="w-[200px]"
                // onChange={(e) => useStore.setState((state) => ({ membership: { ...state.membership, time: e.value } }))}
                popupHeight="400px"
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Paiment:</td>
            <td className="w-[320px]">
              <TextBox
                id="payment"
                type="number"
                format="C2"
                min={0}
                step={100}
                value={props?.payment}
                width="w-[200px]"
                // onChange={(e) => {
                //   e.value != null && useStore.setState((state) => ({ membership: { ...state.membership, payment: e.value } }));
                // }}
              />{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
