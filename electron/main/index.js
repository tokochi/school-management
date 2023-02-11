import { app, BrowserWindow, ipcMain, shell, webFrame } from "electron";
import Store from "electron-store";
import { writeFile, readFile } from "fs";
import { release, tmpdir } from "os";
import { join } from "path";
const jfe = require("json-file-encrypt");
const si = require("systeminformation");
const mongoose = require("mongoose");

// readFile(join(__dirname, "..", "..", "..","..", "/bin.json"), "utf8", async (err, data) => {
//   if (err) {
//    process.exit(0);
//   }
//   let key1 = new jfe.encryptor("tokochi");
//   const cpuData = await si.cpu();
//   const systemData = await si.system();
//   const networkData = await si.networkInterfaces();
//   let encrypted = key1.encrypt(JSON.stringify([networkData[0].mac, cpuData.manufacturer, cpuData.brand, systemData.manufacturer, systemData.model, systemData.uuid]));
//   if (key1.decrypt(data) === "tokochi20101990") {
//     writeFile(join(__dirname, "..", "..", "..", "..", "/bin.json"), encrypted, (err, data) => {
//       if (err) {
// process.exit(0);
//       }
//     });
//   } else {
//     if (key1.decrypt(data) !== JSON.stringify([networkData[0].mac, cpuData.manufacturer, cpuData.brand, systemData.manufacturer, systemData.model, systemData.uuid]) || data == null) {
//       process.exit(0);
//     }
//   }
// });

// // *********** MongoDB onnection **********
mongoose
  .connect("mongodb://localhost/arwa")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("cannot connect to MongoDB", err));
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

// *********** Schema **********
const studentSchema = new mongoose.Schema({
  id: "number",
  name: "string",
  email: "string",
  facebook: "string",
  school: "string",
  address: "string",
  level: "string",
  phone: "string",
  notification: "boolean",
  lastTime: { type: Date },
  birthdate: "date",
  date: { type: Date, default: Date.now },
  startAt: { type: Date },
  gender: "string",
  comment: "string",
  credit: "number",
  avance: [{ date: { type: Date }, amount: "number", credit: "number", studentName: "string", studentId: mongoose.Schema.ObjectId }],
  membership: [
    {
      index: "number",
      name: "string",
      gender: "string",
      id: mongoose.Schema.ObjectId,
      module: "string",
      level: "string",
      type: { type: String },
      amount: "number",
      deposit: "number",
      sessions: "number",
      phone:"string",
      time: "string",
      currentSession: "number",
      absenceSession: "number",
      rebate: "number",
      parent: "string",
      payment: "number",
      date: { type: Date },
      expired: "boolean",
    },
  ],
  attendance: [
    {
      attendance: mongoose.Schema.ObjectId,
      classe: mongoose.Schema.ObjectId,
      absenceSession: "number",
      sessions: "number",
      name: "string",
      currentSession: "number",
      absenceSession: "number",
      time: { type: Date },
    },
  ],
  paid: "boolean",
  remark: "array",
  expired: "boolean",
  present: "boolean",
  status: "boolean",
});

const teacherSchema = new mongoose.Schema({
  id: "number",
  name: "string",
  email: "string",
  facebook: "string",
  school: "string",
  address: "string",
  degree: "string",
  modules: "array",
  levels: "array",
  phone: "string",
  birthdate: "date",
  comment: "string",
  notification: "boolean",
  lastTime: { type: Date },
  date: { type: Date, default: Date.now },
  startAt: { type: Date },
  gender: "string",
  remark: "array",
  availableSold: "number",
  pendingSold: "number",
  status: "boolean",
});

const depenseSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  description: "string",
  concerned: "string",
  data: {},
  type: "string",
  index: "number",
  amount: "number",
  comment: "string",
});

const eventSchema = new mongoose.Schema({
  Description: "string",
  EndTime: { type: Date },
  Id: "number",
  RecurrenceRule: "string",
  StartTime: { type: Date },
  Subject: "string",
  CategoryColor: "string",
  RecurrenceException: "string",
  RecurrenceID: "number",
  classe: mongoose.Schema.ObjectId,
  resourceID: "number",
});


const classeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: "string",
  module: "string",
  level: "string",
  group: "string",
  type: "string",
  comment: "string",
  sessions: "number",
  currentSession: "number",
  payment: "number",
  students: [
    {
      name: "string",
      paid: "boolean",
      sessions: "number",
      present: "boolean",
      date: { type: Date },
      amount: "number",
      deposit: "number",
      currentSession: "number",
      absenceSession: "number",
      bonusSession: "number",
      gender: "string",
      expired: "boolean",
    },
  ],
  teacher: [],
  status: "boolean",
});

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: "string",
  time: { type: Date },
  presents: "number",
  comment: "string",
  absents: "number",
  students: [
    {
      attendance: mongoose.Schema.ObjectId,
      attendanceName: "string",
      name: "string",
      classe: mongoose.Schema.ObjectId,
      module: "string", 
      present: "boolean",
      currentSession: "number",
      time: { type: Date },
      sessions: "number",
      amount: "number",
      deposit: "number",
    },
  ],
  classe: mongoose.Schema.ObjectId,
  sessions: "number",
  currentSession: "number",
  expiration: "boolean",
});

const Student = mongoose.model("student", studentSchema);
const Teacher = mongoose.model("teacher", teacherSchema);
const Event = mongoose.model("event", eventSchema);
const Classe = mongoose.model("class", classeSchema);
const Attendance = mongoose.model("attendance", attendanceSchema);
const Depense = mongoose.model("depense", depenseSchema);

// ****** New Student *********
ipcMain.on("addStudent", (event, data) => {
  const student = new Student({ ...data, membership: [], attendance: [], status: false, expired: false });
  student
    .save()
    .then((data) => win.webContents.send("refreshGridStudent:add", JSON.stringify(data)))
    .catch((err) => console.log("cannot create student", err));
});
// ****** New Teacher *********
ipcMain.on("addTeacher", (event, data) => {
  const teacher = new Teacher(data);
  teacher
    .save()
    .then((data) => win.webContents.send("refreshGridTeacher:add", JSON.stringify(data)))
    .catch((err) => console.log("cannot create teacher", err));
});
// ****** New Classe *********
ipcMain.on("addClasse", (event, data) => {
  const classe = new Classe({
    ...data,
    get name() {
      return `${this.level} - ${this.module} - ${this.group}`;
    },
    startAt: new Date(),
  });
  classe
    .save()
    .then((data) => win.webContents.send("refreshGridClasse:add", JSON.stringify(data)))
    .catch((err) => console.log("cannot create classe", err));
});
// ****** New Attendance *********
ipcMain.on("addAttendance", (event, data) => {
  const attendance = new Attendance(data);
  attendance
    .save()
    .catch((err) => console.log("cannot create Attendance", err));
  Classe.updateOne(
    { _id: data.classe },
    {
      $inc: { currentSession: 1 },
    }
  )
    .then((data) => win.webContents.send("refreshGridAttendance:add", JSON.stringify(data)))
    .catch((err) => console.log("cannot update Student", err));
  data.students.forEach((student) => {
    Classe.updateOne(
      { _id: data.classe, "students._id": student._id },
      {
        $inc: {
          "students.$[elem].currentSession": 1,
          "students.$[elem].absenceSession": student.present === false && 1,
        },
      },
      { arrayFilters: [{ "elem._id": student._id }] }
    ).catch((err) => console.log("cannot update Student", err));
  });
});
// ****** New Depense *********
ipcMain.on("addDepense", (event, data) => {
  const depense = new Depense(data);
  depense
    .save()
    .then((data) => win.webContents.send("refreshDepense:add", JSON.stringify(data)))
    .catch((err) => console.log("cannot create Depense", err));
});
// ****** New Event *********
ipcMain.on("addEvent", (even, data) => {
  const event = new Event(data);
  event.save().catch((err) => console.log("cannot create Event", err));
  win.webContents.send("refreshEvent:add");
});
// ****** Update *********
ipcMain.on("updateStudent", (event, data) => {
  Student.updateOne({ _id: data._id }, { $set: data })
    .then((data) => win.webContents.send("refreshGridStudent:update", JSON.stringify(data)))
    .catch((err) => console.log("cannot update Student", err));
});
ipcMain.on("updateTeacher", (event, data) => {
  Teacher.updateOne({ _id: data._id }, { $set: data })
    .then((data) => win.webContents.send("refreshGridTeacher:update", JSON.stringify(data)))
    .catch((err) => console.log("cannot update Teacher", err));
});
ipcMain.on("updateClasse", (event, data) => {
  Classe.updateOne(
    { _id: data._id },
    {
      $set: {
        ...data,
        get name() {
          return `${this.level} - ${this.module} - ${this.group}`;
        },
      },
    }
  )
    .then((data) => win.webContents.send("refreshGridClasse:update", JSON.stringify(data)))
    .catch((err) => console.log("cannot update Classe", err));
});
ipcMain.on("updateAttendance", (event, data) => {
  Attendance.updateOne({ _id: data._id }, { $set: data })
    .then((data) => win.webContents.send("refreshGridAttendance:update", JSON.stringify(data)))
    .catch((err) => console.log("cannot update Attendance", err));
  data.students.forEach((student) => {
    Classe.updateOne(
      { _id: data.classe, "students._id": student._id },
      {
        $inc: {
          "students.$[elem].absenceSession": student.present === false && 1,
        },
      },
      { arrayFilters: [{ "elem._id": student._id }] }
    ).catch((err) => console.log("cannot update Student", err));
  });
});
ipcMain.on("updateDepense", (event, data) => {
  Depense.updateOne({ _id: data._id }, { $set: data }).catch((err) => console.log("cannot update Depense", err));
  win.webContents.send("refreshGridDepense:update");
});
ipcMain.on("updateEvent", (even, data) => {
  Event.updateOne(
    { Id: data.Id },
    {
      $set: {
        Description: data.Description,
        EndTime: data.EndTime,
        Id: data.Id,
        RecurrenceRule: data.RecurrenceRule,
        StartTime: data.StartTime,
        Subject: data.Subject,
        CategoryColor: data.CategoryColor,
        RecurrenceException: data.RecurrenceException,
        RecurrenceID: data.RecurrenceID,
        classe: data.classe,
        resourceID: data.resourceID,
      },
    }
  ).catch((err) => console.log("cannot update Event", err));
  win.webContents.send("refreshEvent:update");
});
// ****** Delete *********
ipcMain.on("deleteStudent", (event, data) => {
  Student.deleteOne({ _id: data._id })
    .then((data) => win.webContents.send("refreshGridStudent:delete", JSON.stringify(data)))
    .catch((err) => console.log("cannot delete Student", err));
});
ipcMain.on("deleteTeacher", (event, data) => {
  Teacher.deleteOne({ _id: data._id }).catch((err) => console.log("cannot delete Teacher", err));
  win.webContents.send("refreshGridTeacher:delete");
});
ipcMain.on("deleteClasse", (event, data) => {
  Classe.deleteOne({ _id: data._id }).catch((err) => console.log("cannot delete Classe", err));
  win.webContents.send("refreshGridClasse:delete");
});
ipcMain.on("deleteAttendance", (event, data) => {
  Attendance.deleteOne({ _id: data._id }).catch((err) => console.log("cannot delete Attendance", err));
  win.webContents.send("refreshGridAttendance:delete");
});
ipcMain.on("deleteEvent", (event, data) => {
  Event.deleteOne({ _id: data._id }).catch((err) => console.log("cannot delete Event", err));
  win.webContents.send("refreshGridEvent:delete");
});
ipcMain.on("deleteDepense", (event, data) => {
  Depense.deleteOne({ _id: data._id }).catch((err) => console.log("cannot delete Depense", err));
  win.webContents.send("refreshGridDepense:delete");
});
// ****** Get All Data *********
ipcMain.on("studentList:load", () => {
  Student.find()
    .then((List) => win.webContents.send("studentList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get Student List", err));
});
ipcMain.on("teacherList:load", () => {
  Teacher.find()
    .then((List) => win.webContents.send("teacherList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get Teacher List", err));
});
ipcMain.on("classeList:load", () => {
  Classe.find()
    .then((List) => win.webContents.send("classeList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get Classe List", err));
});
ipcMain.on("attendanceList:load", () => {
  Attendance.find()
    .then((List) => win.webContents.send("attendanceList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get attendance List", err));
});
ipcMain.on("depenseList:load", () => {
  Depense.find()
    .then((List) => win.webContents.send("depenseList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get Depense List", err));
});
ipcMain.on("eventList:load", () => {
  Event.find()
    .then((List) => win.webContents.send("eventList:get", JSON.stringify(List)))
    .catch((err) => console.log("cannot get Event List", err));
});
// ****** Get one Item Data *********
ipcMain.on("studentItem:load", () => {
  Student.findOne({ _id: data._id })
    .then((Item) => win.webContents.send("studentItem:get", JSON.stringify(Item)))
    .catch((err) => console.log("cannot get Student Item", err));
});
ipcMain.on("teacherItem:load", () => {
  Teacher.findOne({ _id: data._id })
    .then((Item) => win.webContents.send("teacherItem:get", JSON.stringify(Item)))
    .catch((err) => console.log("cannot get Teacher Item", err));
});
ipcMain.on("classeItem:load", () => {
  Classe.findOne({ _id: data._id })
    .then((Item) => win.webContents.send("classeItem:get", JSON.stringify(Item)))
    .catch((err) => console.log("cannot get Classe Item", err));
});
ipcMain.on("attendanceItem:load", () => {
  Attendance.findOne({ _id: data._id })
    .then((Item) => win.webContents.send("attendanceItem:get", JSON.stringify(Item)))
    .catch((err) => console.log("cannot get attendance Item", err));
});
ipcMain.on("backupData", async (event, data) => {
  Promise.all([,]);
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  Student.insertMany(data.Students)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Student.insertMany", err));
  Teacher.insertMany(data.Teachers)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Teacher.insertMany", err));
  Classe.insertMany(data.Classes)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Classe.insertMany", err));
  Attendance.insertMany(data.Attendances)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Attendance.insertMany", err));
  Depense.insertMany(data.Depenses)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Depense.insertMany", err));
  Event.insertMany(data.Events)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log("cannot Event.insertMany", err));
});
// ********* Electron App *********************************
Store.initRenderer();
// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const store = new Store();

