import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPage } from './landing-page.page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
