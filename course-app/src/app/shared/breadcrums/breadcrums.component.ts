import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';

interface BreadcrumbsShape {
  name: string;
  params?: Params;
  route: string;
}

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})

export class BreadcrumsComponent implements OnInit {
  public breadcrumbs: Array<BreadcrumbsShape>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [{
      route: 'main',
      name: 'main'
    }];
  }

  ngOnInit() {
    console.log(this.router);

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: any) => {
        console.log(555);

        const children = this.activatedRoute.root.children;

        for (let child of children) {};

        this.breadcrumbs.push({
          route: event.url,
          name: event.url
        });
    });
  }
}
