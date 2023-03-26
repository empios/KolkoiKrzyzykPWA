import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  ai: string;
  human: string;
  scores: {};

  constructor() {
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.ai = "X";
    this.human = "O"

  }

  get player() {
    return this.xIsNext ? 'O' : 'X';
  }

  //Człowiek
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
  }



  minimax(board, depth, isMaximazing){
    this.scores = {
        'X': 1,
        'O': -1,
        'Remis': 0
    }
    let result = this.calculateWinner();
    if(result !== null){
      let score = this.scores[result];
      return score;
    }
    if(isMaximazing){
      let bestScore = -Infinity;
      for(let i=0;i<9;i++){
        //Czy jest wolne miejsce?
        if(this.squares[i] == null){
          this.squares[i] = this.ai;
          let score = this.minimax(this.squares, depth+1, false);
          this.squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    }
    else{
      let bestScore = Infinity;
      for(let i=0;i<9;i++){
        //Czy jest wolne miejsce?
        if(this.squares[i] == null){
          this.squares[i] = this.human;
          let score = this.minimax(this.squares, depth+1, true);
          this.squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  //SI
  bestMove(){
    let bestScore = -Infinity;
    let move;
    for(let i=0;i<9;i++){
      //Czy jest wolne miejsce?
      if(this.squares[i] === null){
        this.squares[i] = this.ai;
        let score = this.minimax(this.squares, 0, false);
        this.squares[i] = null;
        if(score>bestScore){
          bestScore = score;
          move = i;
        }
      }
    }
    this.squares.splice(move, 1, this.ai)
  }


  makeMoveAI(idx: number) {
    if (!this.squares[idx] || idx < 9) {
      this.squares.splice(idx, 1, this.human);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    this.bestMove()
    this.xIsNext = !this.xIsNext;
    this.winner = this.calculateWinner();
  }






  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
      else if(this.squares.filter(e => e == null).length <= 1 && this.winner == null){
        return "Remis";
      }

    }
    return null;
  }
}
