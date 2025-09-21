import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AccessibleSelect = React.forwardRef(({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  isClearable = false,
  isMulti = false, // eslint-disable-line no-unused-vars
  ...props
}, ref) => {
  // Destructure out custom props so they are not passed to the button
  const { speak, speakField, isAudioEnabled: _isAudioEnabled, ...selectProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null); // eslint-disable-line no-unused-vars
  const [dropdownPosition, setDropdownPosition] = useState('bottom'); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(options.find(option => option.value === value) || null);
  }, [value, options]);

  // Calculate dropdown position to prevent overflow
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      // Always position dropdown below the input field
      setDropdownPosition('bottom');
    }
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options;

  const handleSelect = (option) => {
    if (!option) {
      toast.error('Invalid option selected');
      return;
    }
    
    try {
      setSelectedOption(option);
      setIsOpen(false);
      
      // Call onChange with the selected option
      if (onChange) {
        onChange(option);
      }
      if (speak && option.label) {
        speak(option.label);
      }
      toast.success('Option selected successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to select option');
    }
  };

  const handleClear = (e) => {
    try {
      e.stopPropagation();
      setSelectedOption(null);
      
      // Call onChange with null when clearing
      if (onChange) {
        onChange(null);
      }
      toast.success('Selection cleared');
    } catch (error) {
      toast.error('Failed to clear selection');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && focusedIndex >= 0) {
        handleSelect(filteredOptions[focusedIndex]);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div 
          role="button"
          tabIndex={0}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={selectedOption?.value === option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOption?.value === option.value ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
                tabIndex={0}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <span id={`${props.id || 'select'}-error`} className="text-red-500 text-sm mt-1 block">
          {typeof error === 'object' && error.message ? error.message : error}
        </span>
      )}
    </div>
  );
});

AccessibleSelect.displayName = 'AccessibleSelect';

export default AccessibleSelect;