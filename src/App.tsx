import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import store from "./contexts/store"
import { Home } from "./pages/Home"
import { Detail, loader as detailLoader } from "./pages/Detail"
import { NotFound } from "./pages/NotFound"
import "./sass/main.css"

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  {
    path: "detail/:country",
    loader: detailLoader,
    element: <Detail />,
    errorElement: <NotFound />,
  },
])

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
