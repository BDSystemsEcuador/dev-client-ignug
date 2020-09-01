import { State } from '../ignug/state';

export class Category {
    id: number;
    parent_code_id: Category;
    code: string;
    name: string;
    type: string;
    icon: string;
    state_id: State;
    children: Category[];
}

