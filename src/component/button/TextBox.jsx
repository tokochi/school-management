import React from "react";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useStore } from "../../contexts/Store";
export default function TextBox({ type, onChange, dataSource, value, id, required, name, title, format,onInput, width,fields, label, ...rest }) {
   const theme = useStore((state) => state.theme);
  const inputClassName = `w-${width} form-input  px-2 py-1  border`;
  const labelNumeric = "inline-flex items-center px-5 py-1 text-sm text-slate-800 bg-gray-200 rounded-r-md border border-l-0 border-gray-300";
  if (type === "text")
    return (
      <div className={`flex ${width} ${theme.name==="classic" && "border-slate-200  border"}  rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
        <TextBoxComponent type="text" id={id} name={id} value={value} input={onInput} change={onChange} placeholder={title} {...rest}></TextBoxComponent>
      </div>
    );
  if (type === "textarea") return <textarea type="text" rows="2" cols="50" id={id} name={id} value={value} onChange={onChange} className={inputClassName} placeholder={title} {...rest} />;
  if (type === "number")
    return (
      <div className={`flex `}>
        <div className={`flex ${width} ${theme.name === "classic" && "border-slate-200  border"} rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
          <NumericTextBoxComponent
            id={id}
            value={value}
            format={format}
            // strictMode
            name={id}
            input={onInput}
            change={onChange}
            placeholder={title}
            floatLabelType="Never"
            {...rest}></NumericTextBoxComponent>
        </div>
        {label?.length > 0 && <span className={labelNumeric}>{label}</span>}
      </div>
    );
    if (type === "textLabel")
      return (
        <div className={`flex `}>
          <div className={`flex ${width} ${theme.name === "classic" && "border-slate-200  border"} rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
            <TextBoxComponent type="text" id={id} name={id} format={format} value={value} input={onInput} change={onChange} placeholder={title} {...rest}></TextBoxComponent>{" "}
          </div>
          {format && <span className={labelNumeric}>{label}</span>}
        </div>
      );
  if (type === "dropdown")
    return (
      <div className={`${theme.name === "classic" && "border-slate-200  border"} ${width}  rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
        <DropDownListComponent
          id={id}
          name={id}
          value={value}
          dataSource={dataSource}
          fields={fields}
          change={onChange}
          floatLabelType="Never"
          popupHeight="200px"
          placeholder={title}
          {...rest}></DropDownListComponent>
      </div>
    );
  if (type === "multi")
    return (
      <div className={`${theme.name === "classic" && "border-slate-200  border"} ${width}  rounded-l hover:border-slate-300 focus:border-indigo-300 shadow-sm`}>
        <MultiSelectComponent
          id={id}
          name={id}
          value={value}
          dataSource={dataSource}
          fields={fields}
          change={onChange}
          floatLabelType="Never"
          popupHeight="200px"
          placeholder={title}
          {...rest}></MultiSelectComponent>
      </div>
    );
}
