import React, { forwardRef } from 'react'
import Select from 'react-select'

const TagInputComponent = forwardRef(({label, isLoading, error, errorMessage, options, value, onChangeHandler}, ref) => {
  return (
    <div className='mb-6'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        {
            isLoading ? ( <p>Loading Skills...</p> ) 
            : error ? ( <p>{error}</p> )
            : ( <Select isClearable options={options} value={value} isMulti onChange={onChangeHandler} /> )
        }
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
});

export default TagInputComponent