import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedPage } from './logged-page.page';

describe('LoggedPage', () => {
  let component: LoggedPage;
  let fixture: ComponentFixture<LoggedPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(LoggedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
