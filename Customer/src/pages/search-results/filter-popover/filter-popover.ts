import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";

@Component({
	selector: 'page-filter-popover',
	templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {
	options = [{
		name: 'kids',
		fullName: 'KIDS',
	},
	{
		name: 'credit',
		fullName: 'CREDIT_CARD',
	},
	{
		name: 'bar',
		fullName: 'BAR',
	},
	{
		name: 'food',
		fullName: 'RESTAURANT',
	},
	{
		name: 'shower',
		fullName: 'SHOWER',
	},
	{
		name: 'wifi',
		fullName: 'WIFI',
	},
	{
		name: 'massage',
		fullName: 'MASSAGE',
	},
	{
		name: 'blue_flag',
		fullName: 'BLUE_FLAG',
	},
	{
		name: 'music',
		fullName: 'MUSIC',
	}, {
		name: 'ski_jet',
		fullName: 'SKI_JET',
	},
	{
		name: 'games',
		fullName: 'GAMES',
	}];
	selected: any;
	filterSubject: BehaviorSubject<{ filter: Array<string>, order: string }> = new BehaviorSubject({ filter: [], order: '' });
	SubjectOBj: {
		filter: Array<string>,
		order: string
	};
	result: any;
	search_by: string = '';

	doClose() {
		this.viewCtrl.dismiss()
	}

	constructor(
		public viewCtrl: ViewController,
		public navparam: NavParams,
		public configuration: CustomBootstrap
	) {

		this.search_by = this.navparam.get('search_by');
		let order = this.search_by == 'near' ? 'distance' : '';

		if (this.search_by == 'near') {
			this.selected = {
				filter: [],
				sort: [null, null, { 2: true }]
			};
		}
		else {
			this.selected = {
				filter: [],
				sort: [{ 1: true }]
			};
		}

		this.SubjectOBj = {
			filter: [],
			order: order
		};

		let temp = this.navparam.data.subject;
		temp.order = order;

		this.filterSubject = temp;

		this.result = this.navparam.get('result');
		this.configuration.getStorage('Filters').then(r => {

			if (r && r.filterMock) {
				this.selected = r.filterMock;
			}
			if (r && r.filters) {
				this.SubjectOBj = r.filters;
				this.filterSubject.next(this.SubjectOBj);
			}
		})
	}

	private _select(type: string, index: number, name: string): void {
		if (this.selected[type])
			this.selected[type][index] = name;
	}

	private _deselect(type: string, index: number): void {
		if (this.selected[type])
			delete this.selected[type][index];
	}

	check(type: string, index: number, single: boolean, SubjectType: string, SubjectName: string) {
		if (this.selected[type]) {
			if (single)
				this.selected[type] = [];
			if (this.selected[type][index]) {
				this._deselect(type, index);
			} else {
				this._select(type, index, SubjectName);
			}
			if (SubjectType == 'filter')
				this.SubjectOBj['filter'] = this.selected.filter;
			else
				this.SubjectOBj[SubjectType] = SubjectName;

			this.configuration.setStorage('Filters', { filterMock: this.selected, filters: this.SubjectOBj });

			this.filterSubject.next(this.SubjectOBj);

		}
	}


	transform(): number {
		if (this.result && this.result.length > 0) {
			if (this.SubjectOBj && this.SubjectOBj.filter && this.SubjectOBj.filter.length) {
				let data = this.result.filter((beach_settings) => {
					let status: boolean = true;
					for (let i in this.SubjectOBj.filter) {
						if (beach_settings['features'] && this.SubjectOBj.filter[i]) {
							if (JSON.stringify(beach_settings['features']).toLowerCase().indexOf(this.SubjectOBj.filter[i].toLowerCase()) == -1) {
								status = false;
								break
							}
						}
					}
					return status;
				});
				return (data && data.length) ? data.length : 0;
			}
		}
		return (this.result && this.result.length) ? this.result.length : 0;
	}

	ClearSelection() {
		let order = this.search_by == 'near' ? 'distance' : '';

		this.selected = {
			filter: [],
			sort: [{ 1: true }]
		};
		this.SubjectOBj = {
			filter: [],
			order: order
		};
		this.configuration.removeKeys('Filters');
		this.filterSubject.next(this.SubjectOBj);
		this.doClose();
	}
}
