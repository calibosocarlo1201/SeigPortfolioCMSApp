import React from 'react'

const InputComponent = ({inputLabel, defaultVal, isTextArea}) => {
  return (
    <div class="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputLabel}</label>

        {isTextArea ? (
          <>
            <textarea rows="4" defaultValue={defaultVal} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          </>
        ): (
          <input type="text" defaultValue={defaultVal} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        )}
        
    </div>
  )
}

export default InputComponent