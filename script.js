const chat = document.getElementById("chat");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("inputMsg");
  const text = input.value;

  if (!text) return;

  addMessage("👤 " + text, "user");
  input.value = "";

  const status = document.getElementById("processStatus");
  status.className = "processing";
  status.innerText = "PROCESSANDO...";

  setTimeout(() => {
    const response = processAI(text);
    addMessage("🤖 " + response, "bot");

    status.className = "online";
    status.innerText = "ATIVO";
  }, 1000);
}

function processAI(text) {
  text = text.toLowerCase();

  if (text.includes("humano")) {
    return "🔁 Transferindo para um atendente humano...";
  }

  if (text.includes("reclama")) {
    return "😔 Sentimos muito! Vamos resolver isso.";
  }

  if (text.includes("pedido")) {
    return "📦 Seu pedido está sendo processado!";
  }

  if (text.includes("oi") || text.includes("olá")) {
    return "👋 Olá! Como posso te ajudar?";
  }

  return "🤖 Entendi sua mensagem: " + text;
}