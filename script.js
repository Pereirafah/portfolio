function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if (!userText) return;

  // Mensagem do usuário
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = userText;
  chatBox.appendChild(userMsg);

  // Resposta da IA (simulada)
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.innerText = "Entendi sua solicitação. Analisando...";
    chatBox.appendChild(botMsg);

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("analysisText").innerText =
      "Tipo: Acessibilidade Digital | Área: TI | Solução encontrada baseada em casos anteriores.";

  }, 800);

  input.value = "";
}

function createTicket() {
  document.getElementById("ticket").classList.remove("hidden");

  document.getElementById("ticketInfo").innerText =
    "Protocolo #84721 | Responsável: TI | Prazo: 48h";
}