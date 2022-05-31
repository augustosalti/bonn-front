import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
//import { ProductosComponent } from './productos/productos.component';
//import { ProveedoresComponent } from './proveedores/proveedores.component';

export const Approutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/productos', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
      },
      {
        path: 'tipos',
        loadChildren: () => import('./tipos/tipos.module').then(m => m.TiposModule)
      },
      {
        path: 'modelos',
        loadChildren: () => import('./modelos/modelos.module').then(m => m.ModelosModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'colores',
        loadChildren: () => import('./colores/colores.module').then(m => m.ColoresModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('./qr/qr.module').then(m => m.QrModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
