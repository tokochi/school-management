import { DialogComponent } from "@syncfusion/ej2-react-popups";
import Store from "electron-store";
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../contexts/Store";
import backup from "../../data/icons/backup.png";
import Animation from "../animation";
const { ipcRenderer } = require("electron");

export default function BackUp() {
  const theme = useStore((state) => state.theme);
  const schema = { backup: { type: "array", default: [] } };
  const store = new Store({ schema });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState(false);
  const [students, setStudents] = useState(false);
  const [teachers, setTeachers] = useState(false);
  const [classes, setClasses] = useState(false);
  const [attendances, setAttendances] = useState(false);
  const [depenses, setDepenses] = useState(false);
  const [events, setEvents] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  useEffect(() => {
    if (isSpin) {
      setTimeout(() => {
        setIsSpin(false);
        setDropdownOpen(false);
        window.location.reload();
      }, 5000);
    }
  }, [isSpin]);
  //store?.set("backup", []);
  return (
    <div className={`grow overflow-y-auto shadow-lg h-[calc(100vh_-_190px)] w-full rounded-sm  relative ${theme.back} ${theme.textXl}`}>
      <div className="w-full">
        <table className="table-auto  w-full divide-slate-200">
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
                <div className="font-semibold text-center">Produits</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-center">Clients</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-center">Fournisseurs</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-center">Ventes</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-center">Achats</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-center">Restaurer</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {store
              ?.get("backup")
              .reverse()
              .map((db, index) => (
                <tr key={uuidv4()} className={`${index & (1 === 1) && theme.main}`}>
                  <td key={uuidv4()} className="text-center w-1/8">
                    #{index + 1}
                  </td>
                  <td key={uuidv4()} className="text-left capitalize w-1/8">
                    📆 {moment(db?.date).format("LLL")}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    {db?.students?.length}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    {db?.teachers?.length}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    {db?.classes?.length}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    {db?.attendances?.length}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    {db?.depenses?.length}
                  </td>
                  <td key={uuidv4()} className="text-center w-1/8">
                    <button
                      className=" p-1.5"
                      onClick={(e) => {
                        setDate(db?.date);
                        setStudents(db?.students);
                        setTeachers(db?.teachers);
                        setClasses(db?.classes);
                        setAttendances(db?.attendances);
                        setDepenses(db?.depenses);
                        setEvents(db?.events);
                        setDropdownOpen(true);
                      }}>
                      <img src={backup} width="25" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <DialogComponent
        header="💾 Réstauration des données"
        visible={dropdownOpen}
        closeOnEscape
        width="450"
        open={() => setDropdownOpen(true)}
        close={() => setDropdownOpen(false)}
        footerTemplate={() => (
          <div>
            <ul className="flex items-center justify-end gap-6">
              <li>
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={(e) => {
                    setIsSpin(true);
                    ipcRenderer.send("backupData", { students, teachers, classes, attendances, depenses, events });
                  }}>
                  Accepter
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={(e) => {
                    setDropdownOpen(false);
                  }}>
                  Annuler
                </button>
              </li>
            </ul>
          </div>
        )}>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <span className="text-base">
            Voulez vous Réstaurer la base de données à la date:<p className="font-medium text-center">📆{moment(date).format("LLLL")}</p>
          </span>
          <Animation visible={isSpin} from={{ x: 0, y: 50, opacity: 0 }} enter={{ x: 0, y: 0, opacity: 1 }} leave={{}}>
            <svg class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#eee"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </Animation>
        </div>
      </DialogComponent>
    </div>
  );
}
