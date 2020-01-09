import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SingleToogleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'single-toggle',
  templateUrl: 'single-toggle.html'
})
export class SingleToggleComponent {

    @Input() firstLabel: string;
    @Input() secondLabel: string;
    @Input() image1: string;
    @Input() image2: string;
    @Input() isImage: boolean;
    @Input() enabled: boolean;
    @Input() checked: boolean;
    @Output() toggleChange = new EventEmitter<boolean>();

    isChecked: boolean;

    constructor() {
        
        this.isImage = false;
    }
    toggleClick () {
        if(!this.enabled) return;

        this.checked = !this.checked;

        this.toggleChange.emit(this.checked);
    }
}
