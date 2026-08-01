// Props should never be changed by the child component
// You should not mutate props, props are read only
const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search"/>
                
                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}    
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
        </div>
    )
}

export default Search;