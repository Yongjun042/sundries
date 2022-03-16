const { app, BrowserWindow, ipcMain, dialog } = require("electron");

const path = require("path");
const fs = require("fs");

let win

//index.html을 새 창으로 엶
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");
};

//app이 로드되면 실행
app.whenReady().then(() => {
  createWindow();

  //맥용
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//윈도우, 리눅스용
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("createAss", (event, args) => {
  dialog
    .showSaveDialog({
      title: "Select the File Path to save",
      defaultPath: `${args.title}.ass`,
      // defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: "Save",
      // Restricting the user to only ass Files.
      filters: [
        {
          name: "ass subtitle",
          extensions: ["ass"],
        },
      ],
      properties: [],
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      console.log(file.canceled);
      if (!file.canceled) {
        console.log(file.filePath.toString());

        // Creating and Writing to the sample.txt file
        fs.writeFile(
          file.filePath.toString(),
          createAss(args.title, args.text, Math.floor(args.minute)),
          function (err) {
            if (err) throw err;
            win.webContents.send("fromMain", "ass saved!");
          }
        );
      }
    })
    .catch((err) => {
      win.webContents.send("createAssResult", err);
    });
});

function createAss(title, text, minute) {
  var ass = `
  [Script Info]
  ScriptType: v4.00+
  Title: ${title}
  [V4+ Styles]
  Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
  Style: Default,Arial,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1
  [Events]
  Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
  `;
  text = text.replace(/(\r\n|\r|\n){2,}/g, "$1\n");
  var trr = text.split("\n");
  var min = minute;
  if (min < 0 || isNaN(min)) {
    min = 0;
  }
  var hh = Math.floor(min / 60);
  var mm = minute % 60;
  var ss = 0;
  trr.forEach(function (item) {
    ass += `Dialogue: 0,${hh}:${mm}:${ss}.00,${hh}:${mm}:${ss}.00,Default,,0,0,0,,${item}\n`;
    ss++;
    if (ss >= 60) {
      mm++;
      ss = 0;
    }
    if (mm >= 60) {
      hh++;
      mm = 0;
    }
  });
  return ass;
}
