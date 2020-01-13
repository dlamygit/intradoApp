import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmModelMediumTabsComponent } from './vm-model-medium-tabs.component';

describe('VmModelMediumTabsComponent', () => {
  let component: VmModelMediumTabsComponent;
  let fixture: ComponentFixture<VmModelMediumTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmModelMediumTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmModelMediumTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
