import React from 'react';

const AccessibleInput = React.forwardRef(({ 
  label, 
  error, 
  className = '',
  fieldKey,
  register,
  name,
  required,
  ...props 
}, ref) => {
  // Destructure out custom props so they are not passed to <input>
  const { speak, speakField, isAudioEnabled: _isAudioEnabled, ...inputProps } = props;
  const registerProps = register ? register(name, { required }) : {};

  return (
    <div>
      <label>
        {label}
        {props.required && <span>*</span>}
      </label>
      <input
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:outline-none transition-colors ${className}`}
        aria-describedby={error ? `${name || 'input'}-error` : undefined}
        {...registerProps}
        {...inputProps}
        onFocus={e => {
          speakField && speakField(fieldKey || label);
          inputProps.onFocus && inputProps.onFocus(e);
          registerProps.onFocus && registerProps.onFocus(e);
        }}
        onChange={e => {
          inputProps.onChange && inputProps.onChange(e);
          registerProps.onChange && registerProps.onChange(e);
          if (speak && e.target.value) {
            speak(e.target.value);
          }
        }}
      />
      {error && (
        <span id={`${name || 'input'}-error`}>
          {typeof error === 'object' && error.message ? error.message : error}
        </span>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput; 