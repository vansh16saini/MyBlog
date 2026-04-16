import React, {useId} from 'react'

function Select({
    options = [],
    className = '',
    ref,    
    ...props

}) {
    const id = useId()
  return (
<select
  {...props}
  id={id}
  ref={ref}
  className={`w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 outline-none transition-all duration-200 focus:border-[var(--color-primary)] ${className}`}
>
  {options?.map((option) => (
    <option
      key={option}
      value={option}
      className="bg-[var(--color-surface)] text-[var(--color-text)]"
    >
      {option}
    </option>
  ))}
</select>
  )
}

export default Select