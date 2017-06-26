import { RouterModule, Routes } from '@angular/router';

import { FormTable } from '../FormTable/FormTable';
import { PubSub } from '../PubSub/PubSub';

const routes: Routes = [
  { path: 'pubsub', component: PubSub},
  { path: 'formtable', component: FormTable}
];

export const routing = RouterModule.forRoot(routes);
