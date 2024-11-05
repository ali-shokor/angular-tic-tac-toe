import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sqaure',
  standalone: true,
  imports: [],
  templateUrl: './sqaure.component.html',
  styleUrl: './sqaure.component.css'
})
export class SqaureComponent {
  @Input({ required: true }) value!: 'X' | 'O';
  @Input() winnerLine!: number[]
 
  //  These inputs are just for some testing nothing importatnt
}
