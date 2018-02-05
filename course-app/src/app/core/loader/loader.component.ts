import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  private show: boolean;
  private channel: Subscription;

  constructor(
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.channel =
      this.loaderService.loader.subscribe(show => {
        this.show = show;
      });
  }

  ngOnDestroy() {
    this.channel.unsubscribe();
  }
}
