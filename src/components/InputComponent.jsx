import React, { forwardRef } from 'react'

const InputComponent = forwardRef(({inputLabel, isTextArea, isPassword, errorMessage, ...rest}, ref) => {
  return (
    <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputLabel}</label>

        {isTextArea ? (
          <>
            <textarea rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." {...rest}></textarea>
          </>
        ): (
          <input type={isPassword ? 'password' : 'text'} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...rest} />
        )}
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        
    </div>
  )
})

export default InputComponent