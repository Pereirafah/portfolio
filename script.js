const chat = document.getElementById("chat");

const API_KEY = "SUA_API_KEY_AQUI"; // coloque sua chave aqui

let messages = [];

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
            content: "Você é uma assistente virtual da Petrobras, simpática, inteligente e profissional. Você conversa com Marcos de forma natural, como no WhatsApp."
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