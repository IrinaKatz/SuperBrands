import {Component, OnInit} from '@angular/core';
import {ShopService} from './services/shop.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalContent = null;
  ngOnInit() {
    this.shopService.createWorkerShopRequest().subscribe(list => {
      this.modalContent = list;
    });
  }
  constructor(private shopService: ShopService,
              private modalService: NgbModal) {}


  openLg(content) {
      this.modalService.open(content, { size: 'lg' });
  }


}
