let messages = [];
let etapa = 0;
let perfilAcessibilidade = "";

const chat = document.getElementById("chat");
const input = document.getElementById("input");

const userName = localStorage.getItem("userName") || "Marcos";

/* INICIAR */
startChat();

function startChat() {
  messages.push({
    text: `Olá ${userName} 👋

Eu sou a Petrina 🤖  
Especialista em acessibilidade e inclusão.

Você possui alguma necessidade de acessibilidade?`,
    type: "received",
    buttons: [
      { text: "Sim", value: "1" },
      { text: "Não", value: "2" }
    ]
  });

  renderMessages();
}

/* BOTÕES */
function createButtons(options) {
  const div = document.createElement("div");

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.onclick = () => {
      input.value = opt.value;
      sendMessage();
    };
    div.appendChild(btn);
  });

  return div;
}

/* RENDER */
function renderMessages() {
  chat.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message", msg.type);
    div.innerText = msg.text;

    if (msg.buttons) {
      div.appendChild(createButtons(msg.buttons));
    }

    chat.appendChild(div);
  });

  chat.scrollTop = chat.scrollHeight;
}

/* ENVIAR */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  messages.push({ text, type: "sent" });
  input.value = "";

  handleBot(text);
  renderMessages();
}

/* ENTER */
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

/* IA */
function handleBot(text) {

  if (etapa === 0) {
    if (text === "1") {
      etapa = 1;
      messages.push({
        text: `Entendi, Marcos 💚

Qual tipo de necessidade você possui?`,
        type: "received",
        buttons: [
          { text: "Visual 👁️", value: "1" },
          { text: "Auditiva 🔊", value: "2" },
          { text: "Mobilidade 🦽", value: "3" },
          { text: "Cognitiva 🧠", value: "4" }
        ]
      });
    } else {
      etapa = 2;
      showMenu();
    }
  }

  else if (etapa === 1) {
    switch (text) {
      case "1": perfilAcessibilidade = "visual"; break;
      case "2": perfilAcessibilidade = "auditiva"; break;
      case "3": perfilAcessibilidade = "mobilidade"; break;
      case "4": perfilAcessibilidade = "cognitiva"; break;
    }
    etapa = 2;
    showMenu();
  }

  else if (etapa === 2) {
    if (text === "1") {
      etapa = 3;
      messages.push({
        text: "Descreva a barreira que você encontrou.",
        type: "received"
      });
    }
  }

  else if (etapa === 3) {
    messages.push({
      text: `Obrigado pelo relato, Marcos 💚

📌 Tipo de barreira: Arquitetônica  
📖 Base legal: Lei Brasileira de Inclusão (Lei 13.146)  
✅ Solução: Adaptar acessos com rampas, sinalização ou elevadores.`,
      type: "received"
    });

    etapa = 2;
    showMenu();
  }
}

/* MENU */
function showMenu() {
  messages.push({
    text: `Como posso te ajudar?`,
    type: "received",
    buttons: [
      { text: "🚧 Relatar barreira", value: "1" },
      { text: "📚 Sobre acessibilidade", value: "2" },
      { text: "👨‍💼 Falar com atendente", value: "3" }
    ]
  });
}