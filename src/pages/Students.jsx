import React from "react";
import StudentsTable from "../component/table/StudentsTable";
import Header from "../component/layout/Header";
import students from "./../data/icons/studentsColor.png";
import { useStore } from "../contexts/Store";
export default function Students() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Élèves" />
        <img src={students} width="30" />
      </div>
      <StudentsTable />
    </>
  );
}
