import {Component, OnDestroy, OnInit} from '@angular/core';
import {Specialist} from '../../interfaces&models/specialist.interface';
import {SpecialistService} from '../../services/specialist.service';
import {ShopService} from '../../services/shop.service';
import {Shop} from '../../interfaces&models/shop.interface';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css']
})
export class SpecialistsComponent implements OnInit, OnDestroy {
  activeSpecialist = null;
  allSpecialists: Specialist[];
  freeSpecialists: Specialist[];
  specInWork: Specialist[];
  allSpecSubscription: Subscription;
  currentSpecSubscription: Subscription;
  specInWorkSubscription: Subscription;

  constructor(private specialistService: SpecialistService,
              private shopService: ShopService) {
  }

  ngOnInit() {
    this.allSpecSubscription = this.specialistService.getAllSpecialists().subscribe((res: Specialist[]) => {
      this.allSpecialists = this.freeSpecialists = res;
    });
    this.currentSpecSubscription = this.specialistService.getCurrentSpecialist().subscribe((spec: Specialist) => {
      this.activeSpecialist = spec;
    });
    this.specInWorkSubscription = this.specialistService.getSpecialistsInWork().subscribe((list: Specialist[]) => {
      this.specInWork = list;
    });
  }

  setNewSpec(spec): void {
    this.specialistService.setCurrentSpecialist(spec);
    this.specialistService.addSpecialistInWork(spec);
    this.freeSpecialists.splice(this.allSpecialists.indexOf(spec), 1);
  }

  getPhoto(id): string {
    return `../../../assets/photos/${id}.jpg`;
  }

  setCurrentSpec(spec: Specialist): void {
    this.specialistService.setCurrentSpecialist(spec);
  }


  removeShop(shop: Shop): void {
    this.shopService.removeSpecialist(shop).subscribe();
  }

  removeSpecialist(): void {
    // 1. Place all the shops of specialist back to list
    this.shopService.removeAllShops().subscribe();

    // 2. Add currentSpecialist to freeSpecialists
    this.freeSpecialists.push(this.activeSpecialist);

    // 3. Delete currentSpecialist from specInWork and set another currentSpec
    const ind = this.specInWork.indexOf(this.activeSpecialist);
    this.specInWork.splice(ind, 1);
    if (this.specInWork && this.specInWork.length >= (ind + 1)) {
      this.specialistService.setCurrentSpecialist(this.specInWork[ind]);
    } else if (this.specInWork) {
      this.specialistService.setCurrentSpecialist(this.specInWork[this.specInWork.length - 1]);
    }
  }

  ngOnDestroy(): void {
    if (this.allSpecSubscription) {
      this.allSpecSubscription.unsubscribe();
    }
    if (this.currentSpecSubscription) {
      this.currentSpecSubscription.unsubscribe();
    }
    if (this.specInWorkSubscription) {
      this.specInWorkSubscription.unsubscribe();
    }
  }
}
