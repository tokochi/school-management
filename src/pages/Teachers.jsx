import React from "react";
import TeachersTable from "../component/table/TeachersTable";
import Header from "../component/layout/Header";
import teacher from "./../data/icons/teacherColor.png";
import { useStore } from "../contexts/Store";

export default function Teachers() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Enseignantes" />
        <img src={teacher} width="30" />
      </div>
      <TeachersTable />
    </>
  );
}
