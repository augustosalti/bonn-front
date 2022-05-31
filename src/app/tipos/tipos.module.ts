import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { TiposComponent } from "./tipos.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Tipos",
      urls: [{ title: "Tipos", url: "/tipos" }, { title: "Tipos" }],
    },
    component: TiposComponent,
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
  declarations: [TiposComponent],
})
export class TiposModule {}
