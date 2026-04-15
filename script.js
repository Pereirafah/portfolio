let currentContact = "João";

const chat = document.getElementById("chat");

const conversations = {
  "João": [],
  "Maria": [],
  "Suporte": []
};

function selectContact(name) {
  currentContact = name;
  document.getElementById("chatHeader").innerText = name;
  renderMessages();
}

function renderMessages() {
  chat.innerHTML = "";

  conversations[currentContact].forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("msg", msg.type);
    div.innerText = msg.text;
    chat.appendChild(div);
  });
}

function sendMessage() {
  const input = document.getElementById("inputMsg");
  const text = input.value;

  if (!text) return;

  conversations[currentContact].push({
    text: text,
    type: "sent"
  });

  input.value = "";
  renderMessages();

  // resposta automática simulada
  setTimeout(() => {
    conversations[currentContact].push({
      text: autoReply(text),
      type: "received"
    });

    renderMessages();
  }, 1000);
}

function autoReply(text) {
  text = text.toLowerCase();

  if (text.includes("oi")) return "Olá! Tudo bem?";
  if (text.includes("preço")) return "Vou verificar isso pra você.";
  if (text.includes("ajuda")) return "Claro! Como posso ajudar?";
  if (text.includes("humano")) return "Vou te transferir para um atendente.";

  return "Entendi 👍";
}
