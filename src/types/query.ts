import LocationModel from '../models/location';

export interface Result{
	count: number;
	data: LocationModel[]; /* This will eventually be like | FooBarModel[] | ... */
}