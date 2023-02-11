import Store from "electron-store";
import React, { useState } from "react";
import { useStore } from "../../contexts/Store";
import TextBox from "../button/TextBox";

export default function Security() {
  const schema = {
    user: { default: { pages: [] }, type: "object" },
    users: {
      type: "array",
      default: [],
    },
    restorQty: {
      type: "boolean",
      default: true,
    },
    restorCredit: {
      type: "boolean",
      default: true,
    },
  };
  const store = new Store({ schema });
  const theme = useStore((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [wrongPin, setWrongPin] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [productPin, setProductPin] = useState(store?.get("productPin"));
  const [customerPin, setCustomerPin] = useState(store?.get("customerPin"));
  const [providerPin, setProviderPin] = useState(store?.get("providerPin"));
  const [vendingPin, setVendingPin] = useState(store?.get("vendingPin"));
  const [buyingPin, setBuyingPin] = useState(store?.get("buyingPin"));
  const [restorQty, setRestorQty] = useState(store?.get("restorQty"));
  const [restorCredit, setRestorCredit] = useState(store?.get("restorCredit"));

  return (
    <div className={`grow overflow-y-auto h-[calc(100vh_-_190px)] ${theme.back} ${theme.textXl}`}>
      <div className=" p-6 space-y-6 ">
        <h2 className="text-2xl  font-bold mb-5">Sécurité</h2>
        <section>
          <h2 className="text-xl leading-snug  font-bold mb-1">Mot de passe</h2>
          <div className="mt-5">
            <button
              onClick={(e) => {
                setShowPassword(true);
              }}
              className={`btn ${showPassword && "hidden"}  border-slate-200 shadow-sm text-indigo-500`}>
              Definir un nouveau mot de passe
            </button>
          </div>
          {showPassword && (
            <div className="flex gap-4">
              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Mot de passe
                </label>
                <input
                  id="name"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-input w-full"
                  type="password"
                />
              </div>

              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Confirmer le mot de passe
                </label>
                <input
                  id="name"
                  onChange={(e) => {
                    setWrongPassword(false);
                    if (e.target.value === password) {
                      const users = store.get("users");
                      const temp = store.get("user");
                      const temparray = users.filter((user) => user.userName !== temp.userName);
                      store.set("users", [...temparray, { ...temp, password: e.target.value }]);
                    } else {
                      setWrongPassword(true);
                    }
                  }}
                  className="form-input w-full"
                  type="password"
                />
                {wrongPassword && <span className="m-1 text-xs text-red-400">Mot de passe inccorecte</span>}
              </div>
            </div>
          )}
        </section>
        <section>
          <h2 className="text-xl leading-snug  font-bold mb-1">Code Pin</h2>
          <div className="mt-5">
            <button
              onClick={(e) => {
                setShowPin(true);
              }}
              className={`btn ${showPin && "hidden"} border-slate-200 shadow-sm text-indigo-500`}>
              Definir un nouveau Code Pin
            </button>
          </div>
          {showPin && (
            <div className="flex gap-4">
              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Code Pin
                </label>
                <TextBox
                  id="name"
                  onChange={(e) => {
                    setPin(e.value);
                  }}
                  className="form-input w-full"
                  min={0}
                  htmlAttributes={{ maxlength: "6", type: "password" }}
                  type="number"
                  showSpinButton={false}
                  format="N0"
                />
              </div>

              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Confirmer le Code Pin
                </label>
                <TextBox
                  id="name"
                  onChange={(e) => {
                    setWrongPin(false);
                    if (e.value === pin) {
                      store.set("pin", e.value);
                    } else {
                      setWrongPin(true);
                    }
                  }}
                  className="form-input w-full"
                  min={0}
                  htmlAttributes={{ maxlength: "6", type: "password" }}
                  type="number"
                  showSpinButton={false}
                  format="N0"
                />
                {wrongPin && <span className="m-1 text-xs text-red-400">Code pin inccorecte</span>}
              </div>
            </div>
          )}
        </section>
        <section>
          <h2 className="text-xl leading-snug  font-bold mb-1">Verrouillage</h2>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Produits</div>
                <div className="text-sm">Verrouillage des modifications quantité Produits.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{productPin ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="productPin"
                    className="sr-only"
                    checked={productPin}
                    onChange={(e) => {
                      setProductPin(!productPin);
                      store?.set("productPin", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="productPin">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Ventes</div>
                <div className="text-sm">Verrouillage des modifications des Ventes.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{vendingPin ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="vendingPin"
                    className="sr-only"
                    checked={vendingPin}
                    onChange={(e) => {
                      setVendingPin(!vendingPin);
                      store?.set("vendingPin", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="vendingPin">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Achats</div>
                <div className="text-sm">Verrouillage des modifications des Achats.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{buyingPin ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="buyingPin"
                    className="sr-only"
                    checked={buyingPin}
                    onChange={(e) => {
                      setBuyingPin(!buyingPin);
                      store?.set("buyingPin", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="buyingPin">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Clients</div>
                <div className="text-sm">Verrouillage des modifications des Crédits Clients.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{customerPin ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="customerPin"
                    className="sr-only"
                    checked={customerPin}
                    onChange={(e) => {
                      setCustomerPin(!customerPin);
                      store?.set("customerPin", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="customerPin">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              <div>
                <div className=" font-semibold">Fournisseurs</div>
                <div className="text-sm">Verrouillage des modifications des Déttes Fournisseurs.</div>
              </div>
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{providerPin ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="providerPin"
                    className="sr-only"
                    checked={providerPin}
                    onChange={(e) => {
                      setProviderPin(!providerPin);
                      store?.set("providerPin", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="providerPin">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl leading-snug  font-bold mb-1">Réstauration</h2>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Produits</div>
                <div className="text-sm">Réstaurer la quantité des Produits Supprimer.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{restorQty ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="restorQty"
                    className="sr-only"
                    checked={restorQty}
                    onChange={(e) => {
                      setRestorQty(!restorQty);
                      store?.set("restorQty", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="restorQty">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className=" font-semibold">Crédits</div>
                <div className="text-sm">Réstaurer le Crédits des Clients ou Fournisseur Supprimer.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{restorCredit ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="restorCredit"
                    className="sr-only"
                    checked={restorCredit}
                    onChange={(e) => {
                      setRestorCredit(!restorCredit);
                      store?.set("restorCredit", e.target.checked);
                    }}
                  />
                  <label className="bg-slate-400" htmlFor="restorCredit">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-3 border-t border-slate-200">
          <div className="flex self-end">
            <button
              onClick={(e) => {
                const user = store.get("user");
                store.set("user", { userName: user.userName });
                location.reload();
              }}
              // type="submit"
              className={`btn ${theme.nav} ${theme.text} border-slate-200 hover:border-slate-300 text-slate-600`}>
              Reset
            </button>
            <button
              type="submit"
              onClick={(e) => {
                window.location.reload();
              }}
              //  type="submit"
              className={`btn ${theme.button} hover:bg-indigo-600 text-white ml-3`}>
              Sauvgarder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
