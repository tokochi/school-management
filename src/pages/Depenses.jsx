import React from "react";
import DepensesTable from "../component/table/DepenseTable";
import Header from "../component/layout/Header";
import depense from "./../data/icons/estimate.png";
import { useStore } from "../contexts/Store";
export default function Depenses() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Dépense" />
        <img src={depense} width="30" />
      </div>
      <DepensesTable />
    </>
  );
}
