import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  findField: string;
  @Output() searchText: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onFind() {
    this.searchText.emit(this.findField);
  }
}
