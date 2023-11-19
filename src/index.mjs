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
let top = 0;
let left = 0;
const player = document.querySelector('#player1');
const gameArea = document.querySelector('#app');
const actions = {
  'UP': () => {
    top -= 10;
    player.style.top = `${top}px`;
  },
  'DOWN': () => {
    top += 10;
    player.style.top = `${top}px`;
  },
  'LEFT': () => {
    left -= 10;
    player.style.left = `${left}px`;
  },
  'RIGHT': () => {
    left += 10;
    player.style.left = `${left}px`;
  },
};

Kefir.fromEvents(gameArea, 'keydown')
.map(x => x.key)
.map(toCommand)
.onValue(x => {
  actions[x] ? actions[x]() : '';
});