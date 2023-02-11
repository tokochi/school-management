import { ColumnDirective, ColumnsDirective, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Reorder, Resize, Search, Selection, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import Localization from "../Localization";
import React, { useEffect, useRef, useState } from "react";
import TeacherForm from "../form/TeacherForm";
import Store from "electron-store";
import Status from "./templates/Status";
import { useReactToPrint } from "react-to-print";
import { useStore, loadTeachers } from "./../../contexts/Store";
import TeacherGridModules from "./templates/teachers/TeacherGridModules";
import TeacherGridLevels from "./templates/teachers/TeacherGridLevels";
import TeacherGridName from "./templates/teachers/TeacherGridName";
const { ipcRenderer } = require("electron");
// ******** Get Teachers List  ********
Localization("teacher");
export default function TeachersTable() {
  // ******** Column Templates  ********
  const teacherGridModules = (props) => <TeacherGridModules {...props} />;
  const teacherGridLevels = (props) => <TeacherGridLevels {...props} />;
  const teacherGridName = (props) => <TeacherGridName {...props} />;
  const teachersFormTemplate = (props) => <TeacherForm {...props} />;
  const teacherGridStatus = (props) => <Status {...props} />;
  // ******** Grid Table  ********
const store = new Store();
  const studentsData = useStore((state) => state.teachers);
  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
    const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog", showDeleteConfirmDialog: true, template: teachersFormTemplate };
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
          fileName: "List d'enseignants.xlsx",
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
       ipcRenderer.send("addTeacher", args.data);
        ipcRenderer.on("refreshGridTeacher:add", (e, res) => {
                      store?.set("activity", [
                        ...store?.get("activity"),
                        {
                          date: new Date(),
                          page: "enseignant",
                          action: "ajouter",
                          title: "Nouveau enseignant Ajouter",
                          item: args?.data,
                          user: store?.get("user")?.userName,
                          role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                        },
                      ]);
                      ipcRenderer.removeAllListeners("refreshGridTeacher:add");
                      useStore.setState({ toast: { show: true, title: "enseignant Ajouter Avec Succés", type: "success" } });
                      setTimeout(() => {
                        useStore.setState({ toast: { show: false } });
                      }, 2000);
          loadTeachers();
        });

        break;
      case args.requestType === "beginEdit":
        args.dialog.header = "Modifier un enseignant";
        break;
      case args.requestType === "save" && args.action === "edit":
        ipcRenderer.send("updateTeacher", args.data);
        ipcRenderer.on("refreshGridTeacher:update", (e, res) => {
                    store?.set("activity", [
                      ...store?.get("activity"),
                      {
                        date: new Date(),
                        page: "Enseignant",
                        action: "modifier",
                        title: "Enseignant Modifier",
                        item: args?.data,
                        user: store?.get("user")?.userName,
                        role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                      },
                    ]);
                    useStore.setState({ toast: { show: true, title: "Enseignant Modifier Avec Succés", type: "success" } });
                    setTimeout(() => {
                      useStore.setState({ toast: { show: false } });
                    }, 2000);
                    ipcRenderer.removeAllListeners("refreshGridTeacher:update");
         loadTeachers();
        });
        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter un nouvel enseignant";
        break;
      case args.requestType === "delete":
        ipcRenderer.send("deleteTeacher", args.data[0]);
        ipcRenderer.on("refreshGridTeacher:delete", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Enseignant",
              action: "supprimer",
              title: "Enseignant Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Enseignant Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadTeachers();
          ipcRenderer.removeAllListeners("refreshGridTeacher:delete");
        });
        break;
    }
  }

  return (
    <div className="m-4">
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={studentsData}
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
        // enablePersistence
        actionComplete={(props) => actionComplete(props)}
        allowSorting>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Nom" width="100" headerTextAlign="center" template={teacherGridName} />
          <ColumnDirective field="phone" headerText="Téléphone" textAlign="center" headerTextAlign="center" width="50" />
          <ColumnDirective field="email" headerText="Email" headerTextAlign="center" width="50" />
          <ColumnDirective field="modules" headerText="Modules" headerTextAlign="center" width="50" template={teacherGridModules} />
          <ColumnDirective field="levels" headerText="Niveaux" headerTextAlign="center" width="50" template={teacherGridLevels} />
          <ColumnDirective field="address" headerText="Addresse" headerTextAlign="center" width="50" />
          <ColumnDirective field="startAt" headerText="Inscription" textAlign="center" headerTextAlign="center" format="dd/MM/yyyy" width="50" />
          <ColumnDirective field="degree" headerText="Diplôme" textAlign="center" headerTextAlign="center" width="50" visible={ false} />
          <ColumnDirective field="status" headerText="Status" headerTextAlign="center" template={teacherGridStatus} width="50" />
          {/* <ColumnDirective field="gender" headerText="Civilite" headerTextAlign="center" width="50" /> */}
        </ColumnsDirective>
        <Inject services={[Page, Resize, Selection, Search, Reorder, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
}
