import React from "react";

function EmailInput({ password,onChange }: { password: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="mt-4 flex flex-col">
      <label htmlFor="password" className="mb-1 text-zinc-400">
        Password
      </label>
      <div className="relative w-full">
        <input
          type="password"
          id="password"
          value={password}
          onChange={onChange}
          name="password"
          className="w-full px-4 py-3 border-[1px] rounded-md outline-indigo-800"
          placeholder="********"
        />
        <button type="button" className="absolute inset-y-0 right-4 flex items-center top- text-zinc-400 hover:text-indigo-800">
          <i className="fas fa-eye"></i>
        </button>
      </div>
    </div>
  );
}

export default EmailInput;
