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

var myNoteDom = document.querySelector('#myNote')
// console.log('ehoh hihi',myNoteDom)
// debugger

let lines = [
	["KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","MetaRight","AltRight"],
	["KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter"],
	["KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash"],
	["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace"]
]

let listeNotes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
function getNoteName(noteNumber){
  let noteOutOf12 = (noteNumber + 1200) % 12
  let noteName1 = listeNotes[noteOutOf12]
  let noteIndex = Math.floor(noteNumber / 12) - 1
  let noteName = `${noteName1}${noteIndex}`
  return noteName
}

let midiDictionnary={}
let midiDictionnaryName={}
function prepare_midiDictionnary(scale, root){
  midiDictionnary={}
  midiDictionnaryName={}
	let indexLine = 0
	for(const line of lines){
		let indexNote = 0
		for(const code of line){
			// console.log(code, indexLine, indexNote)
			let note = scale[indexNote % (scale.length)] + 12 * Math.floor(indexNote / scale.length)
      let exactNote = note + (12 * indexLine) + root
			midiDictionnary[code] = exactNote
      midiDictionnaryName[code] = getNoteName(exactNote)
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
    myNoteDom.innerText = midiDictionnaryName[e.code]
    console.log('prout prout' + midiDictionnaryName[e.code])
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

function scaleIntegersToBooleans(listeInt){
  let listeBool = [true, false, false, false, false, false,
    false, false, false, false, false, false]
  for(let a of listeInt){
    listeBool[a] = true
  }
  return listeBool
}

function scaleBooleansToInteger(listeBool){
  let listeInt = []
  let i = 0
  for(let a of listeBool){
    if(a)
      listeInt.push(i)
    i++
  }
  return listeInt
}

// prepare_midiDictionnary([0,2,3,5,7,8,10], 48)

export  {
          Tone, synth, keyDownFunction, keyUpFunction, 
          midiDictionnary, startTimes, fired, mergeByStartTime,
          prepare_midiDictionnary, scaleIntegersToBooleans, scaleBooleansToInteger,
          midiDictionnaryName
        }