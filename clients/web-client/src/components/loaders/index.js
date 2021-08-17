// Can be a string as well. Need to ensure each key-value pair ends with ;
import { FlagSpinner } from 'react-spinners-kit'

function Loader(props) {
  console.log(props.loading)
  return (
    <div className="flex flex-col mt-80 items-center justify-center">
      <FlagSpinner color="#1e90ff" loading={props.loading} size={props.size} />
    </div>
  )
}

export default Loader