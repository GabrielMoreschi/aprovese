import React from 'react'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

const animatedComponents = makeAnimated();

const SearchBar = () => {
    return (
        <div>
        <CreatableSelect
            menuIsOpen={false}
            isMulti
            isClearable
            placeholder="Filtre suas questões..."
            />
        </div>
    )
}

//https://react-select.com/creatable

export default SearchBar
