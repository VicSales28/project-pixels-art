const paletteItens = document.querySelectorAll('.color');
let blackSelected = document.getElementById('blackSelected');
let randomColor1 = document.getElementById('randomColor1');
let randomColor2 = document.getElementById('randomColor2');
let randomColor3 = document.getElementById('randomColor3');
//console.log(blackSelected.style.backgroundColor)

const buttonRandomColor = document.getElementById('button-random-color')

// Gerar cores aleatórias para a paleta de cores 
function getRandomColor () {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
getRandomColor();

// Cria e salva paleta de cores aleatórias
const createAndSaveRandomPalette = () => {
  let colorList = [blackSelected.style.backgroundColor]; 
  for (let index = 1; index < paletteItens.length; index +=1){
    colorList.push(paletteItens[index].style.backgroundColor = getRandomColor());
  }  localStorage.setItem('colorPalette', JSON.stringify(colorList));}

createAndSaveRandomPalette ();

//Troca as cores através do botão
buttonRandomColor.addEventListener('click',createAndSaveRandomPalette);

// Ao recarregar página, cores continuam as mesmas salvas no localStorage

//  window.onload = () => {
//   const recovereArray = JSON.parse(localStorage.getItem('colorPalette'));

//    if (savedPalette != null && savedPalette !== '[]') {
//    randomColor1.style.backgroundColor = recovereArray[1]
//    randomColor2.style.backgroundColor = recovereArray[2]
//    randomColor3.style.backgroundColor = recovereArray[3]
//   } 
//   };

