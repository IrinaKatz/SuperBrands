import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SpecialistService} from './specialist.service';
import {Specialist} from '../interfaces&models/specialist.interface';
import {WorkerShopUnit} from '../interfaces&models/workerShopUnit';
import {Shop} from '../interfaces&models/shop.interface';
import {map, take} from 'rxjs/operators';

declare var require: any;
const json = require('../../fixtures/mock-data.json');

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shops: Shop[] = json.shops;
  private workerShopList: WorkerShopUnit[] = [];

  constructor(private specialistService: SpecialistService) {
  }

  getAllUndistributedShops(): Observable<Shop[]> {
    return of(this.shops);
  }

  setSpecialist(shopIndex): Observable<void> {
    return this.specialistService.getCurrentSpecialist().pipe(take(1), map((spec: Specialist) => {
      spec.shops.push(this.shops[shopIndex]); // adding to specialist's shop list
      this.shops.splice(shopIndex, 1); // removing from undistributed shops list
      this.workerShopList.push(new WorkerShopUnit(spec.id, shopIndex + 1)); // adding to list for WorkerShopRequest
    }));
  }

  removeSpecialist(shop): Observable<void> {
    return this.specialistService.getCurrentSpecialist().pipe(take(1), map((spec: Specialist) => {
      this.shops.push(shop);
      spec.shops.splice(spec.shops.indexOf(shop), 1);
      this.workerShopList.splice(this.workerShopList.indexOf({specId: spec.id, shopId: shop.id}), 1);
    }));
  }

  removeAllShops(): Observable<void> {
    return this.specialistService.getCurrentSpecialist().pipe(take(1), map((spec: Specialist) => {
      const shops = spec.shops;
      this.shops.push(...shops);
      for (const shop of shops) {
        this.workerShopList.splice(this.workerShopList.indexOf({specId: spec.id, shopId: shop.id}), 1);
      }
    }));
  }


  createWorkerShopRequest(): Observable<WorkerShopUnit[]> {
    return of(this.workerShopList);
  }
}
