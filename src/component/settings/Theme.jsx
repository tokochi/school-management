import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import Store from "electron-store";
import React from "react";
import { useStore } from "../../contexts/Store";

export default function Theme() {
  const schema = {
    theme: {
      default: { name: "classic", main: "bg-[#cbd5e1]", side: "bg-[#1e293b]", nav: "bg-white", back: "bg-white", button: "bg-indigo-500", text: "text-slate-500", textXl: "text-slate-800" },
      type: "object",
    },
  };
  const store = new Store({ schema });
  const theme = useStore((state) => state.theme);
  return (
    <div className={`grow overflow-y-auto shadow-lg h-[calc(100vh_-_190px)] w-full rounded-sm  ${theme.back} transition-colors  duration-300 relative  ${theme.textXl}`}>
      {/* Panel body */}
      <div className="p-6 space-y-6 ">
        <h2 className={`text-2xl ${theme.textXl} font-bold mb-5`}>Apparence</h2>

        {/* General */}
        <section>
          <h3 className="text-xl leading-snug font-bold mb-1">Thème</h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="flex  items-center gap-6">
                {/* <div className="text-slate-800 font-semibold">Actuelle:</div> */}
                <RadioButtonComponent
                  // label="Claire"
                  name="gender"
                  change={(e) => {
                    useStore.setState((state) => ({
                      theme: {
                        name: "classic",
                        side: "bg-[#1e293b]",
                        nav: "bg-white",
                        main: "bg-[#cbd5e1]",
                        back: "bg-white",
                        button: "bg-indigo-500",
                        text: "text-slate-500",
                        textXl: "text-slate-800",
                      },
                    }));
                    store.set("theme", {
                      name: "classic",
                      side: "bg-[#1e293b]",
                      nav: "bg-white",
                      main: "bg-[#cbd5e1]",
                      back: "bg-white",
                      button: "bg-indigo-500",
                      text: "text-slate-500",
                      textXl: "text-slate-800",
                    });
                    //  window.location.reload();
                  }}
                  value="classic"
                  checked={theme.name === "classic" ? true : false}></RadioButtonComponent>
                <label id="name" className={` ${theme.text} mt-6`}>
                  Claire
                </label>
                <RadioButtonComponent
                  // label="Sombre"
                  name="gender"
                  change={(e) => {
                    useStore.setState((state) => ({
                      theme: {
                        name: "dark",
                        side: "bg-[#1e293b]",
                        nav: "bg-[#2f3136]",
                        main: "bg-[#40444b]",
                        back: "bg-[#292b2f]",
                        button: "bg-indigo-500",
                        text: "text-gray-100",
                        textXl: "text-white",
                      },
                    }));
                    store.set("theme", {
                      name: "dark",
                      side: "bg-[#1e293b]",
                      nav: "bg-[#40444b]",
                      main: "bg-[#565b65]",
                      back: "bg-[#202225]",
                      button: "bg-indigo-500",
                      text: "text-gray-100",
                      textXl: "text-white",
                    });
                    //  window.location.reload();
                  }}
                  value="dark"
                  checked={theme.name === "dark" ? true : false}></RadioButtonComponent>
                <label id="name" className={` ${theme.text} mt-6`}>
                  Sombre
                </label>
                {/* <RadioButtonComponent
                  // label="Personnalisé"
                  name="gender"
                  change={(e) => {
                    useStore.setState((state) => ({
                      theme: { side: "bg-slate-800", nav: "bg-white", main: "bg-[#cbd5e1]", back: "bg-white", button: "bg-indigo-500", text: "text-slate-500", textXl: "text-slate-800" },
                    }));
                    store.set("theme", {
                      name: "customize",
                      side: "bg-slate-800",
                      nav: "bg-white",
                      main: "bg-[#cbd5e1]",
                      back: "bg-white",
                      button: "bg-indigo-500",
                      text: "text-slate-500",
                      textXl: "text-slate-800",
                    });
                  }}
                  value="customize"
                  checked={theme === "customize" ? true : false}></RadioButtonComponent> */}
              </div>
              {/* Right */}
              <div className="flex items-center ml-4"></div>
            </li>
          </ul>
        </section>

        {/* Shares */}
      </div>
    </div>
  );
}
