const gameboard = ( function(doc){
    const gridElement = doc.getElementsByClassName('gameboard')[0];
    let gridValues = Array(9).fill('')

    const createButton = (grid, val, index) =>{
        const gameboardButton = doc.createElement("div");
        gameboardButton.classList.add("gameboard-button");

        const button = doc.createElement("button");
        button.innerText = val;
        button.dataset.position = index;

        button.addEventListener("click", (event)=>{
            event.target.dataset
        })

        gameboardButton.appendChild(button);
        grid.appendChild(gameboardButton);
    }

    const render = () =>{
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

    const checkWinCondition = () =>{

    }

    return{
        changePosition,
        checkWinCondition,
        render,
        validPosition
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
    
    const render = (player) =>{
        const text = label.childNodes[1];
        text.innerText = "It's Player " + player + " Turn"
    }

    return{
        render
    }
})(document);


const gameControler = (function (doc,gameboard){

    const players = [
        createPlayer(1,"X"),
        createPlayer(2,"0")
    ]
    let current = 0

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

    return{
        playRound,
        getCurrentPlayer
    }

})(document, gameboard);


const screenControler = (function(doc, gameboard, displayControler,gameControler){

    const gridElement = doc.getElementsByClassName('gameboard')[0];

    const updateScreen=()=>{
        gameboard.render();
        displayControler.render(gameControler.getCurrentPlayer());
    }

    const clickHandlerRound = (event) =>{
        const selectedCell = event.target.dataset.position 

        if (!selectedCell) return;

        if(!gameboard.validPosition(selectedCell)) return;

        gameControler.playRound(selectedCell);
        updateScreen();
    }

    gridElement.addEventListener("click", clickHandlerRound)

    updateScreen();
})(document,gameboard,displayControler,gameControler);
