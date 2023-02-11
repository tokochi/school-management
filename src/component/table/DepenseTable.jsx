import { GridComponent, ColumnsDirective, ColumnDirective, Reorder, Page, Selection, Resize, Search, Inject, Edit, Toolbar, PdfExport, ExcelExport, Sort, Filter } from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef, useState } from "react";
import { useStore, loadDepenses } from "./../../contexts/Store";
import DepenseForm from "../form/DepenseForm";
import Localization from "../Localization";
import Store from "electron-store";
import Status from "./templates/Status";
const { ipcRenderer } = require("electron");
import { useReactToPrint } from "react-to-print";
// ******** Get Depenses List  ********
Localization("dépense");
export default function DepenseTable() {
  // ******** Column Templates  ********
  const depensesFormTemplate = (props) => <DepenseForm {...props} />;

  // ******** Grid Table  ********
  const depensesData = useStore((state) => state.depenses);
  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"];
    const [showPrintDiv, setShowPrintDiv] = useState(true);
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog", showDeleteConfirmDialog: true, template: depensesFormTemplate };
  let grid;
  const gridRef = useRef();
  const store = new Store();
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
        ipcRenderer.send("addDepense", args.data);
        ipcRenderer.on("refreshGridDepense:add", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Dépense",
              action: "ajouter",
              title: "Nouveau Dépense Ajouter",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          ipcRenderer.removeAllListeners("refreshGridDepense:add");
          useStore.setState({ toast: { show: true, title: "Dépense Ajouter Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          loadDepenses();
        });

        break;
      case args.requestType === "beginEdit":
        args.dialog.header = "Modifier une dépense";

        break;
      case args.requestType === "save" && args.action === "edit":
        ipcRenderer.send("updateDepense", args.data);
        ipcRenderer.on("refreshGridDepense:update", (e, res) => {
          store?.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Dépense",
              action: "modifier",
              title: "Dépense Modifier",
              item: args?.data,
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Dépense Modifier Avec Succés", type: "success" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
          ipcRenderer.removeAllListeners("refreshGridDepense:update");
          loadDepenses();
        });

        break;
      case args.requestType === "add":
        args.dialog.header = "Ajouter une nouvelle dépense";
        break;
      case args.requestType === "delete":
        ipcRenderer.send("deleteDepense", args.data[0]);
        ipcRenderer.on("refreshGridDepense:delete", (e, res) => {
          store.set("activity", [
            ...store?.get("activity"),
            {
              date: new Date(),
              page: "Dépense",
              action: "supprimer",
              title: "Dépense Supprimer",
              item: args?.data[0],
              user: store?.get("user")?.userName,
              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
            },
          ]);
          useStore.setState({ toast: { show: true, title: "Dépense Supprimer De la liste", type: "error" } });
          setTimeout(() => {
            useStore.setState({ toast: { show: false } });
          }, 2000);
           loadDepenses();
          ipcRenderer.removeAllListeners("refreshGridDepense:delete");
        });
        break;
    }
  }

  return (
    <div className="m-4">
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={depensesData}
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
          <ColumnDirective field="description" headerText="Description" textAlign="center" headerTextAlign="center" width="50" />
          <ColumnDirective field="concerned" headerText="concerné" textAlign="center" headerTextAlign="center" width="50" />
          <ColumnDirective field="type" headerText="Type" textAlign="center" headerTextAlign="center" width="50" />
          <ColumnDirective field="amount" format="C2" textAlign="center" headerText="Montant" headerTextAlign="center" width="60" />
          <ColumnDirective field="time" headerText="Date" textAlign="center" headerTextAlign="center" type="datetime" format="dd/MM/yyyy" width="50" />
          <ColumnDirective field="comment" headerText="Commentaire" headerTextAlign="center" width="50" />
        </ColumnsDirective>
        <Inject services={[Page, Resize, Selection, Reorder, Search, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
}
