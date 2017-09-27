import { Component, OnInit } from '@angular/core';

import { localData } from '../../shared/data';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    pages = localData.pages.main;

    constructor() {
    }

    ngOnInit() {

    }

}
