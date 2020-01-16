import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildConfigCustomerInformationComponent } from './build-config-customer-information.component';

describe('BuildConfigCustomerInformationComponent', () => {
  let component: BuildConfigCustomerInformationComponent;
  let fixture: ComponentFixture<BuildConfigCustomerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildConfigCustomerInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildConfigCustomerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
