import { ColumnDirective, ColumnsDirective, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Reorder, Resize, Search, Selection, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import Localization from "../Localization";
import React, { useEffect, useRef, useState } from "react";
import ClasseForm from "../form/ClasseForm";
import Status from "./templates/Status";
import Store from "electron-store";
import { useReactToPrint } from "react-to-print";
import ClasseGridStudents from "./templates/classes/ClasseGridStudents";
import ClasseGridName from "./templates/classes/ClasseGridName";
import { useStore, loadClasses } from "../../contexts/Store";
const { ipcRenderer } = require("electron");

// ******** Get Classes List  ********
Localization("classe");
export default function ClasseTable() {
  // ******** Column Templates  ********
  const classGridStatus = (props) => (
    <p
      className="capitalize text-center rounded-3xl px-1 py-1 min-w-[80px]"
      style={{
        backgroundColor: props.students.length > 0 ? "#e5faf2" : "#fff0f1",
        color: props.students.length > 0 ? "#3bb077" : "#d95087",
      }}>
      {props.students.length > 0 ? "Active" : "Non Active"}
    </p>
  );
  const classGridStudents = (props) => <ClasseGridStudents {...props} />;
  const classeGridName = (props) => <ClasseGridName {...props} />;
  const studentsFormTemplate = (props) => <ClasseForm {...props} studentsString={props.students != null && props.students.map((student) => student.name)} />;
const store = new Store();
  const classeSessionTemplate = (props) => (
    <p>
      {props.currentSession}/{props.sessions}
    </p>
  );
  // ******** Grid Table  ********
  const classesData = useStore((state) => state.classes);
  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
    const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog", showDeleteConfirmDialog: true, template: studentsFormTemplate };
  const textValidation = { required: [(args) => (args["value"] == "" ? false : true), "ce champ est obligatoire"] };
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
          fileName: "List des classes.xlsx",
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
        ipcRenderer.send("addClasse", useStore.getState().selectedClasses);
        ipcRenderer.on("refreshGridClasse:add", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Classe",
              action: "ajouter",
              title: "Nouveau Classe Ajouter",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          ipcRenderer.removeAllListeners("refreshGridClasse:add");
          useStore.setState({ toast: { show: true, title: "Classe Ajouter Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadClasses();
        });
        break;
      case args.requestType === "beginEdit":
        args.dialog.header = "Modifier une classe";
        break;
      case args.requestType === "save" && args.action === "edit":
        ipcRenderer.send("updateClasse", useStore.getState().selectedClasses);
        ipcRenderer.on("refreshGridClasse:update", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Classe",
              action: "modifier",
              title: "Classe Modifier",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Classe Modifier Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          ipcRenderer.removeAllListeners("refreshGridClasse:update");
          loadClasses();
        });
        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter une nouvelle classe";
        break;
      case args.requestType === "delete":
        ipcRenderer.send("deleteClasse", args.data[0]);
        ipcRenderer.on("refreshGridClasse:delete", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Classe",
              action: "supprimer",
              title: "Classe Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Classe Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
         loadClasses();
          ipcRenderer.removeAllListeners("refreshGridClasse:delete");
        });
        break;
    }
  }

  function actionBegin(args) {
    if (args.requestType === "delete") {

    }
    if (args.requestType === "add") {
      useStore.setState({ selectedClasses: {} });
    }
    if (args.requestType === "beginEdit") {
      useStore.setState({ selectedClasses: {} });
    }
  }

  return (
    <div className="m-4 ">
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={classesData}
        enableHover={false}
        allowPaging
        allowExcelExport
        allowPdfExport
        allowResizing
        allowSorting
        allowReordering
        locale="fr-BE"
        pageSettings={{ pageSize: 6 }}
        toolbar={toolbarOptions}
        actionBegin={actionBegin}
        toolbarClick={toolbarClick}
        actionComplete={(props) => actionComplete(props)}
        editSettings={editing}>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Nom" width="100" headerTextAlign="center" template={classeGridName} />
          <ColumnDirective field="teacher" textAlign="center" validationRules={textValidation} headerText="Enseignant" headerTextAlign="center" width="55" />
          <ColumnDirective field="currentSession" textAlign="center" headerText="Séance N°" headerTextAlign="center" width="30"/>
          <ColumnDirective field="students" headerText="Éléves" textAlign="center" headerTextAlign="center" width="100" template={classGridStudents} />
          <ColumnDirective field="type" headerText="Type" textAlign="center" width="50" headerTextAlign="center" />
       {/* <ColumnDirective field="payment" headerText="payment" headerTextAlign="center" textAlign="center" format="C2" width="40" /> */}
          <ColumnDirective field="status" headerText="Status" headerTextAlign="center" template={classGridStatus} width="50" />
          <ColumnDirective field="group" headerText="Groupe" validationRules={textValidation} headerTextAlign="center" width="50" visible={false} />
          <ColumnDirective field="level" headerText="Niveau" validationRules={textValidation} headerTextAlign="center" width="50" visible={false} />
          <ColumnDirective field="module" headerText="Module" validationRules={textValidation} headerTextAlign="center" width="50" visible={false} />
        </ColumnsDirective>
        <Inject services={[Page, Resize, Selection, Reorder, Search, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
}
