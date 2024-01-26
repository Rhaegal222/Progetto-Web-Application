import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForwardedComponent } from './requests-forwarded.component';

describe('RequestsForwardedComponent', () => {
  let component: RequestsForwardedComponent;
  let fixture: ComponentFixture<RequestsForwardedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsForwardedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsForwardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
