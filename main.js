

function keylogger(e){
  const key = e.key,
        keyCode = e.keyCode;

   document.getElementById("key").textContent = key;
   document.getElementById("keyCode").textContent = keyCode;
}
document.addEventListener("keydown",keylogger)
