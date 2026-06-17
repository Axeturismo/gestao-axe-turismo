// Splash Screen
setTimeout(() => {
  const splash = document.querySelector(".splash");

  if (splash) {
    splash.style.opacity = "0";

    setTimeout(() => {
      splash.style.display = "none";
    }, 500);
  }
}, 2000);

// Navegação principal
const navItems = document.querySelectorAll(".nav-item");
const screens = document.querySelectorAll(".screen");

function abrirTela(nomeTela) {

  // Menu Mais
  const menu = document.getElementById("moreMenu");
  if (menu) menu.classList.add("hidden");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  const tela = document.getElementById(nomeTela);

  if (tela) {
    tela.classList.add("active");
  }

  document
    .querySelector(`[data-screen="${nomeTela}"]`)
    ?.classList.add("active");
}

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const screen = item.dataset.screen;

    if (screen === "mais") {

      const menu = document.getElementById("moreMenu");

      if (menu) {
        menu.classList.toggle("hidden");
      }

      return;
    }

    abrirTela(screen);

  });

});

// Botões internos
document.querySelectorAll("[data-screen-go]").forEach(botao => {

  botao.addEventListener("click", () => {

    const destino = botao.dataset.screenGo;

    abrirTela(destino);

  });

});

// ============================
// ALERTA DE PRÓXIMA OPERAÇÃO
// ============================

const alertaOperacao = document.querySelector(".alert-card");

if (alertaOperacao) {

  const existeOperacao = false;

  if (!existeOperacao) {

    alertaOperacao.style.display = "none";

  }

}

// ============================
// PASSEIOS
// ============================

let passeios = [];

window.adicionarPasseio = function() {

  const roteiro = prompt(
    "Digite o nome do passeio:"
  );

  if (!roteiro) return;

  passeios.push({
    nome: roteiro
  });

  atualizarPasseios();

};

function atualizarPasseios() {

  const container =
    document.getElementById("listaPasseios");

  if (!container) return;

  container.innerHTML = "";

  passeios.forEach((passeio, index) => {

    container.innerHTML += `
      <div class="item-card">
        <strong>${passeio.nome}</strong>

        <button
          onclick="removerPasseio(${index})"
          class="mini-delete"
        >
          ✖
        </button>
      </div>
    `;

  });

}

window.removerPasseio = function(index) {

  passeios.splice(index, 1);

  atualizarPasseios();

};

// ============================
// TRANSLADOS
// ============================

let translados = [];

window.adicionarTranslado = function() {

  const translado = prompt(
    "Digite o translado:"
  );

  if (!translado) return;

  translados.push({
    nome: translado
  });

  atualizarTranslados();

};

function atualizarTranslados() {

  const container =
    document.getElementById("listaTranslados");

  if (!container) return;

  container.innerHTML = "";

  translados.forEach((item, index) => {

    container.innerHTML += `
      <div class="item-card">
        <strong>${item.nome}</strong>

        <button
          onclick="removerTranslado(${index})"
          class="mini-delete"
        >
          ✖
        </button>
      </div>
    `;

  });

}

window.removerTranslado = function(index) {

  translados.splice(index, 1);

  atualizarTranslados();

};

// ============================
// PRÉVIA VOUCHER
// ============================

window.visualizarVoucher = function() {

  const nome =
    document.getElementById("clienteNome")
      ?.value || "Sem nome";

  const passageiros =
    document.getElementById("totalPassageiros")
      ?.value || "0";

  let listaPasseios = "";

  passeios.forEach(item => {

    listaPasseios += `• ${item.nome}\n`;

  });

  let listaTranslados = "";

  translados.forEach(item => {

    listaTranslados += `• ${item.nome}\n`;

  });

  alert(
`
========================

PRÉVIA DO VOUCHER

========================

Cliente:
${nome}

Passageiros:
${passageiros}

Passeios:
${listaPasseios || "Nenhum"}

Translados:
${listaTranslados || "Nenhum"}

========================
`
  );

};

// ============================
// FORM VOUCHER
// ============================

const voucherForm =
  document.getElementById("voucherForm");

if (voucherForm) {

  voucherForm.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();

      alert(
        "Voucher salvo com sucesso!"
      );

    }
  );

      }
