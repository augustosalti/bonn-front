import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { QrComponent } from "./qr.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "QR",
      urls: [{ title: "QR", url: "/qr" }, { title: "QR" }],
    },
    component: QrComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [QrComponent],
})
export class QrModule {}
