import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JobBoardService } from '../../../services/job-board/job-board.service';
import { Offer } from '../../../models/job-board/models.index';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  items: MenuItem[] = [];
  selectedOffer: Offer;
  offers: Offer[];
  totalCompanies: number;
  totalProffesionals: number;
  totalOffers: number;

  constructor(private jobBoardService: JobBoardService) { 

  }

  ngOnInit(): void {

    this.getOffers();
    this.getTotal();

  }
  getOffers(): void {

  this.jobBoardService.get('offers').subscribe(
      res => {
        this.offers = res['offers'];
        console.log(this.offers);
      },
      error => {
        console.error(error);
        console.log(error);

      }
    );
  }
  getTotal(): void {
    this.jobBoardService.get('total').subscribe(
      resolve => {
        this.totalCompanies = resolve['totalCompanies'];
        this.totalOffers = resolve['totalOffers'];
        this.totalProffesionals = resolve['totalProfessionals'];
      },
      error => console.error(error)
    );
  }


}
