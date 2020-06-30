import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Specialist} from '../interfaces&models/specialist.interface';


declare var require: any;
const json = require('../../fixtures/mock-data.json');

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  private specialists: Specialist[] = json.specialists;
  private currentSpecialist = new BehaviorSubject<Specialist>(undefined);
  private specialistsInWork: Specialist[] = [];

  constructor() {}

  setCurrentSpecialist(spec: Specialist): void {
    this.currentSpecialist.next(spec);
  }

  getCurrentSpecialist(): Observable<Specialist> {
    return this.currentSpecialist;
  }

  getAllSpecialists(): Observable<Specialist[]> {
    return of(this.specialists);
  }

  addSpecialistInWork(spec: Specialist): void {
    this.specialistsInWork.push(spec);
  }
  getSpecialistsInWork() {
    return of(this.specialistsInWork);
  }
}
