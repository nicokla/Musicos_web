
import * as mm from '@magenta/music';

let player = new mm.Player(false, {
  run: (note) => {
    // slider.value = currentTime.textContent = note.startTime.toFixed(1)
  },
  stop: () => {}
})

export {player}