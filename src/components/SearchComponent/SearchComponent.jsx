
function SearchComponent({onSearch}) {
    return (
        <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => onSearch(e.target.value)}

        />
    );
}

export default SearchComponent;
