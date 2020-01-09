import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SingleToogleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'single-toggle',
  templateUrl: 'single-toogle.html'
})
export class SingleToogleComponent {

    @Input() firstLabel: string;
    @Input() secondLabel: string;
    @Input() image1: string;
    @Input() image2: string;
    @Input() isImage: boolean;
    @Input() enabled: boolean = true;
    @Input() checked: boolean;
    @Output() clicked = new EventEmitter<boolean>();

    isChecked: boolean;

    constructor( ) {
        this.isImage = false;
    }

    toggleClick () {
        if(!this.enabled) return;

        this.checked = !this.checked;

        //if (this.checked){
            //this.checked = false;
        // } else {
        //     this.checked = true;
        // }

        this.clicked.emit(this.checked);
    }
}
