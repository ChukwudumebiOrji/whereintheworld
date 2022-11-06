import React from "react"
import { useNavigate } from "react-router-dom"

interface propType {
  name: string
  flag: string
  population: string
  region: string
  capital: string
}

const Country = ({ name, flag, population, region, capital }: propType) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${name}`)
  }

  population = population.toLocaleString()

  return (
    <article
      onClick={() => {
        handleClick()
      }}
      className="card"
    >
      <img src={flag} />
      <div className="card__content">
        <h1>{name}</h1>
        <p>
          <span className="card__content--title">Population: </span>
          {population}
        </p>
        <p>
          <span className="card__content--title">Region: </span>
          {region}
        </p>
        <p>
          <span className="card__content--title">Capital: </span>
          {capital}
        </p>
      </div>
    </article>
  )
}

export default Country
