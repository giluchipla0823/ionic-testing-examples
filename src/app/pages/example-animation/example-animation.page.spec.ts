import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleAnimationPage } from './example-animation.page';

describe('ExampleAnimationPage', () => {
  let component: ExampleAnimationPage;
  let fixture: ComponentFixture<ExampleAnimationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExampleAnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
