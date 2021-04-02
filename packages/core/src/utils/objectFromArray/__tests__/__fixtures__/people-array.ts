/**
 * @file Test Fixture - Array of Person Objects
 * @module utils/objectFromArray/tests/fixtures/people-array
 */

export type Person = {
  email: string
  first_name: string
  gender: string
  id: number
  ip_address: string
  last_name: string
}

export const PEOPLE_OBJECT_ID_KEY: keyof Person = 'email'

export const PEOPLE_ARRAY: Person[] = [
  {
    email: 'knassie0@histats.com',
    first_name: 'Kyrstin',
    gender: 'Agender',
    id: 1,
    ip_address: '153.62.61.155',
    last_name: 'Nassie'
  },
  {
    email: 'adecayette1@chron.com',
    first_name: 'Andie',
    gender: 'Bigender',
    id: 2,
    ip_address: '78.211.91.60',
    last_name: 'Decayette'
  },
  {
    email: 'lthridgould2@ucoz.com',
    first_name: 'Leoine',
    gender: 'Male',
    id: 3,
    ip_address: '98.55.21.153',
    last_name: 'Thridgould'
  },
  {
    email: 'lcumberland3@wsj.com',
    first_name: 'Lewes',
    gender: 'Agender',
    id: 4,
    ip_address: '95.219.151.139',
    last_name: 'Cumberland'
  },
  {
    email: 'ecarvilla4@joomla.org',
    first_name: 'Esme',
    gender: 'Genderqueer',
    id: 5,
    ip_address: '144.100.45.112',
    last_name: 'Carvilla'
  }
]

export const PEOPLE_ARRAY_ONE_SKIP = PEOPLE_ARRAY.map((person, index) => {
  return { ...person, email: index === 0 ? '' : person.email }
})
