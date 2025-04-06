import { escape } from "mysql2";
import db from "../helpers/db";
import QueryHelper from "../helpers/query";
import { IHeightmap, IPoint } from "../types/query";

const CIRCUMFERENCE_MARS_METERS = 21344000;  // equatorial (approximate)

class Heightmap {

  degreesLatToMeters(degrees: number): number {
		return degrees * CIRCUMFERENCE_MARS_METERS / 360;
	}

	degreesLongAtLatToMeters(degrees: number, latDegrees: number): number {
		const latRadians = latDegrees * Math.PI / 180;
		return degrees * CIRCUMFERENCE_MARS_METERS / 360 * Math.abs(Math.cos(latRadians));
	}

	metersToDegreesLat(meters: number): number {
		return meters * 360 / CIRCUMFERENCE_MARS_METERS;
	}

	metersToDegreesLongAtLat(meters: number, latDegrees: number): number {
		const latRadians = latDegrees * Math.PI / 180;
		return meters * 360 / CIRCUMFERENCE_MARS_METERS / Math.abs(Math.cos(latRadians));
	}

  async getPointsFromMySql(startLat:number,endLat:number,startLong:number,endLong:number):Promise<IPoint[]>{

    return new Promise((resolve, reject) => {
			const sql = `
				SELECT 
          latitude, 
          longitude, 
          height 
        FROM mola
        WHERE
          latitude BETWEEN ${escape(startLat)} AND ${escape(endLat)}
          AND longitude BETWEEN ${escape(startLong)} AND ${escape(endLong)};`;

          console.log(sql);
			db.query(sql, [], (error, results: any) => {
				if (error) return reject(error);
				resolve(results);
			});
		});
  }


  async generate(params:any):Promise<IHeightmap>{
    const centerLat = QueryHelper.limit(params.centerlat);
    const centerLong = QueryHelper.limit(params.centerlong);
    const distance = QueryHelper.limit(params.distance);
    console.log(params);
    console.log(`CenterLat ${centerLat}, centerLong ${centerLong}, distance ${distance}`);
    let maxHeight = 1000000;
    let  minHeight = 1000000;
    let heightRange = 0;
    const startLat = centerLat - this.metersToDegreesLat(distance);
    const endLat = centerLat + this.metersToDegreesLat(distance);
    const startLong = centerLong + this.metersToDegreesLongAtLat(distance,centerLat);
    const endLong = centerLong - this.metersToDegreesLongAtLat(distance,centerLat);

    const points = await this.getPointsFromMySql(startLat,endLat,startLong,endLong);
    
    points.forEach((point) =>{
      if (point.height > maxHeight){
        maxHeight = point.height
      }
      if (point.height < minHeight){
        minHeight = point.height
      }
    });

    heightRange = maxHeight - minHeight;

    return {
      points,
      maxHeight,
      minHeight,
      heightRange
    }
  }
}

export default new Heightmap();