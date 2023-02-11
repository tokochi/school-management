import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { CheckBoxSelection, ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Reorder, Resize, Selection, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import { useEffect, useState } from "react";
import { useStore } from "../../contexts/Store";
import levels from "../../data/levels";
import modules from "../../data/modules";
import TextBox from "../button/TextBox";
import Paid from "./../table/templates/Paid";
import StudentsGridName from "./../table/templates/students/StudentName";
import Status from "./../table/templates/VendingsStatus";
export default function ClasseForm(props) {

  const studentsGridStatus = (props) => <Status {...props} />;
  const studentsGridName = (props) => <StudentsGridName {...props} />;
  const classeAbsentTemplate = (props) => <p className="text-orange-400">{props?.absenceSession}</p>;
  const classeSessionTemplate = (props) => (
    <p>
      
      {props?.currentSession}/{props?.sessions}
    </p>
  );
  const theme = useStore((state) => state.theme);
  const [module, setCurrentModule] = useState(props?.module || "");
  const [level, setCurrentLevel] = useState(props?.level || "");
  const [type, setCurrentType] = useState(props?.type || "");
  const [group, setCurrentGroupe] = useState(props?.group || "");
  const [students, setCurrentStudents] = useState(props?.students || []);
  console.log("🚀 ~ file: ClasseForm.jsx ~ line 29 ~ ClasseForm ~ students", students)
  const [sessions, setCurrentSessions] = useState(props?.sessions || 4);
  const [currentSession, setCurrentSession] = useState(props?.currentSession || 0);
  const [bonusSession, setCurrentBonusSessions] = useState(props?.bonusSession || 0);
  const [payment, setCurrentPayment] = useState(props?.payment || 2000);
  const [teacher, setTeacher] = useState(props?.teacher || "");
  const [paymentType, setPaymentType] = useState(props?.paymentType || "Fin des sessions");
  const [filter, setFilter] = useState(false);
  const [filterModule, setFilterModule] = useState(false);
  const classesList = useStore((state) => state.classes)
  const groupeList = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"].filter((g) => !classesList.some((classe) => classe.name === `${level} - ${module} - ${props?.group !== g &&g}`));
  const studentsList = useStore((state) => state.students)
    .filter((student) => (filter ? student.level === level : student))
    .filter((student) => student.membership.some((membership) => membership.module===module));

  const teacherList =  useStore((state) => state.teachers).filter((teacher) => (filterModule ? teacher.modules.some((modle) => modle === module) : teacher));
  let gridd;

  useEffect(() => {
    useStore.setState((state) => ({
      selectedClasses: {
        ...state.selectedClasses,
        ...(props?.isAdd === false && { _id: props?._id }),
        module,
        level,
        group,
        type,
        sessions,
        currentSession,
        bonusSession,
        teacher,
        payment,
        paymentType,
      },
    }));
  }, [module, level, group, sessions, bonusSession, teacher, type, payment, paymentType]);

  function actionComplete(args) {
    useStore.setState((state) => ({ selectedClasses: { ...state.selectedClasses, students: gridd.getCurrentViewRecords() } }));

    if (args.requestType === "save") {
    }
    if (args.requestType === "beginEdit") {
      args.dialog.header = "Modifier le Paiment";
    }
  }

  function handleCurrentSelectedStudents(e) {
    let selectedStudents = useStore.getState().students.filter((student) => e.value.some((currentStudent) => student.name === currentStudent));
    setCurrentStudents(selectedStudents.map(student => { return { name: student.name, gender: student.gender, ...student?.membership?.find((membership) => membership.module === module) } }));
  }

  function dataBound(args) {
    useStore.setState((state) => ({ selectedClasses: { ...state.selectedClasses, students: gridd.getCurrentViewRecords() } }));
  }

  return (
    <div className="flex  justify-center gap-3 p-2 ">
      <div id="teacher" className="">
        <div id="teacherTitle" className="bg-blue-50 shadow-md mb-2  p-2  rounded-3xl text-center font-medium text-lg text-gray-600">
          <p className="">Enseignant</p>
        </div>
        <div id="teacherContainer" className="w-60 p-2 ">
          <div className="ml-4 my-4">
            <CheckBoxComponent
              label="Filtrer par module"
              value={filterModule}
              change={() => {
                setFilterModule(!filterModule);
              }}
            />
          </div>
          <ListBoxComponent
            id="teacher"
            name="teacher"
            value={teacher}
            dataSource={teacherList}
            change={(e) => setTeacher(e.value)}
            height="400px"
            selectionSettings={{
              mode: "Single",
              showCheckbox: true,
            }}
            fields={{
              value: "name",
              text: "name",
              groupBy: "modules",
            }}>
            <Inject services={[CheckBoxSelection]}></Inject>
          </ListBoxComponent>
        </div>
      </div>

      <div id="classe" className="">
        <div id="classeTitle" className="bg-blue-50 shadow-md mb-4  rounded-3xl  text-center font-medium text-lg text-gray-600">
          <div id="cardHeader" className="flex items-center justify-around p-1 gap-2">
            {/* <img src={classe} width="35" /> */}
            <div className="">
              <div className="text-lg text-gray-500 text-center font-thin mx-2 ">
                <span className="font-medium text-lg text-gray-600"> Classe:</span> {`${module}-${level}-${group}`}
              </div>
            </div>
          </div>
        </div>

        <div id="classeContainer" className=" px-2 ">
          <div className="flex items-center border-1 mt-2 px-2 border-gray-300 rounded-lg gap-2">
            <TextBox
              type="dropdown"
              id="module"
              name="module"
              value={module}
              dataSource={modules}
              onChange={(e) => setCurrentModule(e.value)}
              width="w-[200px]"
              popupHeight="400px"
              fields={{ value: "value", text: "text", groupBy: "type" }}
              title="Module"
            />
            <TextBox
              type="dropdown"
              id="level"
              name="level"
              value={level}
              dataSource={levels}
              onChange={(e) => setCurrentLevel(e.value)}
              width="w-[200px]"
              popupHeight="400px"
              fields={{ value: "value", text: "text", groupBy: "type" }}
              title="Niveau"
            />
            <TextBox
              type="dropdown"
              value={type}
              dataSource={["Cours Soutien", "Formation", "Révision générale", "Cours Annuelle", "Cours Vacances", "Cours Développement"]}
              width="w-[160px]"
              onChange={(e) => setCurrentType(e.value)}
              popupHeight="400px"
              title="Type"
            />
              <TextBox
                type="dropdown"
                id="group"
                name="group"
                value={group}
                dataSource={groupeList}
                width="w-[60px]"
                onChange={(e) => setCurrentGroupe(e.value)}
                popupHeight="400px"
                title="Groupe"
              />

          </div>
          <div className=" classeCard  mt-3  ">
            <div id="cardBody" className=" pb-1 h-[320px] overflow-y-auto overflow-x-hidden">
              <GridComponent
                ref={(g) => (gridd = g)}
                width="600px"
                enableHover={false}
                actionComplete={(props) => actionComplete(props)}
                dataSource={students}
                dataBound={dataBound}
                allowResizing
                locale="fr-BE">
                <ColumnsDirective>
                  <ColumnDirective field="studentName" headerText="Nom" textAlign="center" headerTextAlign="center" width="100" template={studentsGridName} />
                  <ColumnDirective field="date" headerText="Abonné le" textAlign="center" headerTextAlign="center" type="datetime" format="dd/MM/yyyy" width="60" />
                  <ColumnDirective field="status" headerText="Status" textAlign="center" headerTextAlign="center" width="40" template={studentsGridStatus} />
                  <ColumnDirective field="gender" width="0" />
                  <ColumnDirective
                    field="currentSession"
                    headerText="Séance"
                    editType="numericEdit"
                    type="number"
                    textAlign="center"
                    headerTextAlign="center"
                    width="50"
                    template={classeSessionTemplate}
                  />
                  <ColumnDirective
                    field="absenceSession"
                    headerText="Absence"
                    editType="numericEdit"
                    type="number"
                    textAlign="center"
                    headerTextAlign="center"
                    width="50"
                    template={classeAbsentTemplate}
                  />
                </ColumnsDirective>
                <Inject services={[Resize, Selection, Reorder, Toolbar, Edit, Sort, Filter]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="students" className="">
        <div id="studentsTitle" className="bg-blue-50 shadow-md mb-2   p-2  rounded-3xl text-center font-medium text-lg text-gray-600">
          <p className="">Élèves</p>
        </div>
        <div id="studentsContainer" className="w-60 p-2 ">
          <div className="ml-4 my-4">
            <CheckBoxComponent
              label="Filtrer par niveau"
              value={filter}
              change={() => {
                setFilter(!filter);
              }}
            />
          </div>
          <ListBoxComponent
            enabled={module.length > 0}
            dataSource={studentsList}
            height="400px"
            value={props?.studentsString}
            // id="students"
            // name="students"
            selectionSettings={{
              mode: "Multiple",
              showCheckbox: true,
            }}
            change={(e) => {
              handleCurrentSelectedStudents(e);
            }}
            fields={{
              value: "name",
              text: "name",
              groupBy: "level",
            }}>
            <Inject services={[CheckBoxSelection]}></Inject>
          </ListBoxComponent>
        </div>
      </div>
    </div>
  );
}
