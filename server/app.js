const express = require("express");
const path = require("path");
const fs = require("fs");
// const { resolve } = require("dns");
// const { rejects } = require("assert");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("../public"));
let pathStatus = __dirname;

// מערך המשתמשים הקיימים
let users = [
  {
    name: "yohay",
    password: "123",
  },
  {
    name: "elyasaf",
    password: "321",
  },
];
//  קריאה גט לשרת להצגת המשתמשים הקיימים
app.get("/username", (req, res) => {
  const user = req.body;
  res.send(users);
});
// יצירת משתמש חדש
app.post("/username", (req, res) => {
  const user = req.body;
  const newUser = {
    name: user.name,
    password: user.password,
  };
  console.log(user);
  users.push(user);
  res.send("created!");
});

app.get("/info/:name", (req, res) => {
  const username = req.params.name;
  const folderPath = path.join(pathStatus, `../server/${username}`);

  fs.stat(folderPath, (err, stats) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve folder info",
        details: err.message,
      });
    }
    res.json(stats);
  });
});
//  קריאה לשרת למשתמש  להצגת התוכן התיקייה

app.get("/showfolder/:name", (req, res) => {
  const username = req.params.name;
  const filePath = path.join(pathStatus, `../server/${username}`);
  console.log(filePath);
  fs.readdir(filePath, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to read directory", details: err.message });
    } else {
      res.send(data);
    }
  });
});

//  קריאה לשרת למשתמש  להצגת התוכן הקובץ
app.get("/showfile/:name/:folder/:file", (req, res) => {
  const { name, folder, file } = req.params;
  const filePath = path.join(pathStatus, `../server/${name}/${folder}/${file}`);
  console.log(filePath);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to read directory", details: err.message });
    }
    res.send(data);
    console.log(data);
  });
});

// פונקציה לשינוי שם הקובץ
app.post("/renamefile/:name/:file", (req, res) => {
  const { name, file } = req.params;
  const { oldName, newName } = req.body;
  console.log(`Old path: ${oldName}`);
  console.log(`New path: ${newName}`);

  const oldPath = path.join(pathStatus, `/${name}/${file}`, oldName);
  const newPath = path.join(pathStatus, `/${name}/${file}`, newName);
  console.log(`Old path: ${oldPath}`);
  console.log(`New path: ${newPath}`);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to rename file", details: err.message });
    }
    res.send("File renamed successfully!");
  });
});

// פונקציה לכניסה לתוך תיקייה והצגת התוכן שלה
app.get("/enter/:folder", (req, res) => {
  const directoryPath = path.join(pathStatus, req.params.folder);
  if (fs.existsSync(directoryPath)) {
    pathStatus = directoryPath;
    res.send(pathStatus);
  } else {
    res.send("no such directory");
  }
});


app.get("/up",(req,res)=>{
  pathStatus=path.dirname(pathStatus);
  res.send(pathStatus);
});


// פונקציה לשינוי שם תיקייה
app.post("/renamefolder/:name/:oldFolder/:newFolder", (req, res) => {
  const { name, oldFolder, newFolder } = req.params;
  const oldPath = path.join(pathStatus, name, oldFolder);
  const newPath = path.join(pathStatus, name, newFolder);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to rename folder", details: err.message });
    }
    res.json(newFolder);
  });
});

// פונקציה לעלות לתיקייה ברמה קודמת
app.get("/up/:name/:folder", (req, res) => {
  const { name, folder } = req.params;
  const currentPath = path.join(pathStatus, `../server/${name}/${folder}`);
  const parentPath = path.dirname(currentPath);

  console.log(`Current path: ${currentPath}`);
  console.log(`Parent path: ${parentPath}`);

  fs.readdir(parentPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to read parent directory",
        details: err.message,
      });
    }
    res.json({ files });
    console.log(`Parent directory content: ${files}`);
  });
});

// פונקציה להעתקת קובץ
app.post("/copy", (req, res) => {
  const { source, destination } = req.body;
  const sourcePath = path.join(pathStatus, source);
  const destinationPath = path.join(pathStatus, destination);
  console.log(`Source path: ${sourcePath}`);
  console.log(`Destination path: ${destinationPath}`);

  // קריאה להעתקת הקובץ
  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to copy file", details: err.message });
    }
    res.send("File copied successfully!");
  });
});

// פונקציה להזזת קובץ
app.post("/move", (req, res) => {
  const { source, destination } = req.body;
  const sourcePath = path.join(pathStatus, source);
  const destinationPath = path.join(pathStatus, destination);
  console.log(`Source path: ${sourcePath}`);
  console.log(`Destination path: ${destinationPath}`);

  // קריאה להזזת הקובץ
  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to move file", details: err.message });
    }
    res.send("File moved successfully!");
  });
});

// פונקציה למחיקת קובץ
app.post("/delete", (req, res) => {
  const { filePath } = req.body;
  const fullPath = path.join(pathStatus, filePath);
  console.log(`Deleting file at path: ${fullPath}`);

  // קריאה למחיקת הקובץ
  fs.unlink(fullPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to delete file", details: err.message });
    }
    res.send("File deleted successfully!");
  });
});

//  הפעלת השרת 3000
app.listen(port, () => {
  console.log("3000 is on");
});
