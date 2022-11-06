import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Country from "../components/Country"
import {
  fetchCountries,
  filterCountriesByRegion,
  filterCountriesBySearch,
} from "../contexts/countriesSlice/countriesSlice"

export const Home = () => {
  const dispatch = useDispatch<any>()

  const [search, setSearch] = useState("")

  const {
    countries: { isLoading, countriesState, regions },
  } = useSelector(
    (state: {
      countries: {
        countries: any[]
        isLoading: boolean
        countriesState: any[]
        regions: string[]
      }
    }) => state
  )

  const handleInput = (e: any) => {
    setSearch(e.target.value)
    dispatch(filterCountriesBySearch(e.target.value))
  }

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const handleSelect = (e: any) => {
    dispatch(filterCountriesByRegion(e.target.value))
  }

  return (
    <div className="dark">
      <header>
        <h3>Where in the world?</h3>
        <div></div>
      </header>
      <main>
        <div className="search-section">
          <div className="input">
            <img src="/icons/search.svg" className="icon" />
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={handleInput}
            />
          </div>
          <select onChange={handleSelect}>
            {regions.map((el) => {
              return (
                <option key={el} value={el}>
                  {el.toUpperCase()}
                </option>
              )
            })}
          </select>
        </div>
        {isLoading ? (
          <img src="/img/loading.gif" className="loading" />
        ) : (
          <div className="grid-container">
            {countriesState.map((el) => {
              return <Country key={el.flag} {...el} />
            })}
          </div>
        )}
      </main>
    </div>
  )
}
