import React from 'react'

type PropsButton = {
  onClick: (e: React.FormEvent) => void 
  text: string
}
function SendButtom({ onClick,text }: PropsButton) {
  return (
    <div className="flex">
        <button type='submit' onClick={onClick} className='mt-6 flex-1 px-4 py-3 font-bold bg-indigo-800 text-white rounded-md hover:bg-indigo-700 transition-colors'>
            {text}
        </button>
    </div>
  )
}

export default SendButtom
