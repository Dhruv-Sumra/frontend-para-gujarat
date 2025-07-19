import { useState, useEffect, useCallback, useRef } from 'react';
import { apiUtils } from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (...args) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was cancelled, don't set error
        return;
      }
      
      const errorMessage = apiUtils.formatError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [apiCall]);

  const refresh = useCallback(async (...args) => {
    setRefreshing(true);
    try {
      const result = await execute(...args);
      setRefreshing(false);
      return result;
    } catch (err) {
      setRefreshing(false);
      throw err;
    }
  }, [execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setRefreshing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refreshing,
    execute,
    refresh,
    reset,
    setData,
    setError
  };
};

// Hook for paginated data
export const usePaginatedApi = (apiCall, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (pageParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall({ ...params, ...pageParams });
      
      if (response.data) {
        if (pageParams.page === 1 || !pageParams.page) {
          // First page or no page specified - replace data
          setData(response.data);
        } else {
          // Subsequent pages - append data
          setData(prev => [...prev, ...response.data]);
        }
        
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
      
      return response;
    } catch (err) {
      const errorMessage = apiUtils.formatError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall, params]);

  const loadMore = useCallback(() => {
    if (pagination.hasNextPage && !loading) {
      return fetchData({ page: pagination.currentPage + 1 });
    }
  }, [fetchData, pagination.hasNextPage, pagination.currentPage, loading]);

  const refresh = useCallback(() => {
    return fetchData({ page: 1 });
  }, [fetchData]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const reset = useCallback(() => {
    setData([]);
    setPagination({
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      hasNextPage: false,
      hasPrevPage: false,
      limit: 10
    });
    setError(null);
    setLoading(false);
    setParams(initialParams);
  }, [initialParams]);

  return {
    data,
    pagination,
    loading,
    error,
    fetchData,
    loadMore,
    refresh,
    updateParams,
    reset,
    setData,
    setError
  };
};

// Hook for form submission
export const useFormSubmit = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await apiCall(...args);
      setSuccess(true);
      return response;
    } catch (err) {
      const errorMessage = apiUtils.formatError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    submit,
    reset,
    setError
  };
};

// Hook for real-time data updates
export const useRealtimeData = (apiCall, interval = 30000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = apiUtils.formatError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Fetch immediately
    fetchData();
    
    // Set up interval
    intervalRef.current = setInterval(fetchData, interval);
  }, [fetchData, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    startPolling,
    stopPolling,
    setData,
    setError
  };
}; 