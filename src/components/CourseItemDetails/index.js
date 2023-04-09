import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import './index.css'

class CourseItemDetails extends Component {
  state = {
    isLoading: true,
    courseDetails: {},
    isFail: false,
    isSuccess: false,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      //   console.log(data)

      this.setState({
        isLoading: false,
        isSuccess: true,
        isFail: false,
        courseDetails: formattedData,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFail: true})
    }
  }

  render() {
    const {isLoading, isFail, isSuccess, courseDetails} = this.state
    const {description, name, imageUrl} = courseDetails
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
            <div className="con">
              <div className="course-con">
                <div>
                  <img src={imageUrl} alt={name} className="img" />
                </div>
                <div>
                  <h1>{name}</h1>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          )}
          {isFail && (
            <div className="fail-con">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                  className="failure-img"
                />
              </div>

              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>

              <div>
                <button
                  onClick={this.getCourseDetails}
                  type="button"
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
export default CourseItemDetails
