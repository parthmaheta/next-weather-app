const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5";
const OPENWEATHER_KEY = "37cc001ac27982887644cbfe189c4d4a";


interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain?: {
    "3h"?: number;
    "1h"?:number;
  };
  snow?:{
    "3h"?: number;
    "1h"?:number;
  }
}

export async function fetchWeatherData(lat:number, lon:number):Promise<WeatherResponse> {  
    let weatherPromise = await fetch(`${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`);
    return await weatherPromise.json();   
}





export interface ForecastReponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export async function fetchForecastData(lat:number, lon:number):Promise<ForecastReponse> {  
    let forcastPromise = await fetch(
      `${OPENWEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`
    );

    return await forcastPromise.json();
    
 
}


interface AllCities {
  nhits: number;
  parameters: Parameters;
  records: Record[];
}

interface Parameters {
  dataset: string;
  rows: number;
  start: number;
  sort: string[];
  disjunctive: {
      cou_name_en: string;
  };
  format: string;
  timezone: string;
  fields: string[];
}

export interface Record {
  datasetid: string;
  recordid: string;
  fields: Fields;
  geometry: Geometry;
  record_timestamp: string;
}

export interface Fields {
  coordinates: number[];
  cou_name_en: string;
  population: number; 
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string;
  country_code: string;
  timezone: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}




export async function fetchAllCities(start = 0):Promise<AllCities> {
  
  const response = await fetch(
    `https://public.opendatasoft.com/api/records/1.0/search/?rows=40&disjunctive.cou_name_en=true&sort=name&start=${start==0?0:start*40}&fields=geoname_id,name,cou_name_en,ascii_name,alternate_names,population,timezone,country_code,coordinates&dataset=geonames-all-cities-with-a-population-1000`
  );

  return await response.json();

}

interface SearchCityResponse {
  nhits: number;
  parameters: Params;
  records: SearchRecord[];
}

interface Params {
  dataset: string;
  q: string;
  rows: number;
  start: number;
  format: string;
  timezone: string;
}

interface SearchRecord {
  datasetid: string;
  recordid: string;
  fields: SearchFields;
  geometry: Geometry;
  record_timestamp: string;
}

interface SearchFields {
  coordinates: number[];
  cou_name_en: string;
  label_en: string;
  feature_code: string;
  population: number;
  dem: number;
  geoname_id: string;
  elevation?: string;
  name: string;
  ascii_name: string;
  alternate_names: string;
  admin1_code: string;
  feature_class: string;
  country_code: string;
  admin2_code: string;
  timezone: string;
  modification_date: string;
}



export async function fetchCity(query = ""):Promise<SearchCityResponse> {
  const response = await fetch(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=8&q=${query}`
  );

  return await response.json(); 
}

export const getIconUrl=(value:string)=>{
  return `https://openweathermap.org/img/wn/${value}@2x.png`;
}