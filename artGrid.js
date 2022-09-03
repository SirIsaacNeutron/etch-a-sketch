let size = 16

let grid = document.querySelector('div.grid')

for (let i = 0; i < size; ++i) {
    const newRow = document.createElement('div')
    newRow.classList.add('grid-row')
    for (let j = 0; j < size; ++j) {
        const newCol = document.createElement('div')
        newCol.innerText = `${i}-${j}`
        newCol.classList.add('grid-col')
        newRow.appendChild(newCol)
    }
    grid.appendChild(newRow)
}