import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ProveedoresComponent } from "./proveedores.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Proveedores",
      urls: [{ title: "Proveedores", url: "/proveedores" }, { title: "Proveedores" }],
    },
    component: ProveedoresComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [ProveedoresComponent],
})
export class ProveedoresModule {}
