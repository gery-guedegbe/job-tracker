import {
  type ReactNode,
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string | undefined;
  selectedLabel: string | undefined;
  handleSelect: (value: string, label: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select provider");
  }
  return context;
};

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (newValue: string, label: string) => {
    setSelectedValue(newValue);
    setSelectedLabel(label);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, selectedValue, selectedLabel, handleSelect }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SelectTrigger({
  children,
  id,
  className = "",
}: SelectTriggerProps) {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <button
      id={id}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-primary flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export function SelectValue({ placeholder, className = "" }: SelectValueProps) {
  const { selectedLabel, selectedValue } = useSelectContext();
  return (
    <span className={`block truncate ${className}`}>
      {selectedLabel || selectedValue || placeholder}
    </span>
  );
}

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

export function SelectContent({
  children,
  className = "",
}: SelectContentProps) {
  const { isOpen, setIsOpen } = useSelectContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className={`bg-card absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border shadow-lg ${className}`}
        >
          <div className="p-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function SelectItem({
  value,
  children,
  className = "",
}: SelectItemProps) {
  const { selectedValue, handleSelect } = useSelectContext();

  // Extract label from children (if it's a string or text element)
  const label = typeof children === "string" ? children : value;

  return (
    <button
      type="button"
      onClick={() => handleSelect(value, label)}
      className={`hover:bg-muted relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm transition-colors outline-none select-none ${
        selectedValue === value ? "bg-muted" : ""
      } ${className}`}
    >
      <span className="flex-1 text-left">{children}</span>
      {selectedValue === value && (
        <Check className="text-primary ml-2 h-4 w-4" />
      )}
    </button>
  );
}
