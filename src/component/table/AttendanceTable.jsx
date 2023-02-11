import { ColumnDirective, ColumnsDirective, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Reorder, Resize, Search, Selection, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import Localization from "../Localization";
import React, { useEffect, useRef, useState } from "react";
import AttendanceForm from "../form/AttendanceForm";
import Store from "electron-store";
import { useReactToPrint } from "react-to-print";
import { useStore, loadAttendances, loadClasses } from "../../contexts/Store";
import AttendanceGridStudents from "./templates/attendances/AttendanceGridStudents";
import AttendanceGridName from "./templates/attendances/AttendanceGridName";
const { ipcRenderer } = require("electron");

// ******** Get Classes List  ********
Localization("présence");
export default function AttendanceTable() {
  // ******** Column Templates  ********
  const attendanceGridStudents = (props) => <AttendanceGridStudents {...props} />;
  const attendanceGridName = (props) => <AttendanceGridName {...props} />;
  const attendanceFormTemplate = (props) => <AttendanceForm {...props} />;
  const attendancePresentTemplate = (props) => <p className="text-green-600">{props.presents}</p>;
  const attendanceAbsentTemplate = (props) => <p className="text-orange-400">{props.absents}</p>;
  const attendanceSessionTemplate = (props) => (
    <p>
      {props.currentSession}/{props.sessions}
    </p>
  );

  // ******** Grid Table  ********

  const attendancesData = useStore((state) => state.attendances);
  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
    const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog", showDeleteConfirmDialog: true, template: attendanceFormTemplate };
  let grid;
  const store = new Store();
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
  useEffect(() => {
    if (!showPrintDiv) {
      reactToPrint();
      setShowPrintDiv(true);
    }
  }, [showPrintDiv]);

  function toolbarClick(args) {
    switch (true) {
      case args.item.id.includes("print"):
        setShowPrintDiv(false);
        break;
      case args.item.id.includes("excelexport"):
        grid.excelExport({
          fileName: "List des présences.xlsx",
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
        ipcRenderer.send("addAttendance", useStore.getState().selectedAttendances);
        ipcRenderer.on("refreshGridAttendance:add", (e, res) => {
            store?.set("activity", [
              ...store?.get("activity"),
              {
                date: new Date(),
                page: "présence",
                action: "ajouter",
                title: "Nouveau présence Ajouter",
                item: args?.data,
                user: store?.get("user")?.userName,
                role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
              },
            ]);
            ipcRenderer.removeAllListeners("refreshGridAttendance:add");
            useStore.setState({ toast: { show: true, title: "présence Ajouter Avec Succés", type: "success" } });
            setTimeout(() => {
              useStore.setState({ toast: { show: false } });
            }, 2000);
          loadAttendances();
          loadClasses();
        });
        break;
      case args.requestType === "beginEdit":
        useStore.setState({ selectedAttendances: [] });
        args.dialog.header = "Modifier une présence";
        break;
      case args.requestType === "save" && args.action === "edit":
        ipcRenderer.send("updateAttendance", useStore.getState().selectedAttendances);
        ipcRenderer.on("refreshGridAttendance:update", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Présence",
              action: "modifier",
              title: "Présence Modifier",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Présence Modifier Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          ipcRenderer.removeAllListeners("refreshGridAttendance:update");
          loadAttendances();
          loadClasses();
        });
        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter une nouvelle présence";
        break;
      case args.requestType === "delete":
        ipcRenderer.send("deleteAttendance", args.data[0]);
        ipcRenderer.on("refreshGridAttendance:delete", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Présence",
              action: "supprimer",
              title: "Présence Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Présence Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadAttendances();
          ipcRenderer.removeAllListeners("refreshGridAttendance:delete");
        });
        break;
    }
  }
  function actionBegin(args) {
    if (args.requestType === "delete") {
    }
    if (args.requestType === "add") {
      useStore.setState({ selectedAttendances: {} });
    }
    if (args.requestType === "beginEdit") {
      useStore.setState({ selectedAttendances: {} });
    }
  }
  return (
    <div className="m-4 ">
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={attendancesData}
        enableHover={false}
        allowPaging
        allowExcelExport
        allowPdfExport
        allowResizing
        locale="fr-BE"
        pageSettings={{ pageSize: 6 }}
        toolbar={toolbarOptions}
        actionBegin={actionBegin}
        toolbarClick={toolbarClick}
        editSettings={editing}
        allowReordering
        // enablePersistence
        actionComplete={(props) => actionComplete(props)}
        allowSorting>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Nom" width="80" headerTextAlign="center" template={attendanceGridName} />
          <ColumnDirective field="time" headerText="Date" headerTextAlign="center" textAlign="center" width="60" type="datetime" format="dd MMMM y - HH:mm" />
          <ColumnDirective field="students" headerText="Éléves" textAlign="center" headerTextAlign="center" width="50" template={attendanceGridStudents} />
          <ColumnDirective field="currentSession" textAlign="center" headerText="Séance N°" headerTextAlign="center" width="30" />
          <ColumnDirective field="presents" headerText="Présent" type="number" textAlign="center" headerTextAlign="center" width="50" template={attendancePresentTemplate} />
          <ColumnDirective field="absents" headerText="Absent" type="number" textAlign="center" headerTextAlign="center" width="50" template={attendanceAbsentTemplate} />
          <ColumnDirective field="session" headerTextAlign="center" textAlign="center" type="number" width="0" />
        </ColumnsDirective>
        <Inject services={[Page, Resize, Selection, Reorder, Search, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
}
