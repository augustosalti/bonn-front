import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ColoresComponent } from "./colores.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Colores",
      urls: [{ title: "Colores", url: "/colores" }, { title: "Colores" }],
    },
    component: ColoresComponent,
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
  declarations: [ColoresComponent],
})
export class ColoresModule {}
