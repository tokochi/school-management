import React, { useState, useEffect } from "react";
import { DialogComponent } from "@syncfusion/ej2-react-popups";

export default function PopupDialog({ header, id, svg, children, width,bg, footer,content, close, ...rest }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    close && setDropdownOpen(false);
  }, [close]);

  return (
    <>
      <button
        className={`btn ${bg} border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600`}
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}>
        {svg}
      </button>
      <DialogComponent
        id={id}
        header={header}
        content={content}
        footerTemplate={footer}
        visible={dropdownOpen}
        showCloseIcon={true}
        closeOnEscape
        width={width}
        open={() => setDropdownOpen(true)}
        close={() => setDropdownOpen(false)}
        {...rest}>
        {children}
      </DialogComponent>
    </>
  );
}
