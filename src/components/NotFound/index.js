import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />

    <div className="not-found-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  </div>
)
export default NotFound
