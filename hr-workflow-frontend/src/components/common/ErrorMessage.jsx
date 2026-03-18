import { AlertCircle } from 'lucide-react';
import Button from './Button';

const ErrorMessage = ({
  message = 'Something went wrong',
  onRetry = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Error</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-4">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
