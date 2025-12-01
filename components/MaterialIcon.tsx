interface MaterialIconProps {
  icon: string
  className?: string
  filled?: boolean
  weight?: 'light' | 'normal' | 'bold'
  size?: number
}

export default function MaterialIcon({ 
  icon, 
  className = '', 
  filled = false,
  weight = 'normal',
  size 
}: MaterialIconProps) {
  const weightClass = weight === 'light' ? 'light' : weight === 'bold' ? 'bold' : ''
  const filledClass = filled ? 'filled' : ''
  const sizeStyle = size ? { fontSize: `${size}px` } : {}
  
  return (
    <span 
      className={`material-symbols-rounded ${weightClass} ${filledClass} ${className}`}
      style={sizeStyle}
    >
      {icon}
    </span>
  )
}
