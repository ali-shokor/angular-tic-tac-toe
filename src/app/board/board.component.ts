import { Component } from '@angular/core';
import { SqaureComponent } from "../sqaure/sqaure.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SqaureComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  winner: string | null = null;
  squares = Array(9).fill(null);
  xTurn: boolean = true;
  winnerLine: number[] | null = null

  constructor() {}
  // Initiailizer
  ngOnInit() {
    this.newGame();
  }
  // Player
  get player() {
    return this.xTurn ? 'X' : 'O';
  }
  // Change Player In Each Button Pressed
  toggleTurn() {
    this.xTurn = !this.xTurn;
  }
  // New Game Button Pressed | Game Strating
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xTurn = true;
    this.winnerLine = null
  }
  // In Each Move Check 
  makeMove(id: number) {
    if (this.winner || this.squares[id]) {
      return;
    }

    this.squares[id] = this.player;
    
    this.winner = this.checkWinner();
    if (!this.winner && this.checkTie()) {
      this.winner = 'Tie';
      return 
    }
    if (!this.winner) {
      this.playSound()
      this.toggleTurn();
    }
  }
  // Winner Check
  checkWinner() {
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
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.winSound()
        this.winnerLine = [a, b, c]
        return this.squares[a];
      }
    }
    return null;
  }
  // Return if there is an tie
  checkTie() {
    return this.squares.every(square => square !== null);
  }
  playSound() {
    const audio = new Audio("sounds/click.mp3");
    audio.play();
  }
  winSound() {
    const audio = new Audio("sounds/game-finish.wav");
    audio.play();
  }
}
