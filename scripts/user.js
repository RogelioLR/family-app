const userName = localStorage.getItem("User");
const url = "../users/" + userName;

const btnOut = document.getElementById("outApp");

btnOut.addEventListener('click', e => {
    localStorage.removeItem("User");
    window.location.href = '../index.html';
});

const getData = async (url) => {
    await fetch(url)
        .then(response => response.json())
        .then(data => printInfo(data))
        .catch(error => console.log(error));
}

getData(url);

const printInfo = data => {
    const title = document.getElementById("userName");
    title.innerHTML = data.user;

    const profilePic = document.getElementById("picProfile");
    const srcImg = '../media/' + data.pic;
    profilePic.setAttribute("src",srcImg);

    const totalInf = document.getElementById("total");
    totalInf.innerHTML = `
        Total: ${data.data.map(({amount}) => amount).reduce((acc,act) => acc+act,0)} MXN
    `;

    const tabla = document.getElementById("tablaInfo");
    let tbody = document.createElement("tbody");

    data.data.map(({id,date,description,amount}) => {
        tbody.innerHTML += `
            <tr>
                <th scope="row">${id}</th>
                <td>${date}</td>
                <td>${description}</td>
                <td>${amount}</td>
            </tr>
        `;
    })

    tabla.appendChild(tbody);
}
