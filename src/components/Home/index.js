import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CourseItem from '../CourseItem'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {isLoading: true, courseData: [], isSuccess: false, isFailure: false}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        courseData: formattedData,
        isLoading: false,
        isSuccess: true,
        isFailure: false,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailure: true})
    }
  }

  render() {
    const {isLoading, courseData, isSuccess, isFailure} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {isSuccess && (
            <div className="home-con">
              <h1>Courses</h1>
              <ul>
                {courseData.map(item => (
                  <CourseItem data={item} key={item.id} />
                ))}
              </ul>
            </div>
          )}
          {isFailure && (
            <div className="fail-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                alt="failure view"
                className="failure-img"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <div>
                <button
                  type="button"
                  onClick={this.getCourseData}
                  className="retry-btn"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Home
