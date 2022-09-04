let size = 16
let color = '#000000'

const MODES = {
    'DRAW': 'DRAW',
    'ERASE': 'ERASE'
}

let currentMode = MODES.DRAW

let grid = document.querySelector('div.grid')

function changeColor(e) {
    if (currentMode === MODES.ERASE) {
        this.style.backgroundColor = '#ffffff'
    }
    else {
        this.style.backgroundColor = color
    }
}

for (let i = 0; i < size; ++i) {
    const newRow = document.createElement('div')
    newRow.classList.add('grid-row')
    newRow.classList.add(`row-${i}`)
    for (let j = 0; j < size; ++j) {
        const newCol = document.createElement('div')
        newCol.classList.add('grid-col')
        newCol.classList.add(`col-${i}-${j}`)
    
        newCol.addEventListener('click', changeColor)

        newRow.appendChild(newCol)
    }
    grid.appendChild(newRow)
}

let colorInput = document.querySelector('.color-input')

colorInput.addEventListener('input', e => {
    color = colorInput.value
})

let eraserButton = document.querySelector('.eraser-button')
eraserButton.addEventListener('click', e => {
    eraserButton.classList.toggle('selected')
    
    currentMode = currentMode === MODES.ERASE ? MODES.DRAW : MODES.ERASE 
})

function handleClear(e) {
    let gridCols = document.querySelectorAll('.grid-col')
    gridCols.forEach(gridCol => {
        gridCol.style.backgroundColor = '#ffffff'
    })
}

let clearButton = document.querySelector('.clear-button')
clearButton.addEventListener('click', handleClear)