let win = null;
// Here you can add more preload scripts
const splash = join(__dirname, "../preload/splash.js");
// 🚧 Use ['ENV_NAME'] to avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

async function createWindow() {
  win = new BrowserWindow({
    title: "TokoDev",
    width: 1600,
    height: 900,
    //autoHideMenuBar: true,
    webPreferences: {
      preload: splash,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      spellcheck: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "../../index.html"));
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (store?.get("reset") === true) {
    store?.set("user", {});
    store?.set("isLoggedIn", false);
  }
  // backup
  if ((new Date() - new Date(store?.get("backupTime"))) / 3600000 > 24) {
    Promise.all([Student.find(), Teacher.find(), Classe.find(), Attendance.find(), Depense.find(), Event.find()])
      .then((values) => {
        store?.set("backup", [
          ...store?.get("backup"),
          { date: new Date(), students: values[0], teachers: values[1], classes: values[2], attendances: values[3], depenses: values[4], events: values[5] },
        ]);
        store?.set("backupTime", new Date());
        console.log("backup done");
      })
      .catch((err) => console.log("backup Error", err));
  }

  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.on("zoom-", (event, data) => {
  webFrame.setZoomLevel(data);
  console.log(data);
});
ipcMain.on("reload", (event, data) => {
  win.reload();
  try {
    ToolbarWindow.reload();
  } catch (error) {}
});
ipcMain.on("zoom+", (event, data) => {
  webFrame.setZoomLevel(1);
  console.log(data);
});

const printOptions = {
  silent: true,
  pageSize: { height: 301000, width: 58100 },
  printBackground: false,
  color: true,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Page header",
  footer: "Page footer",
};

// Print To PDF method #1
// ipcMain.on("readyToPrintPDF", (event) => {
//   const pdfPath = join(tmpdir(), "print.pdf");
//   // Use default printing options
//   win.webContents
//     .print({ printSelectionOnly: true,  })
//     .then((data) => {
//       writeFile(pdfPath, data, function (error) {
//         if (error) {
//           throw error;
//         }
//         shell.openExternal("file://" + pdfPath);
//         event.sender.send("wrote-pdf", pdfPath);
//       });
//     })
//     .catch((error) => {
//       throw error;
//     });
// });

// Print To PDF method #2
ipcMain.on("previewComponent", (event, url) => {
  console.log("Print Initiated in Main...");
  let wino = new BrowserWindow({ show: true });

  wino.loadURL(url);

  wino.webContents.on("did-finish-load", () => {
    wino.webContents.print(printOptions, (success, failureReason) => {
      console.log("Print Initiated in Main...");
      if (!success) console.log(failureReason);
    });
  });
  return "shown print dialog";
});
ipcMain.on("previewComponent2", (event, url) => {
  console.log("Print Initiated in Main...");
  let wino = new BrowserWindow({ show: true });

  wino.loadURL(url);

  wino.webContents.on("did-finish-load", () => {
    wino.webContents.print({ ...printOptions, pageSize: "A4" }, (success, failureReason) => {
      console.log("Print Initiated in Main...");
      if (!success) console.log(failureReason);
    });
  });
  return "shown print dialog";
});
//handle preview
// ipcMain.on("previewComponent", (event, url) => {
//   let wino = new BrowserWindow({ title: "Preview", show: true, defaultEncoding: "utf8", autoHideMenuBar: true });
//   wino.loadURL(url);

//   wino.webContents.once("did-finish-load", () => {
//     wino.webContents
//       .printToPDF(printOptions)
//       .then((data) => {
//         let buf = Buffer.from(data);
//         var data = buf.toString("base64");
//         let url = "data:application/pdf;base64," + data;

//         wino.webContents.on("ready-to-show", () => {
//           wino.show();
//           wino.setTitle("Preview");
//         });

//         wino.webContents.on("closed", () => (wino = null));
//         wino.loadURL(url);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//   return "shown preview window";
// });
