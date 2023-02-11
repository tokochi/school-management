import TextBox from "../button/TextBox";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import levels from "../../data/levels";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function StudentForm(props) {
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
              <DatePickerComponent id="birthdate" name="birthdate" value={props.birthdate} format="dddd MMMM y" floatLabelType=""></DatePickerComponent>{" "}
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
              <DatePickerComponent id="startAt" name="startAt" value={props.startAt || new Date()} format="dddd MMMM y"></DatePickerComponent>{" "}
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Niveau Scolaire:</td>
            <td className="w-[320px]">
              <TextBox type="dropdown" id="level" width="full" value={props?.level || ""} dataSource={levels} popupHeight="400px" fields={{ value: "value", text: "text", groupBy: "type" }} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>École:</td>
            <td className="w-[320px]">
              <TextBox type="text" id="school" width="full" value={props?.school || ""} title="" />
            </td>
          </tr>
          <tr>
            <td className={labelclassName}>Commentaire:</td>
            <td className="w-[320px]">
              <TextBox type="text" multiline id="comment" width="full" value={props?.comment || ""} title="" />
            </td>
          </tr>
          <tr >
            <td className={labelclassName}>Genre:</td>
            <td className="w-[320px]">
              <div className="flex  gap-2 ">
                <RadioButtonComponent
                  label="Garçon"
                  name="gender"
                  //change={(e) => useStore.setState((state) => ({ selectedStudents: { ...state.selectedStudents, gender: e.value } }))}
                  value="Garçon"
                  checked={props.gender === "Garçon" ? true : false}></RadioButtonComponent>
                <RadioButtonComponent
                  label="Fille"
                  name="gender"
                  value="Fille"
                  // change={(e) => useStore.setState((state) => ({ selectedStudents: { ...state.selectedStudents, gender: e.value } }))}
                  checked={props.gender === "Fille" ? true : false}></RadioButtonComponent>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
