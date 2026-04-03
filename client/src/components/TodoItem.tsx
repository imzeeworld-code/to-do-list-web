import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Todo } from '@/hooks/useTodos';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * TodoItem Component
 * Design: Minimalist card with smooth animations
 * - Soft shadows and hover elevation for depth
 * - Smooth fade and slide animations on completion/deletion
 * - Amber accent for delete button (warm coral destructive color)
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group"
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg
          bg-card border border-border
          transition-all duration-300 ease-out
          hover:shadow-md hover:border-primary/30
          ${todo.completed ? 'bg-muted/50' : 'hover:bg-background'}
        `}
      >
        {/* Checkbox */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0"
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className={`
              w-5 h-5 rounded
              ${todo.completed ? 'bg-success border-success' : 'border-primary'}
            `}
            aria-label={`Toggle task: ${todo.text}`}
          />
        </motion.div>

        {/* Task Text */}
        <motion.div
          animate={{
            opacity: todo.completed ? 0.6 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-w-0"
        >
          <p
            className={`
              text-sm leading-relaxed break-words
              transition-all duration-300
              ${
                todo.completed
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              }
            `}
          >
            {todo.text}
          </p>
        </motion.div>

        {/* Delete Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            aria-label={`Delete task: ${todo.text}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
