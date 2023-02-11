import React from "react";
import AttendancesTable from "../component/table/AttendanceTable";
import Header from "../component/layout/Header";
import attendance from "./../data/icons/test.png";
import { useStore } from "../contexts/Store";
export default function Attendances() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Présence" />
        <img src={attendance} width="30" />
      </div>
      <AttendancesTable />
    </>
  );
}
