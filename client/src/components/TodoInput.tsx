import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodoInputProps {
  onAdd: (text: string) => void;
  isLoading?: boolean;
}

/**
 * TodoInput Component
 * Design: Minimalist input with smooth focus transitions
 * - Soft focus ring with primary color
 * - Amber accent button for visual hierarchy
 * - Smooth animations on interaction
 */
export function TodoInput({ onAdd, isLoading = false }: TodoInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
      inputRef.current?.focus();
    }
  };

  // Focus input on mount for better UX
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex gap-2"
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? '0 0 0 3px rgba(79, 107, 142, 0.1)'
            : '0 0 0 0px rgba(79, 107, 142, 0)',
        }}
        transition={{ duration: 0.2 }}
        className="flex-1 rounded-lg"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a new task..."
          disabled={isLoading}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-card border border-border
            text-foreground placeholder:text-muted-foreground
            transition-all duration-300
            focus:outline-none focus:border-primary focus:ring-0
            disabled:opacity-50 disabled:cursor-not-allowed
            text-sm
          `}
          aria-label="New task input"
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`
            px-4 py-3 rounded-lg
            bg-secondary hover:bg-secondary/90 text-secondary-foreground
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2
          `}
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </motion.div>
    </motion.form>
  );
}
