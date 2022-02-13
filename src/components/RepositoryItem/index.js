import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, forksCount, starsCount, issuesCount, avatarUrl} = eachRepo
  return (
    <li className="each-repo-container">
      <img src={avatarUrl} className="git-avatar" alt={name} />
      <h1 className="git-repo-name"> {name}</h1>
      <div className="stars-forks-issues-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-forks-issues-image"
        />
        <p className="git-repo-count-text"> {starsCount}</p>
      </div>
      <div className="stars-forks-issues-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-forks-issues-image"
        />
        <p className="git-repo-count-text"> {forksCount}</p>
      </div>
      <div className="stars-forks-issues-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars-forks-issues-image"
        />
        <p className="git-repo-count-text"> {issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
