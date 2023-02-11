import React from "react";

export default function Paid(props) {
  return (
    <p
      className="capitalize text-center rounded-3xl px-1 py-2"
      style={{
        backgroundColor: props.paid ? "#e5faf2" : "#fff0f1",
        color: props.paid ? "#3bb077" : "#d95087",
      }}>
      {props.paid ? "Payé" : "Non Payé"}
    </p>
  );
}
