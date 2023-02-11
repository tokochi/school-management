import { GridComponent, ColumnsDirective, ColumnDirective, Reorder, Page, Selection, Resize, Search, Inject, Edit, Toolbar, PdfExport, ExcelExport, Sort, Filter } from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef, useState } from "react";
import { useStore, loadStudents } from "../../contexts/Store";
import MembershipForm from "../form/MembershipForm";
import Localization from "../Localization";
import { useNavigate } from "react-router-dom";
import Store from "electron-store";
import Status from "./templates/VendingsStatus";
import StudentsGridName from "./templates/students/StudentName";
const { ipcRenderer } = require("electron");
import { useReactToPrint } from "react-to-print";
// ******** Get Membership List  ********
Localization("abonnement");
export default function MembershipTable() {
  // ******** Column Templates  ********
  const membershipFormTemplate = (props) => <MembershipForm {...props} />;
  const vendingGridStatus = (props) => <Status {...props} />;
  const studentsGridName = (props) => <StudentsGridName {...props} />;
  const classeSessionTemplate = (props) => (
    <p>
      {props.currentSession}/{props.sessions}
    </p>
  );
  // ******** Grid Table  ********
  const navigate = useNavigate();
  const [active, setActive] = useState({ all: true, paid: false, unpaid: false, deposit: false });
  const membershipData = useStore((state) => state.students)
    .reduce((acc, cur) => acc.concat(cur.membership), [])
    .filter((vending) => filterVending(vending));
  const studentsData = useStore((state) => state.students);
  const toolbarOptions = [{ text: "Renouveler", tooltipText: "Renouveler", prefixIcon: "e-icons e-repeat", id: "edit" }, "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
  const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: false, mode: "Dialog", showDeleteConfirmDialog: true, template: membershipFormTemplate };
  let grid;
  const gridRef = useRef();
  const theme = useStore((state) => state.theme);
  const activeButtoon = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm ${theme.button} text-white duration-150 ease-in-out`;
  const normalButton = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm ${theme.nav} ${theme.text} duration-150 ease-in-out`;
  const store = new Store();
  const restorCredit = store?.get("restorCredit");
  console.log("🚀 ~  ~ restorCredit", restorCredit)
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
    }
  }, [showPrintDiv]);
  function filterVending(vending) {
    if (active.all === true) {
      return vending === vending;
    }
    if (active.paid === true) {
      return vending?.amount > 0 && vending?.amount === vending?.deposit;
    }
    if (active.unpaid === true) {
      return vending?.amount > 0 && vending?.deposit === 0;
    }
    if (active.deposit === true) {
      return vending?.amount > 0 && vending?.amount > vending?.deposit;
    }
  }
  function toolbarClick(args) {
    switch (true) {
      case args.item.id.includes("print"):
        setShowPrintDiv(false);
        break;
      case args.item.id.includes("excelexport"):
        grid.excelExport({
          fileName: "List d'élèves.xlsx",
        });
        break;
      case args.item.id.includes("pdfexport"):
        grid.pdfExport();
        break;
      case args.item.id.includes("edit"):
        if (grid?.getSelectedRecords().length > 0) {
          navigate("/membership");
          useStore.setState((state) => ({
            membership: {
              ...grid.getSelectedRecords()[0],
              student: { name: grid.getSelectedRecords()[0]?.name, level: grid.getSelectedRecords()[0]?.level, id: grid.getSelectedRecords()[0]?.id, phone: grid.getSelectedRecords()[0]?.phone },
              selectedStudents: [{ ...grid.getSelectedRecords()[0], deposit: grid.getSelectedRecords()[0]?.payment,phone: grid.getSelectedRecords()[0]?.phone }],
              isEdit: true,
            },
          }));
        }
        break;
    }
  }

  function actionComplete(args) {
    switch (true) {
      case args.requestType === "beginEdit":
        args.dialog.header = "Modifier une dépense";

        break;
      case args.requestType === "save" && args.action === "edit":
        studentsData.forEach((student) => {
          if (student._id === args.data.id) {
            ipcRenderer.send("updateStudent", { _id: student._id, membership: [...student.membership.filter((membership) => membership._id !== args.data._id), args.data] });
          }
        });
        ipcRenderer.on("refreshGridStudent:update", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Abonnement",
              action: "modifier",
              title: "Abonnement Modifier",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Abonnement Modifier Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          ipcRenderer.removeAllListeners("refreshGridStudent:update");
          loadStudents();
        });

        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter une nouvelle dépense";
        break;
      case args.requestType === "delete":
        studentsData.forEach((student) => {
          if (student._id === args.data[0].id) {
            ipcRenderer.send("updateStudent", {
              _id: student._id,
              credit: restorCredit && parseInt(student.credit || 0) - (parseInt(args.data[0].payment) - parseInt(args.data[0].deposit)),
              membership: student.membership.filter((membership) => membership._id !== args.data[0]._id),
            });
          }
        });
        ipcRenderer.on("refreshGridStudent:update", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Abonnement",
              action: "supprimer",
              title: "Abonnement Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Abonnement Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadStudents();
          ipcRenderer.removeAllListeners("refreshGridStudent:update");
        });
        break;
    }
  }

  return (
    <div>
      <div className="mb-4 mx-4 flex justify-between">
        <ul className="flex flex-wrap -m-1">
          <li className="m-1">
            <button
              className={active.all ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: true, paid: false, unpaid: false, deposit: false }));
              }}>
              Tous <span className="ml-1 text-indigo-200">{useStore((state) => state.students).reduce((acc, cur) => acc.concat(cur.membership), []).length}</span>
            </button>
          </li>
          <li className="m-1">
            <button
              className={active.paid ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: false, paid: true, unpaid: false, deposit: false }));
              }}>
              Payé{" "}
              <span className="ml-1  text-emerald-600">
                {
                  useStore((state) => state.students)
                    .reduce((acc, cur) => acc.concat(cur.membership), [])
                    .filter((vending) => vending?.amount > 0 && vending?.amount === vending?.deposit).length
                }
              </span>
            </button>
          </li>
          <li className="m-1">
            <button
              className={active.deposit ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: false, paid: false, unpaid: false, deposit: true }));
              }}>
              Vérsement{" "}
              <span className="ml-1 text-amber-600">
                {
                  useStore((state) => state.students)
                    .reduce((acc, cur) => acc.concat(cur.membership), [])
                    .filter((vending) => vending?.deposit > 0 && vending?.amount > vending?.deposit).length
                }
              </span>
            </button>
          </li>
          <li className="m-1">
            <button
              className={active.unpaid ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: false, paid: false, unpaid: true, deposit: false }));
              }}>
              Non Payé{" "}
              <span className="ml-1 text-rose-500">
                {
                  useStore((state) => state.students)
                    .reduce((acc, cur) => acc.concat(cur.membership), [])
                    .filter((vending) => vending?.amount > 0 && vending?.deposit === 0).length
                }
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div className="mx-2  ">
        <GridComponent
          ref={(g) => (grid = g)}
          dataSource={membershipData}
          enableHover={false}
          allowPaging
          allowExcelExport
          allowPdfExport
          allowResizing
          locale="fr-BE"
          pageSettings={{ pageSize: 6 }}
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick}
          editSettings={editing}
          allowReordering
          BorderLineStyle="Thin"
          // enablePersistence
          actionComplete={(props) => actionComplete(props)}
          allowSorting>
          <ColumnsDirective>
            <ColumnDirective field="name" headerText="Élève" textAlign="center" headerTextAlign="center" width="80" template={studentsGridName} />
            <ColumnDirective field="date" headerText="Abonné le" textAlign="center" headerTextAlign="center" type="datetime" format="dd/MM/yyyy" width="50" />
            <ColumnDirective field="time" headerText="Durée" textAlign="center" headerTextAlign="center" width="30" />
            <ColumnDirective field="sessions" headerText="Séances" textAlign="center" headerTextAlign="center" width="20" template={classeSessionTemplate} />
            <ColumnDirective field="module" headerText="Module" textAlign="center" headerTextAlign="center" width="50" />
            <ColumnDirective field="level" headerText="Niveau" textAlign="center" headerTextAlign="center" width="50" />
            <ColumnDirective field="type" headerText="Type" textAlign="center" headerTextAlign="center" width="50" />
            <ColumnDirective field="deposit" format="C2" textAlign="center" headerText="Vérsement" headerTextAlign="center" width="60" />
            <ColumnDirective field="payment" format="C2" textAlign="center" headerText="Montant" headerTextAlign="center" width="60" />
            <ColumnDirective field="comment" headerText="Commentaire" headerTextAlign="center" width="50" visible={false} />
            <ColumnDirective field="status" headerText="Status" headerTextAlign="center" textAlign="center" width="40" template={vendingGridStatus} />
          </ColumnsDirective>
          <Inject services={[Page, Resize, Selection, Reorder, Search, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
        </GridComponent>
      </div>
    </div>
  );
}
