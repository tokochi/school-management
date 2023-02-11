import React from "react";
import { useStore } from "../../contexts/Store";
function Header({ children, title, value, subTitle }) {
  const theme = useStore((state) => state.theme);
  return (
    <main>
      <div className="py-4 pl-6 pr-4 p w-full max-w-9xl mx-auto ">
        <div className="flex justify-between items-center  ">
          <div className="">
            <h1 className={`text-2xl md:text-3xl transition-colors  duration-300 ${theme.textXl} font-bold`}>{title}</h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Header;
