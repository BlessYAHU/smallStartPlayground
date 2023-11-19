import "./styles.css";
import Kefir from 'kefir';

const toCommand = x => {
  switch(x.toLowerCase()) {
    case('arrowup'):
      return 'UP';
      break;
    case('arrowdown'):
      return 'DOWN';
      break;
    case('arrowleft'):
      return 'LEFT';
      break;
    case('arrowright'):
      return 'RIGHT';
      break;
    default:
      return 'NOP';
  }
}
let top = 0; let left = 0;
  const actions = {
  'UP': () => {
    top -= 10;
    document.querySelector('#player1').style.top = `${top}px`;
  },
  'DOWN': () => {
    top += 10;
    document.querySelector('#player1').style.top = `${top}px`;
  },
  'LEFT': () => {
    left -= 10;
    document.querySelector('#player1').style.left = `${left}px`;
  },
  'RIGHT': () => {
    left += 10;
    document.querySelector('#player1').style.left = `${left}px`;
  },
  };
Kefir.fromEvents(document.querySelector('#app'), 'keydown')
//.filter(x => x.key !== null)
.map(x => x.key)
.map(toCommand)
.onValue(x => {
  actions[x] ? actions[x]() : '';
});//  console.log(x));

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// `;
