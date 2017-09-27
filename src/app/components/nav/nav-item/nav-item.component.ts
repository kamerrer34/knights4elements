import { Component, Input, OnInit } from '@angular/core';

import { NavService } from '../../../services/nav/nav.service';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
    @Input() item: any;

    constructor(private navService: NavService) { }

    ngOnInit() {
    }

    goTo() {
        this.navService.goTo(this.item.name);
    }

}
