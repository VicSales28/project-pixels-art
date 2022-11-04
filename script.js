// Gerar cores aleatórias para a paleta de cores 

const paletteItens = document.querySelectorAll('.color');

const buttonRandomColor = document.getElementById('button-random-color')

function getRandomColor () {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
getRandomColor();

function createRandomPalette () {
  for (let index = 1; index < paletteItens.length; index +=1){
    paletteItens[index].style.backgroundColor = getRandomColor();
  }
}
createRandomPalette ();

buttonRandomColor.addEventListener('click',createRandomPalette)

//

