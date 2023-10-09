const gameboard = ( function(doc){
    const gridElement = doc.getElementsByClassName('gameboard')[0];
    let gridValues = Array(9).fill('')

    const createButton = (grid, val, index) =>{
        const gameboardButton = doc.createElement("div");
        gameboardButton.classList.add("gameboard-button");

        const button = doc.createElement("button");
        button.innerText = val;
        
        if(val === '') button.classList.add("empty");
        button.dataset.position = index;

        button.addEventListener("click", (event)=>{
            event.target.dataset
        })

        gameboardButton.appendChild(button);
        grid.appendChild(gameboardButton);
    }

    const restartGrid = () => {
        gridValues = Array(9).fill('')
    }

    const clearGrid = () =>{
        while(gridElement.firstChild){
            gridElement.removeChild(gridElement.lastChild);
        }
    }

    const render = () =>{
        clearGrid();
        gridValues.forEach((value, index) => {
            createButton(gridElement, value, index);
        })
    }

    const changePosition = (position, value) => {
        gridValues[position] = value
    }

    const validPosition = (position) =>{
        return gridValues[position] === ''
    }


    const isWinner = (player) =>{
        const playerValue = player.mark
        const isFilled = (lines) => {
            const match = (element) =>{
                return gridValues[element] === playerValue
            }
            const isCheked = (line) =>{
                return line.every(match)
            }
            return lines.some(isCheked)
        }

        return filledRow(playerValue, isFilled) || filledColumn(playerValue, isFilled) || filledDiagonal(playerValue, isFilled)
    }

    const filledRow = (value, handler) => {
        rows = [
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ]
        return handler(rows)
    }

    const filledColumn = (value,handler) => {
        columns = [
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ]
        return handler(columns)
    } 

    const filledDiagonal = (value,handler) =>{
        diagonals = [
            [0,4,8],
            [2,4,6]
        ]
        return handler(diagonals)
    }

    const isFull = () =>{
        const hasValue = (value) =>{
            return value !== ''
        }
        return gridValues.every(hasValue)
    }

    return{
        changePosition,
        isWinner,
        render,
        validPosition,
        isFull,
        restartGrid
    }
}) (document) ;


function createPlayer(number,mark){
    return(
        {
            number,
            mark
        }
    )
}


const displayControler = (function (doc){
    const label = doc.getElementsByClassName("player-label")[0];
    const text = label.childNodes[1]
    
    const render = (player) =>{
        text.innerText = "It's Player " + player.number + " Turn"
    }

    const renderTie = () =>{
        text.innerText = "It's a Tie"
    }

    const renderWinner = (player) =>{
        text.innerText = "Player " + player.number + " Wins!"
    }

    return{
        render,
        renderTie,
        renderWinner
    }
})(document);


const gameControler = (function (doc,gameboard){

    const players = [
        createPlayer(1,"X"),
        createPlayer(2,"0")
    ]
    let current = 0
    let ended = false;

    const passTurn = () =>{
        current = (current + 1) % 2
    }

    const playRound = (position) =>{
        gameboard.changePosition(position, players[current].mark);
        passTurn();
    }

    const getCurrentPlayer = () =>{
        return players[current]
    }

    const isAtie = () =>{
        return gameboard.isFull() && !gameboard.isWinner(players[0]) && !gameboard.isWinner(players[1])
    }

    const hasWinner = () =>{
        ended = gameboard.isWinner(players[0]) || gameboard.isWinner(players[1])
        return ended
    }

    const winner = () =>{
        if(ended){
            return gameboard.isWinner(players[0])? players[0] : players[1]
        }
    }

    const restart = () =>{
        current = 0
        ended = false
        gameboard.restartGrid()
    }

    return{
        playRound,
        getCurrentPlayer,
        isAtie,
        hasWinner,
        winner,
        restart
    }

})(document, gameboard);


const screenControler = (function(doc, gameboard, displayControler,gameControler){

    const gridElement = doc.getElementsByClassName('gameboard')[0];
    const restartButton = doc.getElementsByClassName('restart-button')[0];

    const updateScreen=()=>{
        gameboard.render(); 
        if(gameControler.hasWinner()){
            displayControler.renderWinner(gameControler.winner())
        }else{
            if(gameControler.isAtie()){
                displayControler.renderTie()
            } 
            else{
                displayControler.render(gameControler.getCurrentPlayer());
            }
        }

    }

    const clickHandlerRound = (event) =>{
        const selectedCell = event.target.dataset.position 

        if (!selectedCell) return;

        if(!gameboard.validPosition(selectedCell)) return;

        gameControler.playRound(selectedCell);
        updateScreen();
    }

    const restartHandler = () => {
        gameControler.restart();
        updateScreen();
    }

    gridElement.addEventListener("click", clickHandlerRound)
    restartButton.addEventListener("click", restartHandler)

    updateScreen();
})(document,gameboard,displayControler,gameControler);
