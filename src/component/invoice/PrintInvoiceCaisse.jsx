import Store from "electron-store";
import moment from "moment/min/moment-with-locales";
import React from "react";
import { ToWords } from "to-words";
import { useStore } from "../../contexts/Store";
import styled from "styled-components";

const Wrapper = styled.div`
  .page {
    position: relative;
    padding: 0.25rem;
    background-color: #ffffff;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    height: 100vh;
    width: 58mm;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .companyName {
    font-weight: 500;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }
  .ticket {
    font-weight: 500;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    border-top: 1.5px dashed #111827;
    border-bottom: 1.5px dashed #111827;
  }
  .table {
    margin-top: 0.5rem;
    width: 100%;
    border-bottom: 1.5px dashed #111827;
    font-size: 10px;
  }
  .thead {
    font-weight: 400;
    text-transform: uppercase;
    width: 100%;
    font-size: 10px;
    border-bottom: 1.5px dashed #111827;
  }
  .theadDiv {
    font-weight: 500;
    text-align: center;
  }
  .tbody {
    text-transform: uppercase;
  }
  .tbody2 {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 8px;
    font-weight: 400;
  }
  .tbody tr {
    text-align: left;
    font-size: 8px;
  }
  .td1 {
    font-weight: 400;
    text-align: center;
    width: 5mm;
  }

  .td2 {
    font-weight: 400;
    text-align: left;
    width: 30mm;
  }
  .td3 {
    font-weight: 400;
    text-align: right;
    width: 15mm;
  }
  .td4 {
    font-weight: 400;
    text-align: right;
    width: 15mm;
  }
  .td11 {
    font-weight: 500;
    font-size: 10px;
    // text-align: center;
    width: 12mm;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .td12 {
    font-weight: 500;
    font-size: 10px;
    text-align: right;
    width: 30mm;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .td13 {
    font-weight: 500;
    font-size: 10px;
    text-align: right;
    width: 22mm;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .comapnywrap {
    font-weight: 400;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    padding-left: 0.25rem /* 4px */;
    padding-right: 0.25rem /* 4px */;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .comapnyThanks {
    font-weight: 400;
    display: flex;
    flex-direction: column;
    //font-size: 10px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .comapnyInfo {
    font-weight: 400;
    display: flex;
    gap: 0.5rem;
  }
`;



export default function PrintInvoiceCaisse() {
  const vendingsData = useStore((state) => state.vendings);
  const caisse = useStore((state) => state.caisse);
  const schema = {
    company: {
      type: "object",
    },
  };
  const store = new Store({ schema });
  function toCurrency(num) {
    let str = "0.00DA";
    if (num != null && !isNaN(num)) {
      str = num?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      str = str.replace(",", " ");
    }
    return str;
  }

  return (
    <Wrapper>
      <div className="page">
        <div id="title" className="wrapper">
          <span className="companyName">{store?.get("company")?.name}</span>

          <span className="ticket ">
            {"Ticket: " + "0"}
            {caisse.index || parseInt(vendingsData.length + 1)}/{new Date().getFullYear()}
          </span>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>
                <div className="theadDiv">Qte</div>
              </th>
              <th>
                <div className="theadDiv">Produit</div>
              </th>
              <th>
                <div className="theadDiv">PUHT</div>
              </th>
              <th>
                <div className="theadDiv">Total</div>
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            {caisse.selectedProducts.map((product, index) => (
              <tr key={product._id}>
                <td className="td1">{product?.selectedQuantity}</td>
                <td className="td2">{product?.name}</td>
                <td className="td3">{toCurrency(product?.sellPrice)}</td>
                <td className="td4">{toCurrency(product?.sellPrice * product?.selectedQuantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <tbody className="tbody2">
            <tr className=" ">
              <td className="td11">ART: {caisse.selectedProducts.reduce((accS, curS) => accS + parseInt(curS.selectedQuantity), 0)}</td>
              <td className="td12">net a payer:</td>
              <td className="td13">{toCurrency(caisse.amount)}</td>
            </tr>
          </tbody>
        </table>
        <div className="comapnywrap">
          <div id="comapnyInfo" className="comapnyInfo">
            <span>Le: </span>
            <span> {moment(caisse.time).format("D/M/yyyy HH:mm:ss")}</span>
          </div>
          <div id="comapnyInfo" className="comapnyInfo">
            <span className="tbody">CLIENT: </span>
            <span className="tbody">{caisse.client.name}</span>
          </div>
          {caisse.client.name !== "Standard" && (
            <div id="comapnyInfo" className="comapnyInfo">
              <span className="tbody">vérsement: </span>
              <span className="tbody">{toCurrency(caisse.deposit)}</span>
            </div>
          )}
          <div id="comapnyInfo" className="comapnyInfo">
            <span className="tbody">VENDEUR: </span>
            <span className="tbody"> {store?.get("user")?.name}</span>
          </div>
          <div id="comapnyInfo" className="comapnyInfo">
            <span className="tbody">CAISSE N°: </span>
            <span className="tbody"> {store?.get("user")?.caisse}</span>
          </div>
          <div id="comapnyInfo" className="comapnyThanks">
            <span>merci pour votre visit</span>
            <span>bienvenue a tout moment</span>
            <span>Tél:{store?.get("company")?.phone.toString()?.match(/.{2}/g)?.join(" ")}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
