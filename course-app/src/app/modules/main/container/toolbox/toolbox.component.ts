import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  findField: string;

  constructor() { console.log('constructor'); }

  onFind() {
    console.log(this.findField);
  }

}
