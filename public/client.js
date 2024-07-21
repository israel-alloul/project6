
// פונקציה להציג מידע INFO
document.querySelector("#info").addEventListener("click", async function (e) {
    e.preventDefault();
    const div = document.querySelector("#file-info");
    const myname = document.querySelector("#input").value;
    console.log("Requesting info for:", myname);
    info();
    async function info() {
      const response = await fetch(`http://localhost:3000/info/${myname}`);
      const data = await response.json();
      div.innerHTML = ''; // לנקות את התוכן הקודם
      const info = document.createElement("pre");
      info.textContent = JSON.stringify(data, null, 2);
      div.appendChild(info);
    }
  });
  

  // פונקציה להציג מידע SHOW
  document.querySelector("#show").addEventListener("click", async function (e) {
    e.preventDefault();
    const div = document.querySelector(".file");
    const myname = document.querySelector("#input").value;
    show();
    async function show() {
      const response = await fetch(`http://localhost:3000/showfolder/${myname}`);
      console.log(response);
      const data = await response.json();
      div.innerHTML = '';
      data.forEach((fileName) => {
        const p = document.createElement("p");
        p.textContent = fileName;
        div.appendChild(p);
      });
    }
  });
  



  document.querySelector("#renameFileButton").addEventListener("click", async function (e) {
    e.preventDefault();
    const Name = document.querySelector("#Name").value;
    const oldFolderName = document.querySelector("#FileName").value;
    const newFolderName = document.querySelector("#newFileName").value;
  
    console.log(Name, oldFolderName, newFolderName);
  
    async function rename() {
      try {
        const response = await fetch(`http://localhost:3000/renamefolder/${Name}/${oldFolderName}/${newFolderName}`, {
          method: 'POST'
        });
        
        const result = await response.json();
        console.log(result);
        document.querySelector("#idh").textContent = JSON.stringify(result, null, 2);
      } catch (error) {
        console.error('Error:', error);
        document.querySelector("#idh").innerHTML = Name;
      }
    }
  
    rename();
  });
  