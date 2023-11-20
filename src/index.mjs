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
    case('c'):
      return 'ChangeColor:Cyan';
      break;
    default:
      return 'NOP';
  }
}
const setPosition = (player, location) => {
    player.style.top = `${location.y}px`;
    player.style.left = `${location.x}px`;
}

const player = document.querySelector('#player1');
const gameArea = document.querySelector('#app');
const movementActions = {
  'UP': (p) => {
    p.y -= 10;
    return p;
  },
  'DOWN': (p) => {
    p.y += 10;
    return p;
  },
  'LEFT': (p) => {
    p.x -= 10;
    return p;
  },
  'RIGHT': (p) => {
    p.x += 10;
    return p;
  },
};

const colorChangeActions = {
  'ChangeColor:Cyan': () => 'cyan',
}

const gameCommands = Kefir.fromEvents(gameArea, 'keydown')
.map(x => x.key)
.map(toCommand)

const colorCommands = gameCommands
.filter(x => ['ChangeColor:Cyan'].indexOf(x) >= 0)
.scan((p, v) => colorChangeActions[v] ? colorChangeActions[v](): p, 'red')

const movementCommands = gameCommands
.filter(x => ['UP','DOWN','LEFT','RIGHT'].indexOf(x) >=0)
.scan((p, v) => { 
  return movementActions[v] ? movementActions[v](p) : p;
}, {x: 0, y: 0});

colorCommands
.onValue(x => {
  player.style.backgroundColor = x;
});

movementCommands
.onValue(setPosition.bind(null, player));