let jps = JSON.parse(localStorage.getItem('JPS')) || 0;
let johns = JSON.parse(localStorage.getItem('johns')) || 0;
let jpc = JSON.parse(localStorage.getItem('JPC')) || 1;

worlds = [
  {
    world: 1,
    skin: 'Billob',
    multiplier: 1,
    johns: 10,
    jpc: 0,
    jps: 0,
  },

  {
    world: 2,
    skin: 'Bluob',
    multiplier: 1.2,
    johns: 20,
    jpc: 0,
    jps: 0,
  }
]