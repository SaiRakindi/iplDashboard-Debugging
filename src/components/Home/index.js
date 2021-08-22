// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import TeamCard from '../TeamCard'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    teams: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  setTeams = (formattedData, isLoading) => {
    this.setState({
      teams: formattedData,
      isLoading,
    })
  }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setTeams(formattedData, false)
  }

  renderTeamsList = () => {
    const {teams} = this.state

    return (
      <ul>
        {teams.map(team => (
          <TeamCard teamData={team} id={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    return (
      <div className="ipl-dashboard-home-container">
        <div className="ipl-heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl-logo"
            className="ipl-logo"
          />
          <h1 className="title">IPL Dashboard</h1>
        </div>
      </div>
    )
  }
}

export default Home
