import React from "react";
type PropsPassword = {
  password: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  showPassword : boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  label?: string
}

function EmailInput({ password,onChange,showPassword,onClick,label ="Password" }: PropsPassword) {
  return (
    <div className="mt-4 flex flex-col">
      <label htmlFor="password" className="mb-1 text-zinc-400">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={onChange}
          name="password"
          className="w-full px-4 py-3 border-[1px] rounded-md outline-indigo-800"
          placeholder="********"
        />
        <button type="button" className="absolute inset-y-0 right-4 flex items-center top- text-zinc-400 hover:text-indigo-800">
          {
            showPassword ? (
            <i className="fa-solid fa-eye-slash" onClick={onClick}></i>
            ) : (
            <i className="fa-solid fa-eye" onClick={onClick}></i>
            )
          }
        </button>
      </div>
    </div>
  );
}

export default EmailInput;
