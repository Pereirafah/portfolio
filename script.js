const expand = document.getElementById("mostrarMais");
const text = document.getElementById("text");


expand.addEventListener('click', () => {
    if (text.classList.contains('expand')) {
        text.classList.remove('expand');
      } else {
        text.classList.add('expand');
      }
})

const expand2 = document.getElementById("mostrarMais2");
const text2 = document.getElementById("text2");


expand2.addEventListener('click', () => {
    if (text2.classList.contains('expand')) {
        text2.classList.remove('expand');
      } else {
        text2.classList.add('expand');
      }
})


