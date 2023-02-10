import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickindentgenrateComponent } from './quickindentgenrate.component';

describe('QuickindentgenrateComponent', () => {
  let component: QuickindentgenrateComponent;
  let fixture: ComponentFixture<QuickindentgenrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickindentgenrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickindentgenrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
