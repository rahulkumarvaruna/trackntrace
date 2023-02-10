import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnrouteComponent } from './enroute.component';
import { EnrouteModule } from './enroute.module';

describe('EnrouteComponent', () => {
  let component: EnrouteComponent;
  let fixture: ComponentFixture<EnrouteComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          EnrouteModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
