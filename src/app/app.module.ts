import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdTooltipModule, MdIconModule, MdCheckboxModule, MdButtonModule, MdDialogModule } from '@angular/material';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

// Components
import { AppComponent } from './app.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { NavComponent } from './components/nav/nav.component';
import { NavItemComponent } from './components/nav/nav-item/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageComponent } from './components/page/page.component';
import { LocationComponent } from './components/location/location.component';
import { LocationItemComponent } from './components/location/location-item/location-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CityComponent } from './components/city/city.component';
import { BossesComponent } from './components/bosses/bosses.component';

// Services
import { LocationService } from './services/location/location.service';
import { NavService } from './services/nav/nav.service';
import { UserService } from './services/user/user.service';

// Pipes
import { HtmlPipe } from './pipes/html.pipe';

import { environment } from '../environments/environment';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        ModalDialogComponent,
        NavComponent,
        NavItemComponent,
        LocationComponent,
        LocationItemComponent,
        ProfileComponent,
        CityComponent,
        BossesComponent,
        HtmlPipe,
        ToolbarComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        MdTooltipModule,
        MdIconModule,
        MdCheckboxModule,
        MdButtonModule,
        MdDialogModule
    ],
    entryComponents: [
        ModalDialogComponent
    ],
    providers: [LocationService, NavService, UserService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
