const gameboard = ( function(doc){
    const gridElement = doc.getElementsByClassName('gameboard')[0];
    let gridValues = Array(8).fill('')
    gridValues.push("X")

    const createButton = (grid, val, index) =>{
        const gameboardButton = doc.createElement("div");
        gameboardButton.classList.add("gameboard-button");
        gameboardButton.classList.add(index);

        const button = doc.createElement("button");
        button.innerText = val;

        gameboardButton.appendChild(button);
        grid.appendChild(gameboardButton);
    }

    const render = () =>{
        gridValues.forEach((value, index) => {
            createButton(gridElement, value, index);
        })
    }

    render()
   

    const changePosition = (position, value) => {
        grid[position] = value
    }

    const checkWinCondition = () =>{

    }

    return{
        changePosition,
        checkWinCondition,
        render
    }
}) (document) ;



function createPlayer(number){
    const playerNumber = number
    const player = () => {
        return playerNumber
    }
    return {
        player
    }
}

const playerOne = createPlayer(1)
const playerTwo = createPlayer(2)

const displayControler = (function (doc, playerOne, playerTwo){
    let first = playerOne;
    let second = playerTwo;
    const label = doc.getElementsByClassName("player-label")[0];
    
    const render = (labelElement) =>{
        const text = labelElement.childNodes[1];
        text.innerText = "It's Player " + first.player() + " Turn"

    }

    render(label)

    const changePlayer = () => {
        let swapPlaceholder = first
        first = second;
        second = swapPlaceholder;
        render(label)
    }
    const getCurrentPLayer = () =>{
        return first
    }
    return{
        changePlayer,
        getCurrentPLayer,
    }
})(document, playerOne, playerTwo);
