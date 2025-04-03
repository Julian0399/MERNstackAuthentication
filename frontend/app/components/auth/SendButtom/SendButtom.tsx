import React from 'react'

function SendButtom({ onClick }: { onClick: (e: React.FormEvent) => void }) {
  return (
    <div className="flex">
        <button type='submit' onClick={onClick} className='mt-6 flex-1 px-4 py-3 font-bold bg-indigo-800 text-white rounded-md hover:bg-indigo-700 transition-colors'>
            Create account
        </button>
    </div>
  )
}

export default SendButtom
