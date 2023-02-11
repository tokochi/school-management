import React from 'react'

export default function Status(props) {
  return (
    <p
      className="capitalize text-center rounded-3xl px-1 py-1 min-w-[80px]"
      style={{
        backgroundColor: props.status ? "#e5faf2" : "#fff0f1",
        color: props.status ? "#3bb077" : "#d95087",
      }}>
      {props.status ? "Active" : "Non Active"}
    </p>
  );

}
