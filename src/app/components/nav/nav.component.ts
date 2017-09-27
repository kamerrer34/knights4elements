import { Component, OnInit } from '@angular/core';

import { localData } from '../../shared/data';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    nav = localData.pages.main;

    constructor() {
    }

    ngOnInit() {

    }
}
