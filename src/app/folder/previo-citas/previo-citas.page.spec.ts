import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrevioCitasPage } from './previo-citas.page';

describe('PrevioCitasPage', () => {
  let component: PrevioCitasPage;
  let fixture: ComponentFixture<PrevioCitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevioCitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrevioCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
