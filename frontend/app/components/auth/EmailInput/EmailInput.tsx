import React from 'react'

type PropsEmail = {
  email: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EmailInput({email,onChange}: PropsEmail) {
  return (
    <div className="mt-4 flex flex-col">
            <label htmlFor="email" className="mb-1 text-zinc-400">Email</label>
            <input type="email"
            id='email'
            value={email}
            onChange={onChange}
            name='email'
            className='px-4 py-3 border-[1px] rounded-md outline-indigo-800'
            placeholder='JavaScript@gmail.com'/>
    </div>
  )
}

export default EmailInput
