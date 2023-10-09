const gameboard = ( function(doc){
    const gridElement = doc.getElementsByClassName('gameboard');
    let gridValues = Array(9).fill('')

    const createButton = (grid, val, index) =>{
        
    }

    gridValues.forEach((value, index) => {
        createButton(gridElement, value, index)
    })

    const changePosition = (position, value) => {
        grid[position] = value
    }

    const checkWinCondition = () =>{

    }

    const render = () =>{
    }

    return{
        changePosition,
        checkWinCondition,
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

const displayControler = (function (playerOne, playerTwo){
    let first = playerOne;
    let second = playerTwo;

    const changePlayer = () => {
        let swapPlaceholder = first
        first = second;
        second = swapPlaceholder;
    }
    const getCurrentPLayer = () =>{
        return first
    }
    return{
        changePlayer,
        getCurrentPLayer,
    }
})();
