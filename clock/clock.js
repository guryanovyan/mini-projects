function updateClcok(){
    const current = new Date();
    const hours = current.getHours().toString().padStart(2, 0);
    const minutes = current.getMinutes().toString().padStart(2, 0);
    const seconds = current.getSeconds().toString().padStart(2, 0);
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById("time").textContent = timeString; 
}

updateClcok();
setInterval(updateClcok, 1000)