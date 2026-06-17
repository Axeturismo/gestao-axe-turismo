document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const navButtons = document.querySelectorAll(".nav-item");

  let passeios = [];
  let translados = [];

  function abrirTela(id) {
    screens.forEach(screen => screen.classList.remove("active"));

    const tela = document.getElementById(id);
    if (tela) tela.classList.add("active");

    navButtons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.screen === id) btn.classList.add("active");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tela = btn.dataset.screen;
      abrirTela(tela);
    });
  });

  document.querySelectorAll("[data-screen-go]").forEach(btn => {
    btn.addEventListener("click", () => {
      abrirTela(btn.dataset.screenGo);
    });
  });

  const showPasseioForm = document.getElementById("showPasseioForm");
  const passeioFormBox = document.getElementById("passeioFormBox");
  const confirmPasseio = document.getElementById("confirmPasseio");
  const listaPasseios = document.getElementById("listaPasseios");

  if (showPasseioForm) {
    showPasseioForm.addEventListener("click", () => {
      passeioFormBox.classList.toggle("hidden");
    });
  }

  if (confirmPasseio) {
    confirmPasseio.addEventListener("click", () => {
      const nome = document.getElementById("passeioNome").value;
      const data = document.getElementById("passeioData").value;
      const horario = document.getElementById("passeioHorario").value;
      const passageiros = document.getElementById("passeioPassageiros").value;
      const pagamento = document.getElementById("passeioPagamento").value;
      const detalhes = document.getElementById("passeioDetalhes").value;

      if (!nome) {
        alert("Selecione um roteiro.");
        return;
      }

      passeios.push({ nome, data, horario, passageiros, pagamento, detalhes });
      renderPasseios();
      passeioFormBox.classList.add("hidden");
    });
  }

  function renderPasseios() {
    if (!listaPasseios) return;

    if (passeios.length === 0) {
      listaPasseios.innerHTML = `<p class="muted">Nenhum passeio adicionado ainda.</p>`;
      return;
    }

    listaPasseios.innerHTML = passeios.map((p, index) => `
      <div class="item">
        <strong>${p.nome}</strong>
        <span>Data: ${p.data || "Não informada"}</span>
        <span>Horário: ${p.horario || "Não informado"}</span>
        <span>Passageiros: ${p.passageiros}</span>
        <span>Pagamento: ${p.pagamento}</span>
        <button type="button" class="ghost" onclick="removerPasseio(${index})">Remover</button>
      </div>
    `).join("");
  }

  window.removerPasseio = function(index) {
    passeios.splice(index, 1);
    renderPasseios();
  };

  const showTransladoForm = document.getElementById("showTransladoForm");
  const transladoFormBox = document.getElementById("transladoFormBox");
  const confirmTranslado = document.getElementById("confirmTranslado");
  const listaTranslados = document.getElementById("listaTranslados");

  if (showTransladoForm) {
    showTransladoForm.addEventListener("click", () => {
      transladoFormBox.classList.toggle("hidden");
    });
  }

  if (confirmTranslado) {
    confirmTranslado.addEventListener("click", () => {
      const origem = document.getElementById("transladoOrigem").value;
      const destino = document.getElementById("transladoDestino").value;
      const data = document.getElementById("transladoData").value;
      const horario = document.getElementById("transladoHorario").value;
      const voo = document.getElementById("transladoVoo").value;
      const valor = document.getElementById("transladoValor").value;

      if (!origem || !destino) {
        alert("Informe origem e destino do translado.");
        return;
      }

      translados.push({ origem, destino, data, horario, voo, valor });
      renderTranslados();
      transladoFormBox.classList.add("hidden");
    });
  }

  function renderTranslados() {
    if (!listaTranslados) return;

    if (translados.length === 0) {
      listaTranslados.innerHTML = `<p class="muted">Nenhum translado adicionado ainda.</p>`;
      return;
    }

    listaTranslados.innerHTML = translados.map((t, index) => `
      <div class="item">
        <strong>${t.origem} → ${t.destino}</strong>
        <span>Data: ${t.data || "Não informada"}</span>
        <span>Horário: ${t.horario || "Não informado"}</span>
        <span>Voo: ${t.voo || "Não informado"}</span>
        <span>Valor: R$ ${t.valor || "0,00"}</span>
        <button type="button" class="ghost" onclick="removerTranslado(${index})">Remover</button>
      </div>
    `).join("");
  }

  window.removerTranslado = function(index) {
    translados.splice(index, 1);
    renderTranslados();
  };

  const previewBtn = document.getElementById("previewVoucherBtn");
  const previewModal = document.getElementById("previewModal");
  const voucherPreview = document.getElementById("voucherPreview");
  const closePreview = document.getElementById("closePreview");

  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      const nome = document.getElementById("clienteNome").value || "Não informado";
      const cpf = document.getElementById("clienteCpf").value || "Não informado";
      const contato = document.getElementById("clienteContato").value || "Não informado";
      const passageiros = document.getElementById("totalPassageiros").value || "0";
      const endereco = document.getElementById("clienteEndereco").value || "Não informado";
      const referencia = document.getElementById("clienteReferencia").value || "Não informado";
      const status = document.getElementById("statusPagamento").value;
      const pago = document.getElementById("valorPago").value || "0,00";
      const saldo = document.getElementById("saldoRestante").value || "0,00";
      const obs = document.getElementById("observacoesVoucher").value || "Sem observações";

      voucherPreview.innerHTML = `
        <div class="preview-content">
          <img src="./logo-axe.png" class="preview-logo" alt="Logo Axé">
          <h3>Axé Turismo e Aventura</h3>

          <p><strong>Cliente:</strong> ${nome}</p>
          <p><strong>CPF:</strong> ${cpf}</p>
          <p><strong>Contato:</strong> ${contato}</p>
          <p><strong>Passageiros:</strong> ${passageiros}</p>
          <p><strong>Hospedagem/Endereço:</strong> ${endereco}</p>
          <p><strong>Apartamento/Referência:</strong> ${referencia}</p>

          <hr>

          <h4>Passeios</h4>
          ${
            passeios.length
              ? passeios.map(p => `<p>• ${p.nome} — ${p.data || "sem data"} — ${p.passageiros} passageiro(s)</p>`).join("")
              : "<p>Nenhum passeio adicionado.</p>"
          }

          <h4>Translados</h4>
          ${
            translados.length
              ? translados.map(t => `<p>• ${t.origem} → ${t.destino} — ${t.horario || "sem horário"}</p>`).join("")
              : "<p>Nenhum translado adicionado.</p>"
          }

          <hr>

          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Valor pago:</strong> R$ ${pago}</p>
          <p><strong>Saldo restante:</strong> R$ ${saldo}</p>
          <p><strong>Observações:</strong> ${obs}</p>
        </div>
      `;

      previewModal.classList.remove("hidden");
    });
  }

  if (closePreview) {
    closePreview.addEventListener("click", () => {
      previewModal.classList.add("hidden");
    });
  }

  const voucherForm = document.getElementById("voucherForm");

  if (voucherForm) {
    voucherForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Voucher salvo localmente. Próxima etapa: salvar no Supabase.");
    });
  }

  const operationAlert = document.getElementById("operationAlert");
  const closeOperationAlert = document.getElementById("closeOperationAlert");

  const existeOperacaoAgendada = false;

  if (operationAlert && !existeOperacaoAgendada) {
    operationAlert.classList.add("hidden");
  }

  if (closeOperationAlert) {
    closeOperationAlert.addEventListener("click", () => {
      operationAlert.classList.add("hidden");
    });
  }
});
