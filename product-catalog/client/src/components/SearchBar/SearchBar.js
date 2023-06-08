import styles from './SearchBar.module.css'
import { useState } from 'react'
function SearchBar({ queryString, changeSearchParams }) {
    let [query, setQuery] = useState(queryString)

    function onSubmitHandler(e) {
        e.preventDefault()
        changeSearchParams(query)
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles['wrap']}>
            <div className={styles['search']}>
                <input type="text" onChange={(e) => setQuery(e.target.value)} className={styles['searchTerm']} value={query} placeholder="Search by categories." />
                <button type="submit" className={styles['searchButton']}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchBar

