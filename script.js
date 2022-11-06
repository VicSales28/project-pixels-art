const paletteItens = document.querySelectorAll('.color');
let blackSelected = document.getElementById('blackSelected');
let randomColor1 = document.getElementById('randomColor1');
let randomColor2 = document.getElementById('randomColor2');
let randomColor3 = document.getElementById('randomColor3');
const buttonRandomColor = document.getElementById('button-random-color')
const clearBoard = document.getElementById('clear-board')
const inputBoard = document.getElementById('board-size');
const vqvButton = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');

// Gerar cores aleatórias para a paleta de cores 
function getRandomColor () {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};
getRandomColor();

// Criar e salvar paleta de cores aleatórias no localStorage
const createAndSaveRandomPalette = () => {
  let colorList = [blackSelected.style.backgroundColor];
  for (let index = 1; index < paletteItens.length; index += 1) {
    colorList.push(paletteItens[index].style.backgroundColor = getRandomColor());
  } localStorage.setItem('colorPalette', JSON.stringify(colorList));
};

// Trocar as cores pressionando button
buttonRandomColor.addEventListener('click',createAndSaveRandomPalette);

// Ao recarregar página, cores aleatórias continuam as mesmas salvas no localStorage
window.onload = () => {
  const recovereArray = JSON.parse(localStorage.getItem('colorPalette'));
  if (recovereArray != null && recovereArray !== '[]') {
    randomColor1.style.backgroundColor = recovereArray[1]
    randomColor2.style.backgroundColor = recovereArray[2]
    randomColor3.style.backgroundColor = recovereArray[3]
  } else {
    createAndSaveRandomPalette();
  }
};

// Gerar quadro de pixels inicial
function generateFirstBoard(size) {
  if (size) {
    let newSize = size;
    for (let index = 0; index < newSize; index += 1) {
      const divLine = document.createElement('div');
      divLine.className = 'pixel-line';
      pixelBoard.appendChild(divLine);
      for (let index = 0; index < newSize; index += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        divLine.appendChild(pixel);
      }
    }
  }
};

generateFirstBoard(5);

// Remover quadro inicial
function deleteBoard() {
  for (let index = pixelBoard.childNodes.length - 1; index >= 0; index -= 1) {
    pixelBoard.removeChild(pixelBoard.childNodes[index]);
  }
};

// Alterar classe entre os paletteItens clicados
// Pixel adquire backgroundcolor conforme paletteItem clicado

let selectedColor;

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('color')) {
    if (event.button == 0) {
      document.querySelector('.selected').classList.remove('selected');
      event.target.classList.add('selected');
      selectedColor = event.target.style.backgroundColor;
    }
  }

  if (event.target.classList.contains('pixel')) {
    if (event.button == !0) {
      event.target.style.backgroundColor = 'white';
    } else {
      event.target.style.backgroundColor = selectedColor;
    }
  }
});

// Tornar background color branco
function clear() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
};

// Acionar limpeza do quadro
clearBoard.addEventListener('click', clear);

// Gerar quadro dinâmico de pixels
function generateBoard(size) {
  if (size) {
    let newSize = size;
    deleteBoard();

    if (size < 0) {
      alert('Não são permitidos valores menores que zero, digite novamente.');

    } if (size < 5) {
      newSize = 5;

    } if (size > 50) {
      newSize = 50;

    } for (let index = 0; index < newSize; index += 1) {
      const divLine = document.createElement('div');
      divLine.className = 'pixel-line';
      pixelBoard.appendChild(divLine);

      for (let index = 0; index < newSize; index += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        divLine.appendChild(pixel);
      }
    }
  } else {
    alert('Board inválido!')
  }
};

// Inputar tamanho
function reorganizeBoard() {
  generateBoard(inputBoard.value);
};

// Gerar quadro de acordo com tamanho solicitado pelo usuário
vqvButton.addEventListener('click', reorganizeBoard);