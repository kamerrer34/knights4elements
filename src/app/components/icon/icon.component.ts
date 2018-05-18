import { Component, Input, OnInit } from '@angular/core';

import { svg } from '../../shared/svg';

@Component({
    selector: 'icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
    @Input() icon: string;
    svg = svg;

    constructor() {
    }

    ngOnInit() {
    }

}
