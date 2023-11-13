import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedPagePage } from './logged-page.page';

describe('LoggedPagePage', () => {
  let component: LoggedPagePage;
  let fixture: ComponentFixture<LoggedPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoggedPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
