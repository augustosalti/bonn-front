import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ModelosComponent } from "./modelos.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Modelos",
      urls: [{ title: "Modelos", url: "/modelos" }, { title: "Modelos" }],
    },
    component: ModelosComponent,
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
  declarations: [ModelosComponent],
})
export class ModelosModule {}
