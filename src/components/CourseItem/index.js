import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {data} = props

  const {id, name, logoUrl} = data
  return (
    <Link to={`courses/${id}`} className="link">
      <li>
        <img src={logoUrl} alt={name} className="logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
