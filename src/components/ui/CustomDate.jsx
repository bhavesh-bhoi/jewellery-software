import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const CustomDate = ({ value, onChange, placeholder, className }) => {
const inputRef = useRef(null);

const handleClick = () => {
if (inputRef.current) {
inputRef.current.showPicker();
}
};

return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={handleClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <Calendar className="w-5 h-5" />
      </button>
    </div>
  );
};
export default CustomDate;