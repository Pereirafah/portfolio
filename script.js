const chat = document.getElementById("chat");
const input = document.getElementById("inputMsg");

// 🔑 COLOQUE SUA API AQUI
const API_KEY = "SUA_API_KEY_AQUI";

let messages = [];
let etapa = "inicio";

// ENTER PARA ENVIAR ⌨️
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

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
  const text = input.value.toLowerCase().trim();

  if (!text) return;

  messages.push({ text: text, type: "sent" });
  input.value = "";
  renderMessages();

  // 🔹 INÍCIO
  if (text === "oi" || text === "olá") {
    etapa = "menu";

    messages.push({
      text: `Olá Marcos 👋

Eu sou a Petrina 🤖
Especialista em acessibilidade e inclusão.

Como posso te ajudar?

1 - Relatar uma barreira
2 - Saber sobre acessibilidade
3 - Falar com atendente`,
      type: "received"
    });

    renderMessages();
    return;
  }

  // 🔹 MENU
  if (etapa === "menu") {

    if (text === "1") {
      etapa = "relato";

      messages.push({
        text: "Perfeito, Marcos! 👍\n\nDescreva a barreira que você encontrou.",
        type: "received"
      });

      renderMessages();
      return;
    }

    if (text === "2") {
      messages.push({
        text: "A acessibilidade garante que todas as pessoas possam usar serviços e ambientes com autonomia e segurança, conforme a Lei Brasileira de Inclusão (Lei 13.146).",
        type: "received"
      });

      renderMessages();
      return;
    }

    if (text === "3") {
      messages.push({
        text: "Ok, Marcos! Vou encaminhar você para um atendente humano.",
        type: "received"
      });

      renderMessages();
      return;
    }
  }

  // 🔹 RELATO → IA responde
  if (etapa === "relato") {
    const reply = await getAIResponse(text);

    messages.push({ text: reply, type: "received" });
    renderMessages();
    return;
  }
}

// 🤖 IA PETRINA
async function getAIResponse(userText) {
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
Você é a Petrina, especialista em acessibilidade universal e inclusão organizacional.

Sua missão é ajudar pessoas com deficiência (PcD) a identificar barreiras e converter esses relatos em dados técnicos para a empresa.

Siga SEMPRE:

1. Identifique o tipo de barreira (Arquitetônica, Digital, Comunicacional ou Atitudinal)
2. Cite a base legal (Lei Brasileira de Inclusão - Lei 13.146)
3. Sugira solução prática
4. Use linguagem empática
5. Chame o usuário de Marcos
`
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    return "Erro ao conectar com a Petrina 😢";
  }
}