import React from "react"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <img src="/img/404-error.png" className="error404" />
      <div className="buttons">
        <button onClick={() => navigate("")}>
          <img src="/icons/home.svg" className="icon" /> Home Page
        </button>
      </div>
    </>
  )
}
