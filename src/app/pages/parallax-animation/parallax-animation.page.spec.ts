import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParallaxAnimationPage } from './parallax-animation.page';

describe('ParallaxAnimationPage', () => {
  let component: ParallaxAnimationPage;
  let fixture: ComponentFixture<ParallaxAnimationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ParallaxAnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
