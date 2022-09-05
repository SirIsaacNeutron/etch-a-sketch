let size = 16
let color = '#000000'
let isMouseDown = false

const MODES = {
    'DRAW': 'DRAW',
    'ERASE': 'ERASE'
}

// We need the isMouseDown global variable because elements
// can only detect mousedown events over themselves alone
// If I held my mouse down over one grid-col, the other grid-cols wouldn't detect that
// I was holding my mouse down!
// However, they can detect whether my mouse is over them...
document.body.addEventListener('mousedown', e => {
    isMouseDown = true
})

document.body.addEventListener('mouseup', e => {
    isMouseDown = false
})

let currentMode = MODES.DRAW

function changeColor(e) {
    if (e.type === 'mouseover' && !isMouseDown) { return }
    if (currentMode === MODES.ERASE) {
        this.style.backgroundColor = '#ffffff'
    }
    else {
        this.style.backgroundColor = color
    }
}

function createGrid() {
    // We need to delete the old grid (if there is one) before creating the new one
    let oldCols = document.querySelectorAll('.grid-col')
    oldCols.forEach(col => col.remove())

    let oldRows = document.querySelectorAll('.grid-row')
    oldRows.forEach(row => row.remove())

    let grid = document.querySelector('div.grid')

    for (let i = 0; i < size; ++i) {
        const newRow = document.createElement('div')
        newRow.classList.add('grid-row')
        newRow.classList.add(`row-${i}`)
        for (let j = 0; j < size; ++j) {
            const newCol = document.createElement('div')
            newCol.classList.add('grid-col')
            newCol.classList.add(`col-${i}-${j}`)
        
            newCol.addEventListener('mouseover', changeColor)
            newCol.addEventListener('mousedown', changeColor)

            newRow.appendChild(newCol)
        }
        grid.appendChild(newRow)
    }
}

createGrid()

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

let gridButton = document.querySelector('.grid-button')
gridButton.addEventListener('click', e => {
    let gridCols = document.querySelectorAll('.grid-col')
    gridCols.forEach(gridCol => {
        gridCol.classList.toggle('grid-lines')
    })
})

let sizeSlider = document.getElementById('size-slider')
sizeSlider.oninput = () => {
    size = sizeSlider.value
    changeSliderText()
}

function changeSliderText() {
    let sliderText = document.querySelector('.slider-text')
    sliderText.innerText = `${size} x ${size}`
}

// We only want to create the grid when the user lets go of the slider input, not
// while they're still adjusting it
sizeSlider.onchange = e => createGrid()