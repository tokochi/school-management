import Store from "electron-store";
import create from "zustand";
const { ipcRenderer } = require("electron");

const schema = {
  theme: {
    default: { name: "classic", main: "bg-[#cbd5e1]", side: "bg-slate-800", nav: "bg-white", back: "bg-white", button: "bg-indigo-500", text: "text-slate-500", textXl: "text-slate-800" },
    type: "object",
  },
};
const store = new Store({ schema });
export const useStore = create((set) => ({
  isLoggedIn: store?.get("isLoggedIn") ? true : false,
  dropdownOpen: false,
  dropDownObj: {},
  gridStudent: {},
  theme: store?.get("theme"),
  tabObj: {},
  toast: { show: false, title: "", type: "" },
  toCurrency: function (num) {
    let str = "0.00DA";
    if (num != null && !isNaN(num)) {
      str = num?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "DA";
      str = str.replace("DZD", "DA");
      str = str.replace(",", " ");
    }
    return str;
  },
  indexRow: false,
  membership: {
    isEdit: false,
    student: {},
    parent: "",
    module: "",
    type: "",
    level: "",
    amount: 0,
    sessions: 4,
    total: 0,
    rebate: 0,
    deposit: 0,
    payment: 2000,
    selectedStudents: [],
  },

  selectedRevenues: {},
  selectedSettings: {},
  selectedTeachers: {},
  selectedUsers: {},
  selectedDepenses: { data: {} },
  user: {},
  paymentType: "",
  students: [],
  teachers: [],
  events: [],
  classes: [],
  attendances: [],
  depenses: [],
  sum: 0,
  selectedEvent: {},
  selectedClasses: {},
  selectedAttendances: {},
  colWidth: 300,
  setTotalMembership: () =>
    set((state) => ({
      membership: {
        ...state.membership,
        amount: state.membership.selectedStudents.reduce((prevStudent, currStudent) => parseInt(prevStudent) + parseInt(currStudent?.payment), 0) - state.membership.rebate,
        total: state.membership.selectedStudents.reduce((prevStudent, currStudent) => parseInt(prevStudent) + parseInt(currStudent?.payment), 0),
        deposit: state.membership.selectedStudents.reduce((prevStudent, currStudent) => parseInt(prevStudent) + parseInt(currStudent?.deposit), 0) - parseInt(state.membership.rebate),
      },
    })),
  getClasses: () => {
    ipcRenderer.send("classeList:load");
  },
  getEvents: () => {
    ipcRenderer.send("eventList:load");
  },
  getStudents: () => {
    ipcRenderer.send("studentList:load");
  },
  getTeachers: () => {
    ipcRenderer.send("teacherList:load");
  },
  getAttendances: () => {
    ipcRenderer.send("attendanceList:load");
  },
  getDepenses: () => {
    ipcRenderer.send("depenseList:load");
  },
}));
// Romove all isteners
ipcRenderer.eventNames().forEach((n) => {
  ipcRenderer.removeAllListeners(n);
});
// Add new isteners
ipcRenderer.on("classeList:get", (e, res) => {
  useStore.setState({ classes: JSON.parse(res) });
});
ipcRenderer.on("eventList:get", (e, res) => {
  useStore.setState({ events: JSON.parse(res) });
});
ipcRenderer.on("studentList:get", (e, res) => {
  useStore.setState({ students: JSON.parse(res) });

});
ipcRenderer.on("teacherList:get", (e, res) => {
  useStore.setState({ teachers: JSON.parse(res) });
});
ipcRenderer.on("attendanceList:get", (e, res) => {
  useStore.setState({ attendances: JSON.parse(res) });
});
ipcRenderer.on("depenseList:get", (e, res) => {
  useStore.setState({ depenses: JSON.parse(res) });
});
export const loadClasses = () => useStore.getState().getClasses();
export const loadStudents = () => useStore.getState().getStudents();
export const loadTeachers = () => useStore.getState().getTeachers();
export const loadAttendances = () => useStore.getState().getAttendances();
export const loadDepenses = () => useStore.getState().getDepenses();
export const loadEvents = () => useStore.getState().getEvents();
