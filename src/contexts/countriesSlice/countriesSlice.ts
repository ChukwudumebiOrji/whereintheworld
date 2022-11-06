import { formatData } from "./../../utils/_functions"
import { CountryType } from "./../../types.d"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const countries: CountryType[] = []
const countriesState: any[] = []
const regions: any[] = []

const initialState = {
  countries,
  isLoading: true,
  countriesState,
  regions,
}

export const fetchCountries = createAsyncThunk(
  "fetchCountriesStatus",
  async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all")
      let data = await res.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    filterCountriesByRegion: (state, { payload }) => {
      state.isLoading = true
      if (payload === "all") {
        state.countriesState = state.countries.filter((el) => {
          return el.region !== "antarctic"
        })
      } else {
        state.countriesState = state.countries.filter((el) => {
          return el.region === payload
        })
      }

      state.isLoading = false
    },
    filterCountriesBySearch: (state, { payload }) => {
      state.isLoading = true
      state.countriesState = state.countries.filter((el) => {
        let capital = ""
        if (el.capital) capital = Object.values(el.capital)[0].toLowerCase()
        if (el.capital === undefined) capital = el.name.toLowerCase()
        return capital.includes(payload) || el.name.includes(payload)
      })
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.countries = formatData(payload)!
      state.countriesState = state.countries.filter((el) => {
        return el.region !== "antarctic"
      })
      state.regions = Array.from(
        new Set(state.countriesState.map((el) => el.region))
      )
      state.regions = ["all", ...state.regions]
      state.isLoading = false
      console.log("done")
    })
  },
})

export const { filterCountriesByRegion, filterCountriesBySearch } =
  countriesSlice.actions

export default countriesSlice.reducer
