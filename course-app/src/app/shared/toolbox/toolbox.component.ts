import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit, DoCheck, OnDestroy {
  findField: string;

  constructor() { console.log('constructor'); }

  ngOnInit() { console.log('OnInit'); }

  ngDoCheck() { console.log('DoCheck'); }

  ngOnDestroy() { console.log('OnDestroy'); }

  onFind() {
    console.log(this.findField);
  }

}
