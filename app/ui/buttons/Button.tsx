import React from 'react';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonProps {
  label?: string | React.ReactNode;
  type?: ButtonType;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  light?: boolean;
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'light' | 'normal' | 'bold';
  buttonType?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({
  label = '',
  type = 'button',
  ariaLabel = '',
  className = '',
  disabled = false,
  light = true,
  textSize = 'md',
  fontWeight = 'normal',
  buttonType = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${
        buttonType === 'secondary'
          ? light
            ? 'bg-transparent text-cyan-800 border border-cyan-800 hover:bg-cyan-200 focus:outline-cyan-500 focus:bg-cyan-200'
            : 'bg-transparent text-gray-300 border border-gray-300 hover:bg-gray-300 hover:text-white focus:outline-cyan-600 focus:bg-cyan-500'
          : light
          ? 'bg-cyan-200 text-cyan-800 border-1 border-cyan-700 hover:text-white hover:bg-cyan-500 focus:outline-cyan-500 focus:bg-cyan-500 hover:border-white focus:text-white'
          : 'bg-cyan-500 text-white hover:text-black border-2 border-cyan-200 hover:bg-cyan-300 focus:outline-cyan-600 focus:bg-cyan-500 hover:border-cyan-500'
      }  font-bold p-2 rounded-lg cursor-pointer transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className} text-${textSize} font-${fontWeight}`}
      aria-disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
