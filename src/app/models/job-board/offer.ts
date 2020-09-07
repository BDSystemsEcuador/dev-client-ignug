import { Location } from './location';
import { State } from './../ignug/state';
import { Company } from './company';
import { Category } from './category';

export class Offer {
    id: number;
    company_id: Company; //Compania
    code: string;//ya
    contact: string;//ya
    email: string;//ya
    phone: string;//ya
    cell_phone: string;
    contract_type: string;
    position: string;//ya
    training_hours: string;//ya
    experience_time: string;//ya
    remuneration: string;//ya
    working_day: string;//jornada
    number_jobs: string;//ya
    start_date: Date;//ya
    finish_date: Date;//ya
    activities: string;//ya
    aditional_information: string;//ya
    city: Location; // Provincia esta ubicacion debe tener nombre verdad mij en location entonces deberia venir cantton y provincia 
    state: State // activo, inactivo
    father_category:Category;
    children_category:Category;
    province: Location;
}

