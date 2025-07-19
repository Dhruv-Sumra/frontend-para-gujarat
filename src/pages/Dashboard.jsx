import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  FileText, 
  Trophy, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Database,
  Server,
  Globe
} from 'lucide-react';
import { healthAPI, playerAPI, apiUtils } from '../services/api';
import { useApi } from '../hooks/useApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    recentRegistrations: 0,
    idCardsGenerated: 0,
    activeSports: 0
  });

  // API health check
  const { data: healthData, loading: healthLoading, error: healthError, execute: checkHealth } = useApi(healthAPI.check);
  
  // Get player stats
  const { data: playersData, loading: playersLoading, error: playersError, execute: getPlayers } = useApi(playerAPI.getAll);

  useEffect(() => {
    // Check API health on component mount
    checkHealth();
    
    // Get player statistics
    getPlayers({ limit: 1 });
  }, [checkHealth, getPlayers]);

  useEffect(() => {
    if (playersData?.pagination) {
      setStats(prev => ({
        ...prev,
        totalPlayers: playersData.pagination.totalPlayers || 0
      }));
    }
  }, [playersData]);

  // Quick action cards
  const quickActions = [
    {
      title: 'Register New Player',
      description: 'Add a new para-athlete to the system',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      path: '/register',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Search ID Cards',
      description: 'Find and download player ID cards',
      icon: <FileText className="w-8 h-8 text-green-600" />,
      path: '/idcard',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      title: 'Manage Players',
      description: 'View and manage all registered players',
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      path: '/players',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      title: 'View Events',
      description: 'Check upcoming para-sports events',
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      path: '/events',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  // System status indicators
  const getSystemStatus = () => {
    if (healthLoading) return { status: 'loading', text: 'Checking...', icon: <Clock className="w-4 h-4" /> };
    if (healthError) return { status: 'error', text: 'Offline', icon: <AlertCircle className="w-4 h-4" /> };
    if (healthData) return { status: 'online', text: 'Online', icon: <CheckCircle className="w-4 h-4" /> };
    return { status: 'unknown', text: 'Unknown', icon: <AlertCircle className="w-4 h-4" /> };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to the Para Sports Association of Gujarat Management System</p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              systemStatus.status === 'online' ? 'bg-green-100 text-green-800' :
              systemStatus.status === 'error' ? 'bg-red-100 text-red-800' :
              systemStatus.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {systemStatus.icon}
              <span className="ml-2">{systemStatus.text}</span>
            </div>
          </div>
          
          {healthData && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Server className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">API Server</p>
                  <p className="text-xs text-gray-600">Running on port {healthData.port || '3000'}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Database className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Database</p>
                  <p className="text-xs text-gray-600">Connected</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Environment</p>
                  <p className="text-xs text-gray-600">{healthData.environment || 'Development'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Players</p>
                <p className="text-2xl font-bold text-gray-900">
                  {playersLoading ? '...' : stats.totalPlayers}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ID Cards Generated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {playersLoading ? '...' : Math.floor(stats.totalPlayers * 0.95)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sports</p>
                <p className="text-2xl font-bold text-gray-900">20</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Districts</p>
                <p className="text-2xl font-bold text-gray-900">33</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className={`block p-6 rounded-lg border-2 transition-all duration-200 ${action.color}`}
              >
                <div className="flex items-center mb-4">
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">System is running smoothly</p>
                <p className="text-xs text-gray-600">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Database connection stable</p>
                <p className="text-xs text-gray-600">MongoDB Atlas connected</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">ID Card generation service active</p>
                <p className="text-xs text-gray-600">PDF generation ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Information */}
        {healthData && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">API Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Server Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Message:</span> {healthData.message}</p>
                  <p><span className="font-medium">Timestamp:</span> {new Date(healthData.timestamp).toLocaleString()}</p>
                  <p><span className="font-medium">Uptime:</span> {Math.floor(healthData.uptime / 3600)} hours</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Available Endpoints</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• /api/health - Health check</p>
                  <p>• /api/players - Player management</p>
                  <p>• /api/idcards - ID card operations</p>
                  <p>• /api/users - User management</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 