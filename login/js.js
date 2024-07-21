// document.getElementById('loginForm').addEventListener('submit', async function(e) {
//   e.preventDefault();
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;
//   // מבצע קריאה ל-URL '/username' עם הפרמטרים ב-URL
//   const response = await fetch(`/username?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,{
//     method: 'GET' // שיטת השליחה היא GET
//   });
//   const result = await response.text(); // מקבל את התגובה מהשרת כטקסט
//   console.log(result);
//   if (result === "משתמש נמצא") {
//     window.location.href = "/user-content";
//   } else {
//     alert("משתמש לא נמצא");
//   }
// });
//   document.getElementById('login').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const username = document.getElementById('usernamelogin').value;
//     const password = document.getElementById('passwordlogin').value;
//     const response = await fetch('/username',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name: username, password: password})
//     });
//     const result = await response.text();
//     console.log(result);
//   });