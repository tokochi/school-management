import { GridComponent, ColumnsDirective, ColumnDirective, Reorder, Page, Selection, Resize, Search, Inject, Edit, Toolbar, PdfExport, ExcelExport, Sort, Filter } from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef, useState } from "react";
import { useStore, loadStudents } from "./../../contexts/Store";
import StudentForm from "../form/StudentForm";
import Store from "electron-store";
import Localization from "../Localization";
import Status from "./templates/students/StudentStatus";
import { useReactToPrint } from "react-to-print";
import StudentsGridName from "./templates/students/StudentName";
import AvanceStudent from "../avance/AvanceStudent";
import StudentCreditList from "./../list/StudentCreditList";
const { ipcRenderer } = require("electron");

// ******** Get Students List  ********
Localization("élèves");
export default function StudentsTable() {
  // ******** Column Templates  ********
  const studentsFormTemplate = (props) => <StudentForm {...props} />;
  const studentsGridStatus = (props) => <Status {...props} />;
  const studentsGridName = (props) => <StudentsGridName {...props} />;
  // ******** Grid Table  ********
  const theme = useStore((state) => state.theme);
  const [active, setActive] = useState({ all: true, debt: false });
  const activeButtoon = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm ${theme.button} text-white duration-150 ease-in-out`;
  const normalButton = `inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm ${theme.nav} ${theme.text} duration-150 ease-in-out`;
  const store = new Store();
  const studentsData = useStore((state) => state.students).filter((student) => filterStudent(student));
  const totalCredit = useStore((state) => state.students).reduce((acc, cur) => acc + cur.credit, 0);
  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
  const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog", showDeleteConfirmDialog: true, template: studentsFormTemplate };
  let grid;
  const gridRef = useRef();
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
  const toCurrency = useStore((state) => state.toCurrency);
  useEffect(() => {
    if (!showPrintDiv) {
      reactToPrint();
      setShowPrintDiv(true);
    }
  }, [showPrintDiv]);
  function filterStudent(student) {
    if (active.all === true) {
      return student === student;
    }
    if (active.debt === true) {
      return student.debt > 0;
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
    }
  }

  function actionComplete(args) {
    switch (true) {
      case args.requestType === "save" && args.action === "add":
        ipcRenderer.send("addStudent", {...args.data,credit:0});
        ipcRenderer.on("refreshGridStudent:add", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "élèves",
              action: "ajouter",
              title: "Nouveau élèves Ajouter",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          ipcRenderer.removeAllListeners("refreshGridStudent:add");
          useStore.setState({ toast: { show: true, title: "élèves Ajouter Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadStudents();
        });

        break;
      case args.requestType === "beginEdit":
        args.dialog.header = "Modifier un élève";

        break;
      case args.requestType === "save" && args.action === "edit":
        ipcRenderer.send("updateStudent", args.data);
        ipcRenderer.on("refreshGridStudent:update", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "élèves",
              action: "modifier",
              title: "élèves Modifier",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "élèves Modifier Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          ipcRenderer.removeAllListeners("refreshGridStudent:update");
          loadStudents();
        });

        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter un nouvel élève";
        break;
      case args.requestType === "delete":
        ipcRenderer.send("deleteStudent", args.data[0]);
        ipcRenderer.on("refreshGridStudent:delete", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "élèves",
              action: "supprimer",
              title: "élèves Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "élèves Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadStudents();
          ipcRenderer.removeAllListeners("refreshGridStudent:delete");
        });
        break;
    }
  }

  return (
    <div id="pdf" className="m-4">
      <div className="mb-4 mx-4 flex justify-between">
        <ul className="flex flex-wrap -m-1">
          <li className="m-1">
            <button
              className={active.all ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: true, debt: false }));
              }}>
              Tous <span className="ml-1 text-indigo-200">{useStore((state) => state.students).length}</span>
            </button>
          </li>
          <li className="m-1">
            <button
              className={active.debt ? activeButtoon : normalButton}
              onClick={() => {
                setActive((state) => ({ all: false, debt: true }));
              }}>
              Crédit <span className="ml-1  text-rose-600">{useStore.getState().students.filter((student) => student?.credit > 0).length}</span>
            </button>
          </li>
        </ul>
        <div className={normalButton}>
          Total Crédits Élèves:<span className="text-rose-500 ml-2">{toCurrency(totalCredit)}</span>
        </div>
        <div className="flex gap-2">
          <AvanceStudent />
          <StudentCreditList />
        </div>
      </div>
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={studentsData}
        enableHover={false}
        allowPaging
        allowExcelExport
        allowPdfExport
        // allowResizing
        locale="fr-BE"
        pageSettings={{ pageSize: 6 }}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        editSettings={editing}
        allowResizing
        allowSorting
        allowReordering
        BorderLineStyle="Thin"
        // enablePersistence
        actionComplete={(props) => actionComplete(props)}>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Nom" textAlign="center" headerTextAlign="center" width="80" template={studentsGridName} />
          <ColumnDirective field="email" headerText="Email" textAlign="center" headerTextAlign="center" width="40" />
          <ColumnDirective field="phone" headerText="Téléphone" textAlign="center" headerTextAlign="center" width="40" />
          <ColumnDirective field="school" headerText="École" textAlign="center" headerTextAlign="center" width="40" />
          <ColumnDirective field="address" headerText="Addresse" textAlign="center" headerTextAlign="center" width="40" />
          <ColumnDirective field="credit" headerText="Crédit" textAlign="center" headerTextAlign="center" width="40" format="c2" />
          <ColumnDirective field="startAt" headerText="Inscription" textAlign="center" headerTextAlign="center" width="40" type="datetime" format="dd/MM/yyyy" />
          <ColumnDirective field="status" headerText="Status" textAlign="center" headerTextAlign="center" width="40" template={studentsGridStatus} />
        </ColumnsDirective>
        <Inject services={[Page, Resize, Selection, Reorder, Search, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
}
