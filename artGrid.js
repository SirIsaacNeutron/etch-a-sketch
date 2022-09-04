let size = 16

let color = '#000000'

let grid = document.querySelector('div.grid')

function changeColor(e) {
    this.style.backgroundColor = color
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