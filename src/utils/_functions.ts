import { countryListAlpha3 } from "./countryList"
import { CountryType } from "../types"

export const formatData = (arr: any[]) => {
  const newArr: CountryType[] = []
  arr.forEach((element) => {
    newArr.push({
      name: element.name.common.toLowerCase(),
      flag: element.flags.png,
      population: element.population,
      region: element.region.toLowerCase(),
      capital: element.capital || element.name.common.toLowerCase(),
      nativeName: element.name.nativeName,
      subRegion: element.subregion,
      currencies: element.currencies,
      languages: element.languages,
      tld: element.tld,
      borderCountries: element.borders,
    })
  })
  newArr.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
  return newArr
}

export const formatCountry = (str: any) => {
  const index = Object.keys(countryListAlpha3).findIndex((el) => {
    return el === str
  })
  const name = Object.values(countryListAlpha3)[index]
  return name
}
