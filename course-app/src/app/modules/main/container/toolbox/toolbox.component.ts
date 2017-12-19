import { Component } from '@angular/core';
import { ContainerCommunicationService } from '../container-communication.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  findField: string;

  constructor(
    private containerCommunicationService: ContainerCommunicationService
  ) { }

  onFind() {
    console.log(this.findField);
    this.containerCommunicationService.setSearchField(this.findField);
  }
}
