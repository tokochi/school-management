import React from "react";

export default function Status(props) {
  if (props?.amount>0 && props?.deposit === 0) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-rose-100 text-rose-500">Non Payé</p>;
  if (props?.amount > 0 && props?.deposit === props?.amount) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-emerald-100 text-emerald-600 ">Payé</p>;
  if (props?.amount > 0 && props?.deposit < props?.amount) return <p className="capitalize text-center rounded-3xl px-1 py-1 bg-amber-100 text-amber-600 ">Vérsement</p>;

}
