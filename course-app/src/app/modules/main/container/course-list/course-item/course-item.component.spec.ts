import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';

// describe('CourseItemComponent', () => {
//   let component: CourseItemComponent;
//   let fixture: ComponentFixture<CourseItemComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CourseItemComponent ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CourseItemComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });



fdescribe('TestComponent', () => {
  let fixture: ComponentFixture<CourseItemComponent>, comp: CourseItemComponent, element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    comp = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('can modify the id option', async(() => {
    comp.item.id = 1;
    fixture.detectChanges();

    comp.item.id = 2;
    fixture.detectChanges();

    expect(fixture.nativeElement
      .querySelector('span').textContent).toContain(6);
  }));
});
