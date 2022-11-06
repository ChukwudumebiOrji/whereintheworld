import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLoaderData } from "react-router-dom"
import { BorderCountry } from "../components/BorderCountry"
import { fetchCountries } from "../contexts/countriesSlice/countriesSlice"

export const Detail = () => {
  const countryParam = useLoaderData()

  const { countriesState } = useSelector(
    (state: { countries: { countriesState: any[] } }) => state.countries
  )

  const country = countriesState.find((el: { name: string }) => {
    return el.name === countryParam
  })

  let nativeName: string
  if (country.nativeName) {
    nativeName = country.nativeName[Object.keys(country.nativeName)[0]].official
  } else {
    nativeName = country.name
  }

  const currencies = Object.keys(country.currencies)[0]

  const languagesArr: string[] = Object.values(country.languages)
  let languages = ""
  for (let index = 0; index < languagesArr.length; index++) {
    languages += `${languagesArr[index]}, `
  }
  languages = languages.slice(0, -2)

  return (
    <div className="detail">
      <header>
        <h3>Where in the world?</h3>
        <div></div>
      </header>
      <main>
        <Link to="/">
          <button className="btn">
            <img src="/icons/arrowleft.svg" className="icon" /> Back
          </button>
        </Link>
        <div className="detail-container">
          <div>
            <img src={country.flag} />
          </div>
          <div className="detail__content">
            <h1>{country.name}</h1>
            <div className="detail__details">
              <p className="detail__detail">
                <span className="detail__detail-title">Native Name: </span>
                {nativeName}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Top Level Domain: </span>
                {country.tld}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Currencies: </span>
                {country.currencies[currencies].name}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Region: </span>{" "}
                {country.region}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Languages: </span>
                {languages}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Subregion: </span>{" "}
                {country.subRegion}
              </p>
              <p className="detail__detail">
                <span className="detail__detail-title">Capital: </span>{" "}
                {country.capital}
              </p>
            </div>
            {country.borderCountries && (
              <div className="detail__detail border-countries">
                <span className="detail__detail-title">Border Countries: </span>
                <div className="border-countries__container">
                  {country.borderCountries.map((el: any) => {
                    return <BorderCountry key={el} name={el} />
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export const loader = ({ params }: any) => {
  return params.country
}
