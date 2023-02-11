import React from "react";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../../../../contexts/Store";

export default function ClasseGridStudents(props) {
  const theme = useStore((state) => state.theme);
  const treeViewTemplate = (props) => (
    <div className={`${theme.text} `}>
      <p
        className={`px-2 m-0 rounded-3xl  
       ${props?.amount > 0 && props?.deposit === 0 && "bg-rose-100 text-rose-500"}
       ${props?.amount > 0 && props?.deposit === props?.amount && "bg-emerald-100 text-emerald-600 "}
       ${props?.amount > 0 && props?.deposit < props?.amount && "bg-amber-100 text-amber-600"}   
       `}>
        {props.name}
      </p>
    </div>
  );

  const hierarchicalData = [
    {
      id: "01",
      name: "Élèves",
      subChild:
        props.students != null
          ? props.students.map((student, index) => {
              return { name: student.name, id: index, amount: student.amount, deposit: student.deposit };
            })
          : useStore.getState().selectedClasses.students.map((student, index) => {
              return { name: student.name, id: index, amount: student.amount, deposit: student.deposit };
            }),
    },
  ];
  const dataSource = { dataSource: hierarchicalData, id: "id", text: "name", child: "subChild" };
  return <TreeViewComponent name="students" id="students" fields={dataSource} nodeTemplate={treeViewTemplate}></TreeViewComponent>;
}
