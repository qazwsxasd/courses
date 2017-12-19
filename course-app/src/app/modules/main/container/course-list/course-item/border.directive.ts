import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[styled]',
})

export class StyledDirective implements OnInit {
  @Input() styled: string;
  private color: string;
  private today: string;
  private two_weeks: Date;

  constructor(public el: ElementRef) {
    this.today = new Date().toISOString();
    this.two_weeks = new Date();
    this.two_weeks.setDate(new Date().getDate() - 14);
  }

  ngOnInit() {
    const courseStart = Date.parse(this.styled);
    const currentDate = Date.parse(this.today);
    const two_weeks = Date.parse(this.two_weeks.toISOString());

    if (courseStart >= two_weeks && courseStart <= currentDate) {
      this.color = 'green';
    }

    if (courseStart > currentDate) {
      this.color = 'navy';
    }
    this.el.nativeElement.style.borderColor = this.color;
  }
}
