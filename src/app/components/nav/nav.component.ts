import { Component, OnInit } from '@angular/core';

import { localData } from '../../shared/data';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    navList: any = localData.pages;

    constructor() {
    }

    ngOnInit() {
    }
}
