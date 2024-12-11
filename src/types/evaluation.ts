export interface EvaluationResult {
  id: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  content: string;
} 