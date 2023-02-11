import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import React, { useState } from "react";
import { loadDepenses, useStore } from "../../contexts/Store";
import TextBox from "../button/TextBox";
import Store from "electron-store";
const { ipcRenderer } = require("electron");

export default function DepenseForm(props) {
  const theme = useStore((state) => state.theme);
  return (
    <div className="">
      <table>
        <tbody>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Type:</td>
            <td className="w-[320px]">
              <TextBox
                type="dropdown"
                id="type"
                width="full"
                value={props?.type}
                dataSource={["Facture élec/Gaz", "Salaire Employée", "Avance de paie", "Frais Location", "Maintenance", "Sérvices", "Frais Transport", "Autre Frais"]}
                popupHeight="200px"
                title=""
              />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Date:</td>

            <td className="w-[320px]">
              <DateTimePickerComponent id="date" name="date" width="260" value={props?.date} placeholder="Date" format="dddd MMMM y - HH:mm" floatLabelType="Never"></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Déscription:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="paymentType" width="full" value={props?.paymentType} title="" />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Montant:</td>
            <td className="w-[320px]">
              <TextBox type="number" format="N2" label="DA" id="amount" width="w-[200px]" value={props?.amount} step={100} min={0} title="" />
            </td>
          </tr>
          <tr>
            <td className="p-4 w-[220px] text-sm font-medium">Remarque:</td>
            <td className="w-[320px] text-rose-500 select-none">
              <TextBox type="text" multiline id="comment" width="full" value={props?.comment} title="" />
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
