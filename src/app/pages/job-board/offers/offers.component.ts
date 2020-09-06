import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JobBoardService } from '../../../services/job-board/job-board.service';
import { Offer } from '../../../models/job-board/models.index';
import { User } from '../../../models/authentication/models.index';
import { SelectItem } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  userLogged: User;
  items: MenuItem[] = [];
  selectedOffer: Offer;
  offers: Offer[];
  totalCompanies: number;
  totalProffesionals: number;
  totalOffers: number;




  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  selectedCategories: TreeNode[];
  categories: TreeNode[];
  constructor(private jobBoardService: JobBoardService) {

  }

  ngOnInit(): void {

    this.getOffers();
    this.getCategories();

    this.getTotal();
    this.sortOptions = [
      { label: 'Uno', value: '!uno' },
      { label: 'Dos', value: 'dos' },
      { label: 'Tres', value: 'tres' }
    ];

    if (sessionStorage.getItem('user_logged')) {
      this.userLogged = JSON.parse(sessionStorage.getItem('user_logged')) as User;
    } else {
      this.userLogged = new User();
    }
  }
  getOffers(): void {

    this.jobBoardService.get('offers').subscribe(
      res => {
        this.offers = res['offers'];

      },
      error => {
        console.error(error);


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

  getCategories(): void {

    this.jobBoardService.get('categories/index').subscribe(
      response => {
        const categories = response['data']['categories'];
        this.categories = [];
        // categories.forEach(category => {
        //   this.categories.push({'data':{'label': categories.name, 'data': categories.name}, 'children': category.children})
        // });
        // const testCategory = [
        //   {
        //     'name': 'TEST1',
        //     'children': [
        //       {
        //         'name': 'SUBTEST1',
        //         'children': []
        //       }
        //     ]
        //   },
        //   {
        //     'name': 'TEST2',
        //     'children': [
        //       {
        //         'name': 'SUBTEST2',
        //         'children': []
        //       }
        //     ]
        //   },
        //   {
        //     'name': 'TEST3',
        //     'children': []
        //   }
        // ];
        this.handleTree(categories);
      },
      error => {
        console.error(error);


      }
    );
  }

  handleTree(response: any) {
    response.forEach(category => {
      const childObjects = [];
      category.children.forEach(subCategory => {
        childObjects.push({ 'label': subCategory.name })
      });
      this.categories.push({ 'label': category.name, 'children': childObjects })
    });
 
  }
  
  applyOffer(): void {
    this.jobBoardService.applyPostulant( {'user': this.userLogged, 'offer': this.selectedOffer}, this.userLogged.first_name)
      .subscribe(
        response => {
          console.log(response);
          if (response) {
           
          }
        },
        error => {
          console.log('ocurrio error al aplicar oferta');
          console.log(error);
          if (error.status === 401) {

          }

          if (error.status === 500) {
            
            
          }
        });
  }
}
