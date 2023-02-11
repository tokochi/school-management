import React from "react";
import MembershipTable from "../component/table/MembershipTable";
import Header from "../component/layout/Header";
import depense from "./../data/icons/estimate.png";
import { useStore } from "../contexts/Store";
export default function Depenses() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex items-center">
        <Header title="Abonnements" />
        <img src={depense} width="30" />
      </div>
      <MembershipTable />
    </>
  );
}
