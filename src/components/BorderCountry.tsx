import { formatCountry } from "../utils/_functions"

export const BorderCountry = ({ name }: any) => {
  name = formatCountry(name)
  if (name !== undefined) return <div>{name}</div>
  else return <></>
}
