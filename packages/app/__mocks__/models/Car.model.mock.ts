import { IEntity } from '@flex-development/kustomzcore'

/**
 * @file Mock - Car Entity Model
 * @module mocks/models/Car
 */

export interface CarEntity extends IEntity {
  drivers: string[]
  make: string
  model: string
  model_year: number
  owner: {
    first_name: string
    id: string
    last_name: string
  }
  vin: string
}

export class CarModel implements CarEntity {
  created_at: number
  drivers: string[]
  id: string
  make: string
  model: string
  model_year: number
  owner: {
    first_name: string
    id: string
    last_name: string
  }
  vin: string
}
