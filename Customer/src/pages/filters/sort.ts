import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';
/**
 * Created by shadow-viper on 1/2/18.
 */


@Pipe({
	pure: false,
	name: 'sort'
})

export class sortPipe implements PipeTransform {
	transform(data: Array<any>, search: string, end: number, column: string) {
		if (data && data.length > 0 && search) { //if(data && data.length>0 && search){
			if (column) {
				return data.filter(r => {
					let tmp = r[column].split(' ');
					let state = false;
					if (tmp.length > 0) {
						for (let i = 0; i < tmp.length; i++) {
							if (search == 'All') {
								state = (r[`beaches`] > 0) ? true : false;
							} else {
								state = (tmp[i].toLowerCase().startsWith(search.toLowerCase()) && r[`beaches`] > 0) ? true : false;
							}
							if (state) break;
						}
					}
					return state;
					// r[column].toLowerCase().startsWith(search.toLowerCase()) != -1
				}).slice(0, end);
			}
			return data.filter(r => JSON.stringify(r).toLowerCase().indexOf(search.toLowerCase()) != -1).slice(0, end);
		}
	}
}


@Pipe({
	pure: false,
	name: 'PhoneSort'
})

export class PhoneSortPipe implements PipeTransform {
	transform(data: Array<any>, search: string, end: number, column: Array<string>) {
		if (data && data.length > 0 && search) {
			if (column && column.length) {
				return data.filter((r) => {
					let tmp = r['country'].split(' ');
					let state = false;
					if (tmp.length > 0) {
						for (let i = 0; i < tmp.length; i++) {
							state = tmp[i].toLowerCase().startsWith(search.toLowerCase()) ? true : false;
							if (state) break;
						}
					}
					return state || r['prefix'] == search;
					// r['country'].toLowerCase().startsWith(search.toLowerCase())|| r['prefix']==search || r['country'].toLowerCase().indexOf(search.toLowerCase()) != -1
				}).slice(0, end);
			}
			return data.filter(r => JSON.stringify(r).toLowerCase().indexOf(search.toLowerCase()) != -1).slice(0, end);
		}
	}
}


@Pipe({
	pure: false,
	name: 'ProductSort'
})

export class ProductPipe implements PipeTransform {
	transform(data: Array<any>, search: Array<string>, column: string, order: string) {//order size,rating,abc
		if (data && data.length > 0) {
			if (search && search.length) {
				if (column) {
					data = data.filter(r => {
						let status: boolean = true;
						for (let i in search) {
							if (search[i]) {
								if (JSON.stringify(r[column]).toLowerCase().indexOf(search[i].toLowerCase()) == -1) {
									status = false
									break;
								}
							}
						}
						return status;
					})
				}
			}
			if (order && ['distance', 'rating'].indexOf(order) != -1 && data && data.length > 0) {
				data = this[order](data);
			}

			// sort by Promoted, by promoted_index, then...by index
			//this.sortPromotion(data);

			return data;
		}
		else {
		
		}

	}


	// private abc(data:Array<any>){
	//     return data.sort((a: any, b: any) => {
	//       if (a['name'] < b['name']) {
	//         return -1;
	//       } else if (a['name'] > b['name']) {
	//         return 1;
	//       } else {
	//         return 0;
	//       }
	//     });
	// }


