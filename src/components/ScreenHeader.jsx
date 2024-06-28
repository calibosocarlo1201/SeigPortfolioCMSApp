import { ArrowLeft, Plus } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ScreenHeader = ({title, showCreateBtn ,showGoBackBtn, className }) => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      
      <div className={`flex justify-between ${className}`}>
        <div className="flex items-center gap-5">
          {showGoBackBtn && <button type='button' onClick={handleGoBack} className='flex gap-2 items-center'><ArrowLeft /></button>}
          <h1 className='text-3xl'>{title}</h1>
        </div>
        
        {showCreateBtn && <Link to="./create"><button type='button' className='bg-[#082f49] text-white py-2 px-4 rounded-lg flex gap-2 items-center'><Plus /> Create</button></Link>}
      </div>

    </>
  )
}

export default ScreenHeader