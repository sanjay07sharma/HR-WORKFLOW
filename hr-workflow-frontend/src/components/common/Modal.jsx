import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  bodyOverflow = 'auto' // 'auto' for dashboard/list, 'visible' for kanban
}) => {
  const modalRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={cn(
          'w-full bg-white rounded-xl shadow-2xl',
          'transform transition-all',
          'max-h-[90vh] overflow-hidden flex flex-col',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div
          className="flex-1 px-6 py-4"
          style={{ overflowY: bodyOverflow }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