	public size(data: Array<any>) {
		return data.sort((a: any, b: any) => {
			if (a['all_seats'] < b['all_seats']) {
				return 1;
			} else if (a['all_seats'] > b['all_seats']) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	public distance(data: Array<any>) {
		return data.sort((a: any, b: any) => {
			if (!a['geometrical_data']) {
				return 1;
			}
			if (!b['geometrical_data']) {
				return -1;
			}

			if (parseFloat(a['geometrical_data']['driving']['distance']) < parseFloat(b['geometrical_data']['driving']['distance'])) {
				return -1;
			} else if (parseFloat(a['geometrical_data']['driving']['distance']) > parseFloat(b['geometrical_data']['driving']['distance'])) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	public rating(data: Array<any>) {
		return data.sort((a: any, b: any) => {
			if (parseFloat(a['rating']) < parseFloat(b['rating'])) {
				return 1;
			} else if (parseFloat(a['rating']) > parseFloat(b['rating'])) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	public sortPromotion(data: Array<any>) {

		data = [
			{id: 1, promoted_index: 4, index: 4 },
			{id: 2, promoted_index: 1, index: 1 },
			{id: 3, promoted_index: 2, index: 5 },
			{id: 4, promoted_index: 5, index: 3 },
		];

		// the expected result should be:
		// 2, 3, 4, 5

		data = data.sort((a: any, b: any) => {
			// Sort by promoted
			// if (a['promoted']) {
			// 	return -1;
			// }
			// if (!a['promoted']) {
			// 	return 1;
			// }

			//Sort by promoted_index 
			if (parseInt(a['promoted_index']) < parseInt(b['promoted_index'])) {//
				return -1;
			}
			if (parseInt(a['promoted_index']) > parseInt(b['promoted_index'])) {
				return 1;
			}

			// Sort by index
			if (parseInt(a['index']) < parseInt(b['index'])) {
				return -1;
			}
			if (parseInt(a['index']) > parseInt(b['index'])) {
				return 1;
			}

			return 0;
		});


		return data;
	}

}



@Pipe({
	name: "order"
})
export class ArraySortPipe {
	transform(array: Array<string>, args: string): Array<string> {
		array.sort((a: any, b: any) => {
			if (a < b) {
				return -1;
			} else if (a > b) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}
}


@Pipe({
	name: "indexSort"
})
export class ArrayIndexSortPipe {
	transform(array: Array<string>, args: string): Array<string> {
		array.sort((a: any, b: any) => {
			if (a[args] < b[args]) {
				return -1;
			} else if (a[args] > b[args]) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}
}

@Pipe({
	name: "price"
})
export class PricePipe {
	transform(price: number, args: string): number {
		var retPrice = Math.round(price * 100) / 100
		return retPrice;
	}
}



@Pipe({
	name: 'key'
})


export class KeyPipe implements PipeTransform {
	transform(Obj: any, requestKey: boolean, replaceUnderscore?: boolean) {
		if (Obj) {
			for (let i in Obj) {
				if (Obj.hasOwnProperty(i)) {
					if (requestKey)
						if (replaceUnderscore)
							return i = i.replace('_', ' ');
						else
							return i;
					else
						return Obj[i];
				}
			}
		}

	}
}

@Pipe({
	name: 'ToArray'
})


export class ToArrayPipe implements PipeTransform {
	transform(Obj: any, remove: Array<string>) {
		let Arr = [];
		if (Obj) {
			for (let i in Obj) {
				let newObj = {};
				if (Obj.hasOwnProperty(i)) {
					if (remove && remove.length > 0 && JSON.stringify(remove).toLowerCase().indexOf(i) != -1) {
						continue;
					}
					newObj[i] = Obj[i];
					Arr.push(newObj)
				}
			}
			return Arr;
		}

	}
}


@Pipe({
	name: 'timeHelper'
})

export class TimeHelperMoment implements PipeTransform {
	transform(time: string) {
		let timeString = moment(time).fromNow();
		let timeArray = timeString.split(' ');
		return timeArray[1].length > 5 ? `${timeArray[0]} ${timeArray[1].substr(0, 3)} ${timeArray[2]}` : timeString
	}
}



@Pipe({
	name: 'interpolate'
})

export class InterpolationPipe implements PipeTransform {
	transform(text: string, params: any[]) {
		let keys = [];
		let values = [];

		if (!text || !params) {
			return;
		}

		params.map((item, index) => {
			index % 2 === 0 ? keys.push(item) : values.push(item);
		})
		keys.map((key, index) => {
			let transformedKey = "{{ " + key + " }}";
			let transformedKey2 = "{{" + key + "}}";

			if (text.indexOf(transformedKey) > -1) {
				text = text.replace(transformedKey, values[index]);
			}
			else if (text.indexOf(transformedKey2) > -1) {
				text = text.replace(transformedKey2, values[index]);
			}
		})

		return text
	}
}
