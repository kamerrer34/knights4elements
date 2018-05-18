import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Components
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavComponent } from './components/nav/nav.component';
import { NavItemComponent } from './components/nav/nav-item/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageComponent } from './components/page/page.component';
import { LocationComponent } from './components/location/location.component';
import { LocationItemComponent } from './components/location/location-item/location-item.component';
import { LocationCardComponent } from './components/location/location-card/location-card.component';
import { LocationQuestComponent } from './components/location/location-quest/location-quest.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFeaturesComponent } from './components/profile/profile-features/profile-features.component';
import { ProfileIncreaseComponent } from './components/profile/profile-increase/profile-increase.component';
import { CityComponent } from './components/city/city.component';
import { BossesComponent } from './components/bosses/bosses.component';
import { BossComponent } from './components/bosses/boss/boss.component';

// Services
import { LocationService } from './services/location/location.service';
import { NavService } from './services/nav/nav.service';
import { LoaderService } from './services/loader/loader.service';
import { UserService } from './services/user/user.service';
import { WeaponService } from './services/weapon/weapon.service';
import { GainService } from './services/gain/gain.service';
import { BossesService } from './services/bosses/bosses.service';
import { DialogService } from './services/dialog/dialog.service';

// Pipes
import { HtmlPipe } from './pipes/html.pipe';

import { environment } from '../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        IconComponent,
        ModalDialogComponent,
        LoadingComponent,
        NavComponent,
        NavItemComponent,
        ToolbarComponent,
        LocationComponent,
        LocationItemComponent,
        LocationCardComponent,
        LocationQuestComponent,
        ProfileComponent,
        ProfileFeaturesComponent,
        ProfileIncreaseComponent,
        CityComponent,
        BossesComponent,
        BossComponent,
        HtmlPipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        PerfectScrollbarModule,
    ],
    entryComponents: [
        ModalDialogComponent
    ],
    providers: [
        LocationService,
        NavService,
        LoaderService,
        UserService,
        WeaponService,
        GainService,
        BossesService,
        DialogService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
