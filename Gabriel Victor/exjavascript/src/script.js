window.alert("Caso comece sem o calendário, aperte um dos botões que muda o mês.");

const diasElement = document.getElementById("dias");
const mesAnoElement = document.getElementById("mes-ano");
const mesAnteriorBtn = document.getElementById("mes-anterior");
const mesProximoBtn = document.getElementById("mes-proximo");
const inputData1 = document.getElementById("data1");
const inputData2 = document.getElementById("data2");
const resultadoElement = document.getElementById("resultado");

let dataAtual = new Date();
let dataSelecionada1 = null;
let dataSelecionada2 = null;

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function gerarCalendario(mes, ano) {
    diasElement.innerHTML = "";
    mesAnoElement.textContent = `${meses[mes]} ${ano}`;

    const primeiroDiaMes = new Date(ano, mes, 1).getDay(); 
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate(); 

    for (let i = 0; i < primeiroDiaMes; i++) {
        const vazio = document.createElement("div");
        vazio.classList.add("vazio");
        diasElement.appendChild(vazio);
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
        const diaElement = document.createElement("div");
        diaElement.textContent = dia;

        diaElement.addEventListener("click", () => {
            marcarDia1(dia);
        });

        if (dataSelecionada1 && dia === dataSelecionada1.getDate() && mes === dataSelecionada1.getMonth() && ano === dataSelecionada1.getFullYear()) {
            diaElement.classList.add("selecionado");
        }

        if (dataSelecionada1 && dataSelecionada2) {
            const diaAtual = new Date(ano, mes, dia);
            if (diaAtual >= dataSelecionada1 && diaAtual <= dataSelecionada2) {
                diaElement.classList.add("intervalo");
            }
        }

        diasElement.appendChild(diaElement);
    }
}

function marcarDia1(dia) {
    dataSelecionada1 = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dia);
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
}

mesAnteriorBtn.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
});

mesProximoBtn.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
});

inputData1.addEventListener("change", (event) => {
    const novaData = new Date(event.target.value + "T00:00:00");
    if (!isNaN(novaData.getTime())) {
        dataSelecionada1 = new Date(novaData.getFullYear(), novaData.getMonth(), novaData.getDate());
        gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
        verificarIntervalo();
    }
});

inputData2.addEventListener("change", (event) => {
    const novaData = new Date(event.target.value + "T00:00:00");
    if (!isNaN(novaData.getTime())) {
        dataSelecionada2 = new Date(novaData.getFullYear(), novaData.getMonth(), novaData.getDate());
        gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
        verificarIntervalo();
    }
});


function verificarIntervalo() {
    if (dataSelecionada1 && dataSelecionada2) {
        const diffTime = Math.abs(dataSelecionada2 - dataSelecionada1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        resultadoElement.textContent = `Dias entre as datas: ${diffDays}`;
    } else {
        resultadoElement.textContent = "";
    }
}

gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
