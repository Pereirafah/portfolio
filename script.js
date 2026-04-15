const chat = document.getElementById("chat");

// 🔑 COLOQUE SUA API KEY
const API_KEY = "SUA_API_KEY_AQUI";

let messages = [];

// Mensagem inicial automática
window.onload = () => {
  messages.push({
    text: "Olá, Marcos! 👋 Eu sou a IA-Acess. Me conte qual barreira você encontrou e eu vou te ajudar a analisar e propor soluções.",
    type: "received"
  });
  renderMessages();
};

function renderMessages() {
  chat.innerHTML = "";

  messages.forEach(msg => {
    const row = document.createElement("div");
    row.classList.add("message-row");

    if (msg.type === "received") {
      row.classList.add("bot");

      const avatar = document.createElement("img");
      avatar.src = "assistente.png";
      row.appendChild(avatar);
    }

    const div = document.createElement("div");
    div.classList.add("msg", msg.type);
    div.innerText = msg.text;

    row.appendChild(div);
    chat.appendChild(row);
  });

  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("inputMsg");
  const text = input.value;

  if (!text) return;

  messages.push({ text: text, type: "sent" });
  input.value = "";
  renderMessages();

  const reply = await getAIResponse();

  messages.push({ text: reply, type: "received" });
  renderMessages();
}

async function getAIResponse() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Você é a IA-Acess, especialista em acessibilidade universal e inclusão organizacional.

Sua missão é ajudar pessoas com deficiência (PcD) a identificar barreiras e converter esses relatos em dados técnicos para a empresa.

Siga SEMPRE este roteiro:

1. Identifique o tipo de barreira (Arquitetônica, Digital, Comunicacional ou Atitudinal).
2. Cite a base legal brevemente (ex: LBI - Lei 13.146).
3. Sugira uma solução prática para o departamento responsável.
4. Use linguagem empática, clara e profissional.
5. Chame o usuário de Marcos.

Responda como em um chat de WhatsApp.
`
          },
          ...messages.map(m => ({
            role: m.type === "sent" ? "user" : "assistant",
            content: m.text
          }))
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    return "Erro ao conectar com a IA 😢";
  }
}