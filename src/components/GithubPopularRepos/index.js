import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const reposStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class GithubPopularRepos extends Component {
  state = {reposList: [], languageFilter: 'ALL', status: reposStatus.initial}

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({status: reposStatus.loading})
    const {languageFilter} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageFilter}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = await data.popular_repos.map(eachData => ({
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
        starsCount: eachData.stars_count,
        id: eachData.id,
        name: eachData.name,
      }))
      this.setState({reposList: updatedData, status: reposStatus.success})
    } else {
      this.setState({status: reposStatus.failed})
    }
  }

  onFilterRepos = id => {
    this.setState(
      {languageFilter: id, status: reposStatus.loading},
      this.getGithubRepos,
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderGithubRepos = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }

  renderReposNotFound = () => (
    <div className="repos-not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1> Something Went Wrong </h1>
    </div>
  )

  render() {
    const {languageFilter} = this.state
    this.renderPopularRepos = () => {
      const {status} = this.state
      switch (status) {
        case reposStatus.loading:
          return this.renderLoader()

        case reposStatus.success:
          return this.renderGithubRepos()

        case reposStatus.failed:
          return this.renderReposNotFound()

        default:
          return null
      }
    }

    return (
      <div className="github-popular-repos-bcg-container">
        <h1 className="popular-main-heading"> Popular </h1>
        <ul className="language-filters-data-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              onFilterRepos={this.onFilterRepos}
              languageFilter={languageFilter}
            />
          ))}
        </ul>
        {this.renderPopularRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
