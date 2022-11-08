// Constantes e variáveis utilizadas
const paletteItens = document.querySelectorAll('.color');
const randomColorButton = document.getElementById('button-random-color');
const clearButton = document.getElementById('clear-board');
const inputBoard = document.getElementById('board-size');
const vqvButton = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');
const blackSelected = document.getElementById('black');
let selectedColor = ' rgb(0,0,0)';

// Função getRandomColor
// Objetivo: Gerar cores aleatórias para a paleta de cores
function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
getRandomColor();

// Função createAndSaveRandomPalette
// Objetivo: Criar e salvar paleta de cores aleatórias no localStorage
const createAndSaveRandomPalette = () => {
  const colorList = [blackSelected.style.backgroundColor];
  for (let index = 1; index < paletteItens.length; index += 1) {
    colorList.push(paletteItens[index].style.backgroundColor = getRandomColor());
  } localStorage.setItem('colorPalette', JSON.stringify(colorList));
}

// Elemento randomColorButton
// Objetivo: Trocar as cores da paleta de maneira aleatória
randomColorButton.addEventListener('click', createAndSaveRandomPalette);

// Função rescuePreviousColorPalette
// Objetivo: Recuperar cores da paleta salvas no localStorage
function rescuePreviousColorPalette() {
  const recovereColorPalette = JSON.parse(localStorage.getItem('colorPalette'));

  if (recovereColorPalette != null && recovereColorPalette !== '[]') {
    for (let index = 1; index < recovereColorPalette.length; index += 1) {
      paletteItens[index].style.backgroundColor = recovereColorPalette[index];
    }
  } else {
    createAndSaveRandomPalette();
  }
}

// Função generateFirstBoard
// Objetivo: Gerar quadro de pixels inicial 5 x 5
function generateFirstBoard(size) {
  if (size) {
    const newSize = size;
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
}
generateFirstBoard(5);

// Função deleteBoard
// Objetivo: Remover quadro de pixels inicial 5 x 5
function deleteBoard() {
  for (let index = pixelBoard.childNodes.length - 1; index >= 0; index -= 1) {
    pixelBoard.removeChild(pixelBoard.childNodes[index]);
  }
}

// Função anônima
// Objetivos:
// 1 - Alterar classe entre os paletteItens clicados
// 2 - Transferir ao pixel clicado backgroundcolor conforme paletteItem clicado

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('color')) {
    if (event.button === 0) {
      document.querySelector('.selected').classList.remove('selected');
      event.target.classList.add('selected');
      selectedColor = event.target.style.backgroundColor;
    }
  }
  if (event.target.classList.contains('pixel')) {
    if (event.button === !0) {
      event.target.style.backgroundColor = 'white';
    } else {
      event.target.style.backgroundColor = selectedColor;
      saveColorSequence();
    }
  }
});

// Função saveColorSequence
// Objetivo: Salvar sequência de cores usadas para colorir o quadro de pixels
function saveColorSequence() {
  const pixel = document.querySelectorAll('.pixel');
  const colorsUsed = [];
  for (let index = 0; index < pixel.length; index += 1) {
    const pixelColor = pixel[index].style.backgroundColor;
    colorsUsed.push(pixelColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colorsUsed));
}

// Função clear
// Objetivo: Transferir backgroundcolor white a todos pixels
function clear() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}

// Elemento clearButton
// Objetivo: "Limpar" todos pixels
clearButton.addEventListener('click', clear);

// Função generateBoard
// Objetivo: Gerar quadro dinâmico de pixels
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
      for (let i = 0; i < newSize; i += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        divLine.appendChild(pixel);
      }
    }
  } else {
    alert('Board inválido!');
  }
}

// Função reorganizeBoard
// Objetivo: Reorganizar quadro de pixels de acordo com tamanho solicitado pelo usuário
function reorganizeBoard() {
  generateBoard(inputBoard.value);
}

// Elemento vqvButton
// Objetivo: Gerar quadro de acordo com tamanho solicitado pelo usuário
vqvButton.addEventListener('click', reorganizeBoard);

// Função rescuePreviousPaintedBoard
// Objetivo: Resgatar pixels pintados salvos no localStorage (sequência de cores)
function rescuePreviousPaintedBoard() {
  const pixel = document.querySelectorAll('.pixel');

  if (localStorage.getItem('pixelBoard')) {
    const recoverePaintedBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = recoverePaintedBoard[index];
    }
  }
}

// Window.onload
// Objetivo: Acionar resgate de informações salvas ao recarregar página
window.onload = () => {
  rescuePreviousColorPalette();
  rescuePreviousPaintedBoard();
}
