const html = document.querySelector("html");

const botaoIniciar = document.querySelector(".app__card-primary-button");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const timerAPP = document.querySelector("#timer");
const imagemAPP = document.querySelector(".app__image");
const titleAPP = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const starpousebt = document.querySelector("#start-pause");
const iniciaroupausarbt = document.querySelector("#start-pause span ");
const iniciaroupausarbticone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const temponatela = document.querySelector("#timer");
const musicafocoinput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audiofinalizacao = new Audio("/sons/beep.mp3");
const audiopausar = new Audio("/sons/pause.mp3");
const audioplay = new Audio("/sons/play.wav");
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

let tempodecorridoemsegundos = 1500;
let = intervaloid = null;

musica.loop = true;
musicafocoinput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempodecorridoemsegundos = duracaoFoco
  alterarcontexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempodecorridoemsegundos = duracaoDescansoCurto
  alterarcontexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempodecorridoemsegundos = duracaoDescansoLongo
  alterarcontexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarcontexto(contexto) {
  mostrartempo ()
  html.setAttribute("data-contexto", contexto);
  imagemAPP.setAttribute("src", `/imagens/${contexto}.png`);
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  switch (contexto) {
    case "foco":
      titleAPP.innerHTML = `Otimize sua produtividade,<br />
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titleAPP.innerHTML = `Que tal dar uma respirada?<br />
            <strong class="app__title-strong">Faca uma pausa curta.</strong>`;
      break;
    case "descanso-longo":
      titleAPP.innerHTML = `Hora de voltar à superfície.<br />
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}

const contagemregressiva = () => {
  if (tempodecorridoemsegundos <= 0) {
    audiofinalizacao.play();
    alert("tempo finalizado");
    zerar();
    return;
  }
  tempodecorridoemsegundos -= 1;
  mostrartempo();
};
starpousebt.addEventListener("click", iniciaroupausar);

function iniciaroupausar() {
  if (intervaloid) {
    audiopausar.play();
    zerar();
    return;
  }
  audioplay.play();
  intervaloid = setInterval(contagemregressiva, 1000);
  iniciaroupausarbt.textContent = " Pausar ";
  iniciaroupausarbticone.setAttribute("src", `/imagens/pause.png`);
}
function zerar() {
  clearInterval(intervaloid);
  iniciaroupausarbt.textContent = "Começar";
  iniciaroupausarbticone.setAttribute("src", `/imagens/play_arrow.png`);
  intervaloid = null;
}
function mostrartempo() {
  const tempo = new Date(tempodecorridoemsegundos * 1000);
  const tempoformatado = tempo.toLocaleString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  temponatela.innerHTML = `${tempoformatado}`;
}

mostrartempo();
