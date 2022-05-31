import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ProductosComponent } from "./productos.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Productos",
      urls: [{ title: "Productos", url: "/productos" }, { title: "Productos" }],
    },
    component: ProductosComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule
  ],
  declarations: [ProductosComponent],
})
export class ProductosModule {}
