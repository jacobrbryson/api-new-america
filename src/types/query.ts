import LocationModel from '../models/location';

export interface Result{
	count: number;
	data: LocationModel[]; /* This will eventually be like | FooBarModel[] | ... */
}

export interface IPoint{
	lat:number;
	long:number;
	height:number;
}

export interface IHeightmap{
	points:IPoint[];
	maxHeight:number;
	minHeight:number;
	heightRange:number;
}