import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onFilterRepos, languageFilter} = props
  const {language, id} = eachLanguage
  const filterLanguageBasedRepo = () => {
    onFilterRepos(id)
  }
  const isHighlightedButton =
    languageFilter === id ? 'highlighted-language-button' : 'language-button'
  return (
    <li>
      <button
        type="button"
        className={isHighlightedButton}
        onClick={filterLanguageBasedRepo}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
