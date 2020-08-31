import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';

import { AppProfessionalsComponent } from './professionals/app.professionals.component';
import { OffersComponent } from './offers/offers.component';

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'professionals',
                component: AppProfessionalsComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'offers',
                component: OffersComponent,
                // canActivate: [AuthGuard]
            },
        ]
    }
];
