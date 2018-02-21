import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  findField: string;
  @Output() searchText: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  onFind() {
    this.searchText.emit(this.findField);
  }

  addItem() {
    this.router.navigate(['edit/new']);
  }
}
