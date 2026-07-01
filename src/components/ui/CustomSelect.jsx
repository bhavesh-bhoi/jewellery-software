import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder, className }) => {
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
const handleClickOutside = (e) => {
if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
setIsOpen(false);
}
};
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const selectedOption = options.find(opt => opt.value === value);

return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition flex items-center justify-between"
      >
        <span>{selectedOption?.label || placeholder || 'Select...'}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-50 max-h-48 overflow-auto hide-scrollbar">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default CustomSelect;