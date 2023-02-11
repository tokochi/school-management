import { useStore, loadClasses, loadAttendances } from "../../contexts/Store";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useState, useEffect } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import StudentsGridName from "./../table/templates/students/StudentName";
import Localization from "../Localization";
import AttendanceGridName from "../table/templates/attendances/AttendanceGridName";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import TextBox from "../button/TextBox";
// ******** Get Students List  ********
loadClasses();
Localization("attendance");
const attendanceGridName = (selectedClasse) => <AttendanceGridName {...selectedClasse} />;
export default function AttendanceForm(props) {
  const initClasse = {
    name: "",
    sessions: 4,
    students: [],
    currentSession: 0,
    payment: "",
  };
  const theme = useStore((state) => state.theme);
  const classesData = useStore((state) => state.classes);
  const [time, settime] = useState(props.time || new Date());
  const [presentNum, setPresentNum] = useState(0);
  // const [dropdown, setDropdown] = useState();
  const [selectedClasse, setSelectedClasse] = useState(props.isAdd === false ? props : initClasse);

  const [students, setStudents] = useState(selectedClasse.students);
  const handleChange = (e, id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student._id !== id)
          return {
            attendanceName: selectedClasse.name,
            name: student.name,
            _id: student._id,
            time,
            present: student.present,
            ...student,
          };
        return {
          attendanceName: selectedClasse.name,
          _id: student._id,
          name: student.name,
          time,
          present: !student.present,
        };
      })
    );
  };
  useEffect(() => {
    setPresentNum(0);
    students.forEach((student) => {
      if (student.present === true) {
        setPresentNum((oldNum) => oldNum + 1);
      }
    });
  }, [students]);
  useEffect(() => {
    useStore.setState({
      selectedAttendances: {
        ...(props.isAdd === false && { _id: props._id }),
        classe: selectedClasse._id,
        module:selectedClasse.module,
        time,
        name: selectedClasse.name,
        presents: presentNum,
        absents: students.length - presentNum,
        currentSession: props.isAdd === true ? selectedClasse.currentSession + 1 : selectedClasse.currentSession,
        sessions: selectedClasse.sessions,
        students,
      },
    });
  }, [students, presentNum, selectedClasse, time]);
  return (
    <div className={`m-4 p-2 ${theme.text}`}>
      <div id="classe">
        <div id="classeTitle" className="mb-4 bg-blue-50 shadow-md  rounded-3xl  text-center font-medium text-lg text-gray-600">
          <div id="cardHeader" className="flex items-center justify-around p-1 gap-2">
            {/* <img src={classe} width="35" /> */}
            <div className="">
              <div className="text-lg text-gray-500 text-center font-thin mx-2 ">
                <span className="font-medium text-lg text-gray-600"> Classe:</span> {selectedClasse.name}
              </div>
              <p className="text-gray-500 text-xs font-thin ">
                {`Élèves: ${selectedClasse.students.length}/${selectedClasse.students.length}
                | Sessions: ${selectedClasse.currentSession}/${selectedClasse.sessions} 
                | Paiment: ${selectedClasse.payment},00DA`}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden">
          <TextBoxComponent id="present" name="present" value={presentNum}></TextBoxComponent>
          <TextBoxComponent id="absent" name="absent" value={students.length - presentNum}></TextBoxComponent>
          <TextBoxComponent id="currentSession" name="currentSession" value={props.isAdd === true ? selectedClasse.currentSession + 1 : selectedClasse.currentSession}></TextBoxComponent>
          <TextBoxComponent id="sessions" name="sessions" value={selectedClasse.sessions}></TextBoxComponent>
        </div>
        <div className="mt-2 px-4 flex gap-3 justify-center">
          <div className="border-1 mt-2 px-2 border-gray-300 rounded-lg">
            <TextBox
              type="dropdown"
              id="name"
              name="name"
              itemTemplate={attendanceGridName}
              valueTemplate={attendanceGridName}
              value={selectedClasse.name}
              dataSource={classesData}
              onChange={(e) => {
                if (e.itemData != null) {
                  setStudents([]);
                  setSelectedClasse(e.itemData);
                  setStudents(e.itemData.students);
                }
              }}
              width="w-[240px]"
              popupHeight="400px"
              popupWidth="300px"
              fields={{ value: "name", text: "name", groupBy: "module" }}
              title=""
            />
          </div>
          <div className="border-1 mt-2 px-2 border-gray-300 rounded-lg">
            <DateTimePickerComponent
              id="time"
              name="time"
              value={time}
              change={(e) => settime(e.value)}
              width="200px"
              placeholder=""
              ShowClearButton={false}
              format="dd MMMM - HH:mm"></DateTimePickerComponent>
          </div>
        </div>
        <hr className="my-2" />
        <div className={`font-base text-xl  mt-3`}>
          Séance {selectedClasse.currentSession + 1}/{selectedClasse.sessions}:
        </div>
        <div className="ml-6">
          <div className="text-base  font-medium flex  mt-4 pl-4">
            <p className="mr-[50px]">#</p>
            <p className="mr-[190px]">Élèves</p>
            <p>Présent</p>
          </div>
          <div className="mt-2 pl-4 max-h-[350px] overflow-auto overflow-x-hidden">
            <table className=" text-base font-thin min-w-[300px] text-left  ">
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
    </div>
  );
}
