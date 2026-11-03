const form = document.getElementById("formulario");
const etapas = document.querySelectorAll(".etapa");
const progressBar = document.getElementById("progress-bar");
let etapaAtual = 0;

// Mostra a etapa atual e atualiza progress bar
function mostrarEtapa(index) {
  etapas.forEach((etapa, i) => {
    etapa.classList.toggle("active", i === index);
  });
  if (progressBar) {
    const progresso = ((index + 1) / etapas.length) * 100;
    progressBar.style.width = `${progresso}%`;
  }
}

// Valida todos os campos de uma etapa
function validarEtapa(etapa) {
  let valido = true;
  const campos = etapa.querySelectorAll("input, select, textarea");
  campos.forEach((campo) => {
    const erro = campo.nextElementSibling;
    if (!campo.checkValidity()) {
      campo.classList.add("invalido");
      if (erro) erro.style.display = "block";
      valido = false;
    } else {
      campo.classList.remove("invalido");
      if (erro) erro.style.display = "none";
    }
  });
  return valido;
}

// Inicializa primeira etapa
mostrarEtapa(etapaAtual);

// Configura botões Próximo e Finalizar
etapas.forEach((etapa, index) => {
  const botao = etapa.querySelector("button");
  if (botao) {
    botao.addEventListener("click", (e) => {
      if (index < etapas.length - 1) {
        if (validarEtapa(etapa)) {
          etapaAtual++;
          mostrarEtapa(etapaAtual);
        }
      } else {
        // Última etapa
        if (validarEtapa(etapa)) {
          alert("Formulário enviado com sucesso!");
          form.reset();
          etapaAtual = 0;
          mostrarEtapa(etapaAtual);
        }
      }
    });
  }
});
