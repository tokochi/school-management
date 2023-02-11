import React from "react";
import ClassesTable from "../component/table/ClasseTable";
import Header from "../component/layout/Header";
import classe from "./../data/icons/classColor.png";
import { useStore } from "../contexts/Store";
export default function Classes() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Classes" />
        <img src={classe} width="30" />
      </div>
      <ClassesTable />
    </>
  );
}
