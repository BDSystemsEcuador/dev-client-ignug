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
  styleUrls: ['./offers.component.scss']
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
  criterioBusqueda: string;

  categories: TreeNode[] = [];
  categorySelected: TreeNode | any;
  constructor(private jobBoardService: JobBoardService) {

  }

  ngOnInit(): void {

    this.getOffers();
    this.getCatalogue();
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

  getCatalogue(): void {
    this.jobBoardService.get('categories').subscribe(
      response => {
        
        response['data']['categories'].forEach(category => {
          let categoryChildren = [];
          category['children'].forEach(child => {
            categoryChildren.push({label: child.name});
          });
          this.categories.push({label: category.name, children: categoryChildren});
        });
        
      },
      error => console.error(error)
    );
  }

  insertCategory(category: any) {

  }

  filterOffers(): void {
    const selectedChildren = [];
    if (this.categorySelected) {
      this.categorySelected.forEach(child => { selectedChildren.push('name', 'ilike', '%'+child.label+'%', 'or')});
    }
    const filter = { "filters":
      {
        "conditions":
        [["position","ilike",`%${this.criterioBusqueda}%`]],
        "conditionsCategoryFather":
        [["name","ilike",`% %`]],
        "conditionsCategoryChildren":
        [selectedChildren],
      }
    };
    this.jobBoardService.post(`offers/filter?limit=${20}&page=${1}&field=start_date&order=DESC`, filter)
      .subscribe(
        (res) => {
          this.offers = res['offers']['data'];
        },
        err => console.log(err)
      )
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
