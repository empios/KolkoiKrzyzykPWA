import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton [disabled]="disabled" *ngIf="!value">{{ value }}</button>
    <button nbButton hero status="success" *ngIf="value == 'X'">{{ value }}</button>
    <button nbButton hero status="info" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent{
  @Input() value: 'X' | 'O';
  @Input() disabled: boolean;
}
