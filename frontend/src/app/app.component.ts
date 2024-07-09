import {Component, input, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatStepperModule} from "@angular/material/stepper";
import {MatBadgeModule} from "@angular/material/badge";
import {TransferDataService} from "./services/transferData/transfer-data.service";
import {AuthFirebaseService} from "./services/authFirebase/auth-firebase.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule,RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  opened: boolean = true;

  isExpanded = true;
  isShowing = false;
 userRole: string ="";
 username: any=""

  imageUrl = input<string>();
  avatarSize = input<"avatar-sm" | "avatar-xl">();
  isAuthenticated: boolean = false;

  constructor(private router: Router, private transferService: TransferDataService, private auth: AuthFirebaseService) {

  }

  ngOnInit(){

     this.auth.getAuthState().subscribe(user =>{
       // console.error(user)
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
      this.auth.getUserName().then((userName:any) => {
        console.log(userName);
        this.username = userName?.multiFactor?.user.email;

      },(error)=>{
        console.log("logo cred", error);
      })

      if(this.isAuthenticated){
        this.transferService.currentRole.subscribe(role => {
          console.log("transfer user", role)
          this.userRole = this.isAuthenticated? role:"none";
        })
      }else{
        this.transferService.clearUserData()
      }

      // console.log(this.isAuthenticated);
    })
  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  login() {
    this.router.navigate(['login']);
  }
  setRole(role: string){
    this.userRole =role;
  }

  signup(){
    this.router.navigate(['signup']);

  }

  async logout() {
    await this.auth.logout()
  }

  accountSetting() {
    this.router.navigate(['account']);
  }
}
