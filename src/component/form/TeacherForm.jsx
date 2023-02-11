import TextBox from "../button/TextBox";
import levels from "../../data/levels";
import modules from "../../data/modules";
import degree from "../../data/degree";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function TeacherForm(props) {
  const labelclassName = "p-4 w-[170px] text-sm font-medium";
  return (
    <div className="flex gap-5">
      <table>
        <tbody>
          <tr>
            <td className={labelclassName}>Nom Complet:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="name" width="full" value={props?.name || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Adresse:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="address" width="full" value={props?.address || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Téléphone:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="phone" width="full" value={props?.phone || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Date de naissance:</td>
            <td className="w-[320px]">
              <DatePickerComponent id="birthdate" name="birthdate" value={props.birthdate}  format="dddd MMMM y"></DatePickerComponent>{" "}
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Email:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="email" width="full" value={props?.email || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Facebook:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="facebook" width="full" value={props?.facebook || ""} title="" />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td className={labelclassName}>Date d'inscription:</td>
            <td className="w-[320px]">
              <DatePickerComponent id="startAt" name="startAt" value={props.startAt || new Date()}  format="dddd MMMM y" ></DatePickerComponent>{" "}
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Diplôme d'étude:</td>
            <td className="w-[320px]">
              <TextBox type="dropdown" id="degree" width="full" value={props?.degree || ""} dataSource={degree} fields={{ value: "value", text: "text" }} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>École d'enseignement:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="school" width="full" value={props?.school || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Module d'enseignement:</td>
            <td className="w-[320px]">
              <TextBox
                type="multi"
                id="modules"
                width="full"
                value={props?.modules}
                dataSource={modules}
                popupHeight="400px"
                fields={{ value: "value", text: "text", groupBy: "type" }}
                title=""
              />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Niveau d'enseignement:</td>
            <td className="w-[320px]">
              <TextBox
                type="multi"
                id="levels"
                width="full"
                value={props?.levels}
                dataSource={levels}
                popupHeight="400px"
                fields={{ value: "value", text: "text", groupBy: "type" }}
                title=""
              />
            </td>
          </tr>
          <tr>
            <td className="flex flex-col gap-2 p-2 ">
              <p className="text-gray-400">Civilité</p>
              <RadioButtonComponent
                label="Monsieur"
                name="gender"
                // change={(e) => useStore.setState((state) => ({ selectedTeachers: { ...state.selectedTeachers, gender: e.value } }))}
                value="Monsieur"
                checked={props.gender === "Monsieur" ? true : false}></RadioButtonComponent>
              <RadioButtonComponent
                label="Madame"
                name="gender"
                // change={(e) => useStore.setState((state) => ({ selectedTeachers: { ...state.selectedTeachers, gender: e.value } }))}
                value="Madame"
                checked={props.gender === "Madame" ? true : false}></RadioButtonComponent>
              <RadioButtonComponent
                label="Mademoiselle"
                name="gender"
                // change={(e) => useStore.setState((state) => ({ selectedTeachers: { ...state.selectedTeachers, gender: e.value } }))}
                value="Mademoiselle"
                checked={props.gender === "Mademoiselle" ? true : false}></RadioButtonComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
