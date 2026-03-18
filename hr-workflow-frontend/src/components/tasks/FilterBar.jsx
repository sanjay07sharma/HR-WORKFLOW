import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../common';
import { useCategories, useDebounce } from '../../hooks';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../config';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const { categories } = useCategories();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch || undefined });
    }
  }, [debouncedSearch]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    onFilterChange({ status: value || undefined });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    onFilterChange({ category: value || undefined });
  };

  const hasActiveFilters = filters.status || filters.category || filters.search;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search tasks, assignee, reference person..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Reference Person filter */}
        <div className="min-w-[180px]">
          <input
            type="text"
            value={filters.referencePerson || ''}
            onChange={(e) => onFilterChange({ referencePerson: e.target.value || undefined })}
            placeholder="Reference person..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="">All Statuses</option>
            {Object.entries(TASK_STATUS).map(([key, value]) => (
              <option key={value} value={value}>
                {TASK_STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <select
            value={filters.category || ''}
            onChange={handleCategoryChange}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchInput('');
              onReset();
            }}
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Active filters:</span>
          {filters.status && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
              Status: {TASK_STATUS_LABELS[filters.status]}
              <button
                onClick={() => onFilterChange({ status: undefined })}
                className="hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
              Category: {categories.find((c) => c._id === filters.category)?.name}
              <button
                onClick={() => onFilterChange({ category: undefined })}
                className="hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
              Search: "{filters.search}"
              <button
                onClick={() => {
                  setSearchInput('');
                  onFilterChange({ search: undefined });
                }}
                className="hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
