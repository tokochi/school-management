import { useStore, loadClasses, loadAttendances } from "../../contexts/Store";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useState, useEffect } from "react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import SchedularName from './../table/templates/schedular/SchedularName';
import React from "react";
import ClasseAvatar from './../avatar/ClasseAvatar';




   






// ******** Get Students List  ********
loadClasses();

export default function EditorSchedule(props) {
const ownerDate = [
  { text: "Salle 01", id: 1, color: "#ea7a57", capacity: 20, type: "Conference" },
  { text: "Salle 02", id: 2, color: "#7fa900", capacity: 7, type: "Cabin" },
  { text: "Salle 03", id: 3, color: "#5978ee", capacity: 5, type: "Cabin" },
  { text: "Salle 04", id: 4, color: "#fec200", capacity: 15, type: "Conference" },
];
    const setRecurrObject = useStore((state) => state.setRecurrObject);
    const [showAttendance, setShowAttendance] = useState(false);
    
    const initClasse = {
        name: "",
        sessions: 4,
        students: [],
        currentSession: 0,
        payment: "",
    };

    const classesData = useStore((state) => state.classes);
    // const [startTime, setTimeStart] = useState(props.StartTime || new Date() );
    // const [endTime, setTimeEnd] = useState(props.EndTime || new Date());
    // const [recurrenceRule, setRecurence] = useState("FREQ=WEEKLY;BYDAY=SA;INTERVAL=1;COUNT=4");
    // const [categoryColor, setColor] = useState("#194fcf");
    // const [subject, setSubject] = useState("");
    // const [description, setDescription] = useState("");
    // const [id, setID] = useState(1);
    // const [selectedClasse, setSelectedClasse] = useState(initClasse);
    const attendanceGridName = () => (
      <div className="flex items-center gap-2">
        <ClasseAvatar moduleName={selectedClasse.name || ""} width="40px" />
        <div className="">
          <p className="font-medium">{selectedClasse.name || ""}</p>
          <p className="text-xs">{`Élèves: ${selectedClasse.students.length || 0}`}</p>
        </div>
      </div>
    );
;
 

//   useEffect(() => {
//     useStore.setState({
//       selectedEvent: {
//         description,
//         endTime,
//         id,
//         recurrenceRule,
//         startTime,
//         subject,
//         categoryColor,
//       },
//     });
//   }, [selectedClasse, startTime, recurrenceRule, categoryColor]);

  return props !== undefined && Object.keys(props).length > 0 ? (
    <div className="p-2">
      <div id="classe">
        <div className="border-1 mx-8 px-4  border-gray-300 rounded-lg flex justify-center w-[400px]">
          <DropDownListComponent
            id="Subject"
            name="Subject"
            data-name="Subject"
            className="e-field"
            itemTemplate={attendanceGridName}
            valueTemplate={attendanceGridName}
            value={props.Subject || ""}
            dataSource={classesData}
            width="400px"
            floatLabelType="Always"
            popupHeight="400px"
            popupWidth="300px"
            fields={{ value: "name", text: "name", groupBy: "module" }}
            placeholder="Sélection une classe"></DropDownListComponent>
        </div>

        <div className="mt-2 px-4 flex gap-3 justify-center items-center text-lg">
          De:{" "}
          <div className="border-1 mt-2 px-2 border-gray-300 rounded-lg">
            <DateTimePickerComponent
              id="StartTime"
              name="StartTime"
              data-name="StartTime"
              className="e-field"
              value={new Date(props.startTime || props.StartTime)}
              width="180px"
              placeholder="Date"
              ShowClearButton={false}
              format="dd MMMM - HH:mm"
              floatLabelType="Auto"></DateTimePickerComponent>
          </div>
          à:
          <div className="border-1 mt-2 px-2 border-gray-300 rounded-lg">
            <DateTimePickerComponent
              id="EndTime"
              name="EndTime"
              data-name="EndTime"
              className="e-field"
              value={endTime}
              change={(e) => setTimeEnd(e.value)}
              width="180px"
              placeholder="Date"
              ShowClearButton={false}
              format="dd MMMM - HH:mm"
              floatLabelType="Auto"></DateTimePickerComponent>
          </div>
        </div>
        <div className="mt-2 px-8  gap-3 justify-center items-center text-lg">
          Choisir une couleur
          <div className="border-1 mt-2 px-2 border-gray-300 rounded-lg">
            <ColorPickerComponent id="color-picker" value={categoryColor} change={(r) => setColor(r.value)}></ColorPickerComponent>
          </div>
          <div className="border-1 mt-2 p-4 border-gray-300 rounded-lg">
            <RecurrenceEditorComponent id="recurrenceRule" popupWidth="300px" value={recurrenceRule} change={(r) => setRecurence(r.value)}></RecurrenceEditorComponent>
          </div>
        </div>
        <TextBoxComponent id="description" name="description" value={description} multiline change={(e) => setDescription(e.value)} placeholder="Commentaire" floatLabelType="Auto"></TextBoxComponent>
        <div className="mt-4">
          <CheckBoxComponent
            label="List de Présance"
            value={showAttendance}
            checked={false}
            change={() => {
              setShowAttendance(!showAttendance);
            }}
          />
        </div>
        {showAttendance && (
          <div>
            <hr className="my-2" />
            <div className="font-base text-xl text-gray-600 mt-3">
              Séance {selectedClasse.currentSession + 1}/{selectedClasse.sessions}:
            </div>
            <div className="ml-6">
              <div className="text-base text-gray-600 font-medium flex  mt-4 pl-4">
                <p className="mr-[50px]">#</p>
                <p className="mr-[190px]">Élèves</p>
                <p>Présent</p>
              </div>
              <div className="mt-2 pl-4 max-h-[250px] overflow-auto overflow-x-hidden">
                <table className="text-gray-600  text-base font-thin min-w-[300px] text-left  ">
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td className="p-2 text-left w-[50px] border-b-2 border-zinc-400">{index + 1}</td>
                        <td className="p-2 text-left w-[230px] border-b-2 border-zinc-400">{student.name}</td>
                        <td className="p-2 text-left w-8 border-b-2 border-zinc-400">
                          <SwitchComponent id="checked" value={student.present} cssClass="custom-iOS" change={(e) => handleChange(e, student._id)} checked={student.present} />
                        </td>
                        <td className="p-2 text-left w-8 border-b-2 border-zinc-400">{student.present === true ? <p className="text-green-600">✔</p> : "✘"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );

}
