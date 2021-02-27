import * as Tone from 'tone'

document.documentElement.addEventListener("mousedown", 
	function(){
		if (Tone.context.state !== 'running') {
			Tone.context.resume()
		}
	}
)

// -------------------------------------------
// Test tone.js

const synth = new Tone.PolySynth(Tone.Synth, {
	oscillator: {
		partials: [0, 2, 3, 4],
	}
}).toDestination()

// var myNoteDom = document.querySelector('#myNote')
// console.log(myNoteDom)
// debugger

let lines = [
	["KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","MetaRight","AltRight"],
	["KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter"],
	["KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash"],
	["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace"]
]

let midiDictionnary={}
function prepare_midiDictionnary(scale, root){
	let indexLine = 0
	for(const line of lines){
		let indexNote = 0
		for(const code of line){
			// console.log(code, indexLine, indexNote)
			let note = scale[indexNote % (scale.length)] + 12 * Math.floor(indexNote / scale.length)
			midiDictionnary[code] = note + (12 * indexLine) + root
			indexNote++
		}
		indexLine++
	}
}

let fired = []
for (let i=0; i<100; i++){
	fired[i] = false
}

let startTimes = []
for (let i=0; i<100; i++){
	startTimes[i] = 0
}

let keyDownFunction = function(e){ 
  let midiNote = midiDictionnary[e.code]
  if(!fired[midiNote]) {
    fired[midiNote] = true
    startTimes[midiNote] = Date.now()/1000
    // myNoteDom.innerText = midiDictionnary[e.code] + ": down"
    synth.triggerAttack(Tone.Midi(midiNote)) // "C4", "8n"	
  }
}

let keyUpFunction = function(e){ 
	let midiNote = midiDictionnary[e.code]
	fired[midiNote] = false

	// myNoteDom.innerText = midiDictionnary[e.code] + ": up"
	synth.triggerRelease(Tone.Midi(midiNote))
}

// document.addEventListener("keydown", keyDownFunction)
// document.addEventListener("keyup", keyUpFunction)

// put arr2 in arr1
function merge(arr1, arr2){
  for(let a of arr2){
    let i=0
    while(a>arr1[i] && i<arr1.length){
        i++;
    }
    arr1.splice(i, 0, a)
  }
}

function mergeByStartTime(arr1, arr2){
  console.log(arr1, arr2)
  for(let a of arr2){
    let i=0
    while(i < arr1.length && a.startTime > arr1[i].startTime){
        i++;
    }
    arr1.splice(i, 0, a)
  }
}

prepare_midiDictionnary([0,2,3,5,7,8,10], 48)

export  {
          Tone, synth, keyDownFunction, keyUpFunction, 
          midiDictionnary, startTimes, fired, mergeByStartTime
        }