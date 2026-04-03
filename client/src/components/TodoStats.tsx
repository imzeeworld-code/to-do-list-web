import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

/**
 * TodoStats Component
 * Design: Minimalist stat cards with soft shadows
 * - Displays task overview with icons
 * - Smooth animations on mount
 * - Color-coded for visual clarity
 */
export function TodoStats({ total, completed, pending }: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/5',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Circle,
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              p-3 rounded-lg border border-border
              ${stat.bgColor}
              transition-all duration-300 hover:shadow-sm
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * ProgressBar Component
 * Design: Minimalist progress indicator
 * - Shows completion percentage
 * - Smooth animation on value change
 */
export function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">
          Progress
        </span>
        <span className="text-sm font-semibold text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </div>
  );
}
