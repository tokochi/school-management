import Store from "electron-store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../contexts/Store";
export default function AddAccount() {
  const theme = useStore((state) => state.theme);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [wrongUserName, setWrongUserName] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const schema = {
    user: { type: "object" },
    users: {
      type: "array",
      default: [],
    },
  };
  const store = new Store({ schema });
  const users = store?.get("users");
  useEffect(() => {
    if (isSpin) {
      setTimeout(() => {
        setIsSpin(false);
        if (store?.get("user")?.userName != null) {
          navigate("/settings/account");
        }
      }, 2000);
    }
  }, [isSpin]);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <main className="bg-slate-200">
        <div className="relative md:flex pt-4 h-screen overflow-y-auto items-center justify-center">
          {/* Content */}
          <div className="md:w-1/2">
            <div className="min-h-screen h-full flex flex-col after:flex-1">
              {/* Header */}
              <div className="max-w-sm mx-auto px-4 py-8">
                <h1 className="text-3xl text-slate-800 font-bold mb-6">Ajouter un Compte ✨</h1>
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Nom d'utilisateur
                    </label>
                    <input
                      id="email"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      value={userName}
                      onInvalid={(e) => e.target.setCustomValidity("ce champ est obligatoire")}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                        setWrongUserName(false);
                      }}
                      className="form-input w-full"
                      type="text"
                      required
                    />
                  </div>
                  {wrongUserName && <span className="m-1 text-xs text-red-400">Utilisateur existe déja</span>}
                  <div>
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
                      onInvalid={(e) => e.target.setCustomValidity("ce champ est obligatoire")}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                        setWrongPassword(false);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                      Confirmer le mot de passe
                    </label>
                    <input
                      id="password"
                      onChange={(e) => {
                        setCPassword(e.target.value);
                      }}
                      onInvalid={(e) => e.target.setCustomValidity("ce champ est obligatoire")}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                        setWrongPassword(false);
                      }}
                      value={cpassword}
                      className="form-input w-full"
                      type="password"
                      required
                    />
                  </div>
                  {wrongPassword && <span className="m-1 text-xs text-red-400">Mot de passe incorrecte</span>}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                      Code Pin
                    </label>
                    <input
                      id="password"
                      onChange={(e) => {
                        setPin(e.target.value);
                      }}
                      onInvalid={(e) => e.target.setCustomValidity("ce champ est obligatoire")}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                        setWrongPin(false);
                      }}
                      value={pin}
                      className="form-input w-full"
                      type="password"
                      required
                    />
                  </div>
                  {wrongPin && <span className="m-1 text-xs text-red-400">Code Pin incorrecte</span>}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <div className="flex items-center">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          setChecked(e.target.checked);
                        }}
                        value={store?.get("reset")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-600">
                        Administrateur
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      switch (true) {
                        case users.find((user) => user.userName === userName) !== undefined:
                          setWrongUserName(true);
                          break;
                        case password != cpassword:
                          setWrongPassword(true);
                          break;
                        case pin != store.get("pin"):
                          setWrongPin(true);
                          break;
                        default:
                          store?.set("activity", [
                            ...store?.get("activity"),
                            {
                              date: new Date(),
                              page: "Inscription",
                              action: "ajouter",
                              item: { name: userName },
                              title: "Nouveau Compte Ajouter",
                              user: store?.get("user")?.userName,
                              role: store?.get("user")?.isAdmin ? "Administrateur" : "Employée",
                            },
                          ]);
                          setIsSpin(true);
                          users.push({ userName, password, isAdmin: checked, caisse: 1, pages: ["/products", "/provider", "/customers", "/sell", "/buy", "/caisse", "/facture", "/bonAchat"] });
                          store?.set("users", users);
                          //store?.set("user", { userName, password, isAdmin: checked, pages: ["vente", "achat", "product", "customer", "provider", "caisse", "facture", "bonAchat"] });
                          break;
                      }
                    }}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
                    {isSpin && (
                      <svg aria-hidden="true" className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#fff"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    Inscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
