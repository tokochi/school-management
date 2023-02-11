import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import Store from "electron-store";
import React, { useEffect, useState } from "react";
import { loadProducts, useStore } from "../../contexts/Store";
import TextBox from "../button/TextBox";
import PopupDialog from "../dialog/PopupDialog";
import alarm from "./../../data/icons/alarm.png";
import deletePng2 from "./../../data/icons/delete2.png";
const { ipcRenderer } = require("electron");

export default function ProductFormPopUp({ title }) {
  const labelclassName = "p-4 w-[170px] text-sm font-medium";
  const brandTemplate = (props) => (
    <div className="flex justify-between items-center">
      <div>{props.name}</div>
      <div>
        <button
          className=""
          onClick={(e) => {
            const temp = store?.get("brand").filter((brand) => brand.name !== props.name);
            store?.set("brand", temp);
          }}>
          <img src={deletePng2} width="15" />
        </button>
      </div>
    </div>
  );
  const unitTemplate = (props) => (
    <div className="flex justify-between items-center">
      <div>{props.name}</div>
      <div>
        <button
          className=""
          onClick={(e) => {
            const temp = store?.get("unit").filter((unit) => unit.name !== props.name);
            store?.set("unit", temp);
          }}>
          <img src={deletePng2} width="15" />
        </button>
      </div>
    </div>
  );
  const categoryTemplate = (props) => (
    <div className="flex justify-between items-center">
      <div>{props.name}</div>
      <div>
        <button
          className=""
          onClick={(e) => {
            const temp = store?.get("category").filter((category) => category.name !== props.name);
            store?.set("category", temp);
          }}>
          <img src={deletePng2} width="15" />
        </button>
      </div>
    </div>
  );
  const schema = {
    unit: { type: "array", default: [{ name: "U" }] },
    brand: { type: "array", default: [] },
    category: { type: "array", default: [] },
  };
  const store = new Store({ schema });
  const [close, setClose] = useState(false);
  const [name, setName] = useState();
  const [notification, setNotification] = useState(true);
  const [barCode, setBarCode] = useState();
  const [expireDate, setExpireDate] = useState();
  const [comment, setComment] = useState();
  const [unit, setUnit] = useState("U");
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [qtyAlert, setQtyAlert] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [sellPrice, setSellPrice] = useState();
  const [sellPriceGros, setSellPriceGros] = useState();
  const [expired, setExpired] = useState(false);
  const [addUnit, setAddUnit] = useState("");
  const [addBrand, setAddBrand] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [requiredName, setRequiredName] = useState(false);
  const [requiredQuantity, setRequiredQuantity] = useState(false);
  const [requiredPrice, setRequiredPrice] = useState(false);
  const [requiredSellPrice, setRequiredSellPrice] = useState(false);
  const unitList = store?.get("unit");
  const brandList = store?.get("brand");
  const categoryList = store?.get("category");
  const [margin, setMargin] = useState((sellPrice - buyPrice) / sellPrice);
  const [marginGros, setMarginGros] = useState((sellPriceGros - buyPrice) / sellPriceGros);

  useEffect(() => {
    setClose(false);
  }, [close]);
  const dropdownOpen = () => useStore((state) => state.dropdownOpen);
  return (
    <DialogComponent
      header="Ajouter un Nouveau Produit"
      allowDragging
      width="550"
      height="600"
      open={() => useStore.setState(() => ({ dropdownOpen: true }))}
      cloose={() => useStore.setState(() => ({ dropdownOpen: false }))}
      visible={dropdownOpen()}
      footerTemplate={() => (
        <div>
          <ul className="flex items-center justify-end gap-6">
            <li>
              <button
                className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={(e) => {
                  switch (true) {
                    case name == null:
                      setRequiredName(true);
                      break;
                    case quantity == null:
                      setRequiredQuantity(true);
                      break;
                    case buyPrice == null:
                      setRequiredPrice(true);
                      break;
                    case sellPrice == null:
                      setRequiredSellPrice(true);
                      break;
                    default:
                      ipcRenderer.send("addProduct", { name, barCode, expired: expireDate, comment, notification, quantity, brand, unit, category, qtyAlert, buyPrice, sellPrice, sellPriceGros });
                      ipcRenderer.on("refreshGridProduct:add", (e, res) => {
                        store?.set("activity", [
                          ...store?.get("activity"),
                          {
                            date: new Date(),
                            page: "Caisse",
                            action: "ajouter",
                            title: "Nouveau Produit Ajouter",
                            item: JSON.parse(res),
                            user: store?.get("user")?.userName,
                            role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                          },
                        ]);
                        ipcRenderer.removeAllListeners("refreshGridProduct:add");
                        useStore.setState({ toast: { show: true, title: "Produit Ajouter Au Stock Avec Succés", type: "success" } });
                        setTimeout(() => {
                          useStore.setState({ toast: { show: false } });
                        }, 2000);
                        loadProducts();
                        setName("");
                        setBarCode();
                        setExpireDate();
                        setComment();
                        setUnit("U");
                        setBrand();
                        setCategory();
                        setQuantity();
                        setQtyAlert();
                        setBuyPrice();
                        setSellPrice();
                        setSellPriceGros();
                        // window.location.reload();
                        useStore.setState(() => ({ dropdownOpen: false }));
                      });
                      break;
                  }
                }}>
                Ajouter
              </button>
            </li>
            <li>
              <button
                className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                onClick={(e) => {
                  setName("");
                  setBarCode();
                  setExpireDate();
                  setComment();
                  setUnit("U");
                  setBrand();
                  setCategory();
                  setQuantity();
                  setQtyAlert();
                  setBuyPrice();
                  setSellPrice();
                  setSellPriceGros();
                  useStore.setState(() => ({ dropdownOpen: false }));
                }}>
                Annuler
              </button>
            </li>
          </ul>
        </div>
      )}>
      <div>
        <table>
          <tbody>
            <tr>
              <td className={labelclassName}>Désignation:</td>
              <td className="w-[350px]">
                <TextBox
                  type="text"
                  id="name"
                  width="full"
                  dataBound
                  onChange={(e) => {
                    e.value != null && setName(e.value);
                    setRequiredName(false);
                  }}
                  value={(isNaN(parseInt(title)) && title) || name}
                  title="Désignation du Produit"
                />
                {requiredName && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Code Barre:</td>
              <td className="w-[350px]">
                <TextBox
                  type="number"
                  format="N0"
                  showSpinButton={false}
                  id="barCode"
                  width="w-full"
                  onChange={(e) => e.value != null && setBarCode(e.value)}
                  value={(typeof parseInt(title) === "number" && parseInt(title)) || barCode}
                  title="Code Barre"
                />
              </td>
            </tr>
            {/* <tr>
              <td className={labelclassName}>Marque:</td>
              <td>
                <div className="flex gap-2">
                  <TextBox
                    type="dropdown"
                    id="brand"
                    width="w-[200px]"
                    itemTemplate={brandTemplate}
                    value={brand}
                    fields={{ text: "name", value: "name" }}
                    onChange={(e) => e.value != null && setBrand(e.value)}
                    dataSource={store?.get("brand")}
                    popupHeight="200px"
                    title="Choisir la Marque"
                  />
                  <PopupDialog
                    id="addBrand"
                    close={close}
                    header="Ajouter une Marque"
                    width="330px"
                    bg="bg-white"
                    svg={
                      <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                    }
                    footer={() => (
                      <div>
                        <ul className="flex items-center justify-end gap-6">
                          <li>
                            <button
                              className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                              onClick={(e) => {
                                setClose(true);
                                if (addBrand.length > 0) {
                                  brandList.push({ name: addBrand });
                                  store.set("brand", [...new Set(brandList)]);
                                }
                              }}>
                              Ajouter
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                              onClick={(e) => {
                                setClose(true);
                              }}>
                              Annuler
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    content={() => (
                      <div>
                        <TextBox
                          type="text"
                          id="addBrand"
                          width="full"
                          onChange={(e) => {
                            setAddBrand(e.value);
                          }}
                          title="Nouvelle Marque"
                        />
                      </div>
                    )}></PopupDialog>
                </div>
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Unité:</td>
              <td>
                <div className="flex gap-2">
                  <TextBox
                    type="dropdown"
                    id="unit"
                    width="w-[200px]"
                    value={unit}
                    itemTemplate={unitTemplate}
                    fields={{ text: "name", value: "name" }}
                    onChange={(e) => e.value != null && setUnit(e.value)}
                    dataSource={store?.get("unit")}
                    popupHeight="200px"
                    title="Choisir une Unité"
                  />
                  <PopupDialog
                    id="addUnit"
                    close={close}
                    header="Ajouter une Unité"
                    width="330px"
                    bg="bg-white"
                    svg={
                      <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                    }
                    footer={() => (
                      <div>
                        <ul className="flex items-center justify-end gap-6">
                          <li>
                            <button
                              className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                              onClick={() => {
                                setClose(true);
                                if (addUnit.length > 0) {
                                  unitList.push({ name: addUnit });
                                  store.set("unit", [...new Set(unitList)]);
                                }
                              }}>
                              Ajouter
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                              onClick={(e) => {
                                setClose(true);
                              }}>
                              Annuler
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    content={() => (
                      <div>
                        <TextBox
                          type="text"
                          id="addUnit"
                          width="full"
                          onChange={(e) => {
                            setAddUnit(e.value);
                          }}
                          title="Nouvelle Unité"
                        />
                      </div>
                    )}></PopupDialog>
                </div>
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Catégorie:</td>
              <td>
                <div className="flex gap-2">
                  <TextBox
                    type="dropdown"
                    id="category"
                    width="w-[200px]"
                    value={category}
                    itemTemplate={categoryTemplate}
                    fields={{ text: "name", value: "name" }}
                    onChange={(e) => e.value != null && setCategory(e.value)}
                    dataSource={store?.get("category")}
                    popupHeight="200px"
                    title="Choisir la Catégorie"
                  />
                  <PopupDialog
                    id="addCategory"
                    close={close}
                    header="Ajouter une Catégorie"
                    width="330px"
                    svg={
                      <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                    }
                    footer={() => (
                      <div>
                        <ul className="flex items-center justify-end gap-6">
                          <li>
                            <button
                              className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                              onClick={() => {
                                setClose(true);
                                if (addCategory.length > 0) {
                                  categoryList.push({ name: addCategory });
                                  store.set("category", [...new Set(categoryList)]);
                                }
                              }}>
                              Ajouter
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                              onClick={(e) => {
                                setClose(true);
                              }}>
                              Annuler
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    content={() => (
                      <div>
                        <TextBox
                          type="text"
                          id="addCategory"
                          width="full"
                          onChange={(e) => {
                            setAddCategory(e.value);
                          }}
                          title="Nouvelle Catégorie"
                        />
                      </div>
                    )}></PopupDialog>
                </div>
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Expiration:</td>
              <td className="w-[350px]">
                <div className="flex gap-2">
                  <div className="border-slate-200 w-[177px]  border rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm">
                    <DatePickerComponent
                      id="expired"
                      name="expired"
                      enabled={expired}
                      width="175"
                      onChange={(e) => e.value != null && setExpireDate(e.value)}
                      value={expireDate}
                      placeholder="Date d'expiration"
                      format="dddd MMMM y"
                      floatLabelType="Never"></DatePickerComponent>
                  </div>{" "}
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox " checked={expired} onChange={() => setExpired(!expired)} />
                  </label>
                </div>
              </td>
            </tr> */}
            <tr>
              <td className={labelclassName}>Quantité:</td>
              <td>
                <TextBox
                  type="number"
                  format="N0"
                  label={unit}
                  id="quantity"
                  width="w-[200px]"
                  step={5}
                  min={0}
                  value={quantity}
                  onChange={(e) => {
                    e.value != null && setQuantity(e.value);
                    setRequiredQuantity(false);
                  }}
                  title="Quantité"
                />
                {requiredQuantity && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Quantité Alerté:</td>
              <td>
                <div className="flex gap-2 items-center">
                  <TextBox
                    type="number"
                    format="N0"
                    width="w-[200px]"
                    enabled={quantity}
                    label={unit}
                    min={0}
                    step={5}
                    max={quantity}
                    id="qtyAlert"
                    value={qtyAlert}
                    onChange={(e) => e.value != null && setQtyAlert(e.value)}
                    title="Quantité Alerté"
                  />
                  <img src={alarm} width="20" />
                  <div className="form-switch">
                    <input type="checkbox" id="comments" className="sr-only" checked={notification} onChange={() => setNotification(!notification)} />
                    <label className="bg-slate-400" htmlFor="comments">
                      <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Prix d'achat:</td>
              <td>
                <TextBox
                  type="number"
                  format="N2"
                  label="DA"
                  min={0}
                  // max={0}
                  step={100}
                  width="w-[200px]"
                  id="buyPrice"
                  value={buyPrice}
                  onChange={(e) => {
                    setRequiredPrice(false);
                    e.value != null && setBuyPrice(e.value);
                    setMargin((sellPrice - e.value) / e.value);
                  }}
                  title="Prix d'achat"
                />
                {requiredPrice && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Prix ​​de vente:</td>
              <td>
                <div className="flex gap-2">
                  <TextBox
                    type="number"
                    format="N2"
                    label="DA"
                    width="w-[200px]"
                    id="sellPrice"
                    min={buyPrice}
                    step={100}
                    value={sellPrice}
                    onChange={(e) => {
                      setRequiredSellPrice(false);
                      e.value != null && setSellPrice(e.value);
                      setMargin((e.value - buyPrice) / buyPrice);
                    }}
                    title="Prix ​​de vente"
                  />
                  {margin != null && !isNaN(margin) && (
                    <div className={`text-sm font-[500] text-center text-white p-1 ${Math.sign(margin) === 1 ? "bg-emerald-500" : "bg-amber-500"}   rounded-full`}>
                      {Math.sign(margin) === 1 ? "+" + parseInt(margin * 100) : parseInt(margin * 100)}%
                    </div>
                  )}
                </div>
                {requiredSellPrice && <span className="m-1 text-xs text-red-400">ce champ est obligatoire</span>}
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Prix ​​de vente Gros:</td>
              <td>
                <div className="flex gap-2">
                  <TextBox
                    type="number"
                    format="N2"
                    label="DA"
                    width="w-[200px]"
                    id="sellPriceGros"
                    min={buyPrice}
                    step={100}
                    value={sellPriceGros}
                    onChange={(e) => {
                      e.value != null && setSellPriceGros(e.value);
                      setMarginGros((e.value - buyPrice) / buyPrice);
                    }}
                    title="Prix ​​de vente Gros"
                  />
                  {marginGros != null && !isNaN(marginGros) && (
                    <div className={`text-sm font-[500] text-center text-white p-1 ${Math.sign(marginGros) === 1 ? "bg-emerald-500" : "bg-amber-500"}   rounded-full`}>
                      {Math.sign(marginGros) === 1 ? "+" + parseInt(marginGros * 100) : parseInt(marginGros * 100)}%
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className={labelclassName}>Remarque:</td>
              <td className="w-[350px]">
                <TextBox type="text" multiline id="comment" width="full" onChange={(e) => e.value != null && setComment(e.value)} value={comment} title="Remarque sur le Produit" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DialogComponent>
  );
}
