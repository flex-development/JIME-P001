/**
 * @file Test Fixture - Search Index Data
 * @module lib/services/SearchIndexService/tests/fixtures/cars
 */

export type Car = {
  make: string
  model: string
  model_year: number
  vin: string
}

export const CAR_OBJECTS: Car[] = [
  {
    make: 'Honda',
    model: 'CR-V',
    model_year: 2007,
    vin: 'KMHTC6AD5FU539428'
  },
  {
    make: 'Volkswagen',
    model: 'Passat',
    model_year: 2001,
    vin: 'TRUWT28N141705117'
  },
  {
    make: 'Mitsubishi',
    model: '3000GT',
    model_year: 1995,
    vin: 'JH4DC54805S081355'
  },
  {
    make: 'Mercury',
    model: 'Cougar',
    model_year: 1967,
    vin: 'SCFFDAAE2BG795532'
  },
  {
    make: 'Ford',
    model: 'F-Series',
    model_year: 1986,
    vin: 'WAUVT68E05A682764'
  }
]

export const CARS_INDEX_NAME = 'cars'

export const CARS_OIDK: keyof Car = 'vin'

export const getCarObjects = jest.fn((): Car[] => CAR_OBJECTS)
