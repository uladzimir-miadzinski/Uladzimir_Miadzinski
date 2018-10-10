export interface ValidationError {
  allowed?: string | string[];
  current?: string;
  message?: string;
  error?: string;
}
