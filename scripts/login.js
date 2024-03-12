const btn = document.getElementById("btn");
const url = '../users/users.json';

// Verificacion de los Datos
const checkData = (name, pass, users) => {

    let result = "";

    for (let i=0; i< users.length; i++) {
        if ( (users[i].name === name) && (users[i].pass === pass) ) {
            result = users[i].doc;
            break;
        }
    }

    return result;

};

// Solicitud de los datos
const checkInfo = async (name, pass) => {

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        const checkedData = checkData(name, pass, data.users);
        if (checkedData !== "") {
            localStorage.setItem("User", checkedData);
            window.location.href = '../pages/user.html';
        } else {
            alert("Datos Incorrectos");
        }
    }).catch(error => console.log(error));

};

// Disparador del Evento Click
btn.addEventListener('click', e => {

    e.preventDefault();

    const form = document.forms;
    const nameUser = form[0][0].value;
    const passUser = Number.parseInt(form[0][1].value);

    checkInfo(nameUser,passUser);


});