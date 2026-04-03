import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { TodoStats, ProgressBar } from '@/components/TodoStats';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Home Page - To-Do List Application
 * Design: Minimalist Productivity with Subtle Depth
 * 
 * Layout:
 * - Header with title and stats
 * - Input section for adding tasks
 * - Task list with smooth animations
 * - Empty state with illustration
 * - Footer with action buttons
 * 
 * Color Scheme:
 * - Primary: Soft slate blue (#4F6B8E)
 * - Accent: Warm amber (#F4A460)
 * - Success: Soft green (#6BA587)
 * - Background: Off-white (#FAFBFC)
 */
export default function Home() {
  const {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  } = useTodos();

  const completedTodos = todos.filter(t => t.completed);
  const pendingTodos = todos.filter(t => !t.completed);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663512122456/6HtfrAFfuLXu9J4EBcWSdJ/hero-bg-W5vmUtPi6uJ6oefMdfYZZH.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40" />
        
        <div className="relative container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              My Tasks
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay organized and productive with your personal to-do list
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Stats Section */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TodoStats
                total={stats.total}
                completed={stats.completed}
                pending={stats.pending}
              />
            </motion.div>
          )}

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TodoInput onAdd={addTodo} isLoading={isLoading} />
          </motion.div>

          {/* Progress Bar */}
          {!isLoading && stats.total > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <ProgressBar completed={stats.completed} total={stats.total} />
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="flex justify-center mb-6">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663512122456/6HtfrAFfuLXu9J4EBcWSdJ/empty-state-illustration-Kc4EKJtEYzh7iQtKmZLBj9.webp"
                  alt="No tasks"
                  className="w-32 h-32 opacity-80"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No tasks yet
              </h2>
              <p className="text-muted-foreground">
                Add your first task to get started!
              </p>
            </motion.div>
          )}

          {/* Tasks List */}
          {!isLoading && todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-4"
            >
              {/* Pending Tasks */}
              {pendingTodos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground px-1">
                    Pending ({pendingTodos.length})
                  </h3>
                  <AnimatePresence mode="popLayout">
                    {pendingTodos.map(todo => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTodos.length > 0 && (
                <div className="space-y-3 mt-8">
                  <h3 className="text-sm font-semibold text-muted-foreground px-1">
                    Completed ({completedTodos.length})
                  </h3>
                  <AnimatePresence mode="popLayout">
                    {completedTodos.map(todo => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          {!isLoading && completedTodos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex gap-3 pt-4 border-t border-border"
            >
              <Button
                onClick={clearCompleted}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Completed
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            Your tasks are saved automatically to your browser.
            {' '}
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Stay productive!
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
