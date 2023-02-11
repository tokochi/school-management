import Store from "electron-store";
import moment from "moment/min/moment-with-locales";
import React from "react";
import { ToWords } from "to-words";
import { useStore } from "../../contexts/Store";
import styled from "styled-components";

const Wrapper = styled.div`
  .page {
    padding: 2.5rem;
    background-color: #ffffff;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    height: 297mm;
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
  .title {
    display: flex;
    flex-direction: column;
  }
  .Facture {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
  }
  .rc {
    margin-top: 0.5rem;
    font-weight: 500;
  }
  .IF {
    font-weight: 500;
  }
  .rcSpan {
    margin-left: 0.5rem;
    font-weight: 400;
  }
  .comapnyInfo {
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
  }
  .comapnyInfo2 {
    display: flex;
    margin-top: 2rem;
    gap: 0.5rem;
  }
  .client {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
  }
  .clientName {
    display: flex;
    font-weight: 500;
    gap: 0.5rem;
  }
  .clientName2 {
    font-weight: 400;
  }
  .table {
    width: 100%;
    border-width: 1px;
    table-layout: auto;
  }
  .thead {
    font-size: 0.75rem /* 12px */;
    line-height: 1.5;
    text-transform: uppercase;
    text-align: center;
    color: rgb(71 85 105);
    background-color: rgb(248 250 252);
    border-top: 1px solid rgb(226 232 240);
  }
  .theadth {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    white-space: nowrap;
  }
  .theadDiv {
    font-weight: 500;
    text-align: center;
  }
  .center {
    text-align: center;
  }
  .padding {
    padding: 0.5rem /* 8px */;
  }
  .total {
    display: flex;
    margin-top: 1rem;
    margin-right: 2rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .total2 {
    font-weight: 500;
    width: 120px;
  }

  .tbodytr {
    text-align: right;
  }
  .semibold {
    font-weight: 500;
  }
  .td1 {
    font-weight: 500;
    padding-top: 1rem /* 16px */;
  }
  .td2 {
    border-top: 1px solid rgb(148 163 184);
  }
  .td3 {
    text-align: right;
    padding-top: 1rem /* 16px */;
  }
  .td4 {
    margin-right: 1rem /* 16px */;
    font-size: 0.75rem /* 12px */;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    
  }
  .td11 {
    font-weight: 500;
  margin-top:100px;
  margin-left:50px;
  }
`;

export default function PrintInvoiceFacture() {
  const vendingsData = useStore((state) => state.vendings);
  const facture = useStore((state) => state.facture);
  const schema = {
    company: {
      type: "object",
    },
  };
  const store = new Store({ schema });
  const toCurrency = useStore((state) => state.toCurrency);
  const toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: {
      currency: false,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });
  return (
    <Wrapper>

      <div className="page">
        <div className="wrapper">
          <div id="title" className="title">
            <span className="Facture">
              {"Facture N° " + " 00"}
              {facture.index || parseInt(vendingsData.length + 1)} / {new Date().getFullYear()}
            </span>
            <div className="rc">
              N°RC:
              <span className="rcSpan">{store?.get("company")?.rc}</span>
            </div>
            <div className="IF">
              N°IF:
              <span className="rcSpan">{store?.get("company")?.if}</span>
            </div>
          </div>
          <div id="comapnyInfo" className="comapnyInfo">
            <span className="IF">{store?.get("company")?.name}</span>
            <span className="">{store?.get("company")?.address}</span>
            <span className="">Tél:{store?.get("company")?.phone?.toString()?.match(/.{2}/g)?.join(" ")}</span>
          </div>
        </div>
        <div className="client">
          {facture.client.name != "Standard" && (
            <div id="title" className="clientName">
              Facture À:
              <div className="title">
                <span className="clientName2">{facture.client.name}</span>
                <span className="clientName2">{facture.client?.phone?.toString()?.match(/.{2}/g)?.join(" ")}</span>
              </div>
            </div>
          )}
          <div id="comapnyInfo" className="comapnyInfo2">
            <span className="IF">Le: </span>
            {moment(facture.time).format("D/M/yyyy")}
          </div>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="theadth">
                <div className="theadDiv">N°</div>
              </th>
              <th className="theadth">
                <div className="theadDiv">Designation</div>
              </th>
              <th className="theadth">
                <div className="theadDiv">Qte</div>
              </th>
              <th className="theadth">
                <div className="theadDiv">Prix Vente U</div>
              </th>
              <th className="theadth">
                <div className="theadDiv">Montant</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {facture.selectedProducts.map((product, index) => (
              <tr className="center" key={product._id}>
                <td className="padding">{"#" + parseInt(index + 1)}</td>
                <td>{product?.name}</td>
                <td>{product?.selectedQuantity}</td>
                <td>{toCurrency(product?.sellPrice)}</td>
                <td>{toCurrency(product?.sellPrice * product?.selectedQuantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <table>
            <tbody>
              <tr>
                <td className="total2">Total HT</td>
                <td className="tbodytr">{toCurrency(facture.total)}</td>
              </tr>
              <tr>
                <td className="semibold">Remise</td>
                <td className=" tbodytr">{toCurrency(facture.rebate)}</td>
              </tr>
              <tr>
                <td className="semibold">Versement</td>
                <td className="tbodytr">{toCurrency(facture.deposit)}</td>
              </tr>
              <tr>
                <td className="semibold">TVA</td>
                <td className="tbodytr">{facture.tva}%</td>
              </tr>
              <tr className="td2">
                <td className="td1"> Total TTC</td>
                <td className="td3">{toCurrency(facture.amount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="td4">
          Arrêtée la présente facture à la somme de : <span className="">{toWords.convert(facture.amount)} Dinars</span>
        </div>
        <div className="td11">Signature </div>
      </div>
    </Wrapper>
  );
}
