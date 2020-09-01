import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JobBoardService } from '../../../services/job-board/job-board.service';
import { Offer, Company } from '../../../models/job-board/models.index';
import {SelectItem} from 'primeng/api';
import {TreeNode} from 'primeng/api';

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

  files3: TreeNode[];
  selectedFiles2: TreeNode;

  displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;
  constructor(private jobBoardService: JobBoardService) { 

  }

  ngOnInit(): void {

    this.getOffers();
    this.getTotal();
    this.sortOptions = [
      {label: 'Uno', value: '!uno'},
      {label: 'Dos', value: 'dos'},
      {label: 'Tres', value: 'tres'}
  ];
 this.files3=[
  {
      "label": "Documents",
      "data": "Documents Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Work",
              "data": "Work Folder",
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [{"label": "Expenses.doc", "icon": "pi pi-file", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "pi pi-file", "data": "Resume Document"}]
          },
          {
              "label": "Home",
              "data": "Home Folder",
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [{"label": "Invoices.txt", "icon": "pi pi-file", "data": "Invoices for this month"}]
          }]
  },
  {
      "label": "Pictures",
      "data": "Pictures Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [
          {"label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo"},
          {"label": "logo.jpg", "icon": "pi pi-image", "data": "PrimeFaces Logo"},
          {"label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo"}]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  }
  ,
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
          }]
  }
  
];
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
  selectOffer(event: Event, offer: Offer) {
    this.selectedOffer = offer;
    this.displayDialog = true;
    event.preventDefault();
}
onSortChange(event) {
  let value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}
onDialogHide() {
  this.selectedOffer = null;
}

}
