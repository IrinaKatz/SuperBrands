import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {Shop} from '../../interfaces&models/shop.interface';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: Observable<Shop[]>

  constructor(private service: ShopService) { }

  ngOnInit() {
    this.shops = this.service.getAllUndistributedShops();
  }

  toAddToSpecialist(shopIndex: number) {
    this.service.setSpecialist(shopIndex).subscribe();
  }

}
