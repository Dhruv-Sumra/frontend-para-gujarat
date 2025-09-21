import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Download, Eye, RefreshCw, Users, Trophy, MapPin } from 'lucide-react';
import { playerAPI, idCardAPI, apiUtils } from '../services/api';
import { usePaginatedApi } from '../hooks/useApi';
import toast from 'react-hot-toast';

const PlayerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDisability, setSelectedDisability] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  // Use paginated API hook for players
  const {
    data: players,
    pagination,
    loading,
    error,
    fetchData,
    loadMore,
    refresh,
    updateParams
  } = usePaginatedApi(playerAPI.getAll, {
    page: 1,
    limit: 10,
    search: '',
    sport: '',
    disabilityType: ''
  });

  // Sports options
  const sportsOptions = [
    'Wheelchair Basketball',
    'Para Swimming',
    'Para Athletics',
    'Wheelchair Tennis',
    'Para Powerlifting',
    'Para Cycling',
    'Wheelchair Rugby',
    'Para Table Tennis',
    'Para Badminton',
    'Para Archery',
    'Para Shooting',
    'Para Judo',
    'Para Taekwondo',
    'Para Rowing',
    'Para Canoe',
    'Para Triathlon',
    'Para Alpine Skiing',
    'Para Cross-Country Skiing',
    'Para Snowboarding',
    'Para Ice Hockey',
    'Other'
  ];

  // Disability options
  const disabilityOptions = [
    'Physical Impairment',
    'Visual Impairment',
    'Intellectual Impairment',
    'Hearing Impairment',
    'Multiple Disabilities',
    'Short Stature',
    'Limb Deficiency',
    'Hypertonia',
    'Ataxia',
    'Athetosis',
    'Spinal Cord Injury',
    'Cerebral Palsy',
    'Amputation',
    'Dwarfism',
    'Muscular Dystrophy',
    'Spina Bifida',
    'Polio',
    'Other'
  ];

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({
      search: searchTerm,
      sport: selectedSport,
      disabilityType: selectedDisability,
      page: 1
    });
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === 'sport') {
      setSelectedSport(value);
    } else if (type === 'disability') {
      setSelectedDisability(value);
    }
    
    updateParams({
      search: searchTerm,
      sport: type === 'sport' ? value : selectedSport,
      disabilityType: type === 'disability' ? value : selectedDisability,
      page: 1
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSport('');
    setSelectedDisability('');
    updateParams({
      search: '',
      sport: '',
      disabilityType: '',
      page: 1
    });
  };

  // Download ID card
  const handleDownloadIdCard = async (playerId) => {
    try {
      const response = await idCardAPI.download(playerId);
      apiUtils.downloadFile(response.data, `Para_Sports_ID_Card_${playerId}.pdf`);
      toast.success('ID card downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download ID card');
    }
  };

  // Delete player
  const handleDeletePlayer = async (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await playerAPI.delete(playerId);
        toast.success('Player deleted successfully!');
        refresh();
      } catch (error) {
        toast.error('Failed to delete player');
      }
    }
  };

  // View player details
  const handleViewPlayer = (player) => {
    setSelectedPlayer(player);
    setShowPlayerModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  // Get sport icon
  const getSportIcon = (sport) => {
    const sportIcons = {
      'Para Athletics': '🏃',
      'Para Swimming': '🏊',
      'Para Powerlifting': '🏋️',
      'Para Shooting': '🎯',
      'Para Badminton': '🏸',
      'Para Table Tennis': '🏓',
      'Para Archery': '🏹',
      'Para Cycling': '🚴',
      'Para Judo': '🥋',
      'Para Taekwondo': '🥋',
      'Wheelchair Basketball': '🏀',
      'Wheelchair Tennis': '🎾',
      'Wheelchair Rugby': '🏉',
      'Para Rowing': '🚣',
      'Para Canoe': '🛶',
      'Para Triathlon': '🏃‍♂️',
      'Other': '🏆'
    };
    return sportIcons[sport] || '🏆';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
              <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Management</h1>
          <p className="text-gray-600">Manage and view all registered para-athletes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Players</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.totalItems || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sports</p>
                <p className="text-2xl font-bold text-gray-900">{sportsOptions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Districts</p>
                <p className="text-2xl font-bold text-gray-900">33</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <RefreshCw className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-2xl font-bold text-gray-900">Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sport Filter */}
                <select
                  value={selectedSport}
                  onChange={(e) => handleFilterChange('sport', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Sports</option>
                  {sportsOptions.map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>

                {/* Disability Filter */}
                <select
                  value={selectedDisability}
                  onChange={(e) => handleFilterChange('disability', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Disabilities</option>
                  {disabilityOptions.map((disability) => (
                    <option key={disability} value={disability}>{disability}</option>
                  ))}
                </select>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Players</h2>
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading && (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">Loading players...</p>
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <p className="text-red-600">Error: {error}</p>
              <button
                onClick={refresh}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && players && players.length === 0 && (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">No players found</p>
            </div>
          )}

          {!loading && !error && players && players.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sport
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Disability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {players.map((player) => (
                      <tr key={player._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {player.profilePhoto ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={player.profilePhoto}
                                  alt={player.firstName}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {player.firstName?.[0]}{player.lastName?.[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {player.firstName} {player.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {player.email}
                              </div>
                              <div className="text-xs text-gray-400">
                                ID: {player.playerId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getSportIcon(player.primarySport)}</span>
                            <span className="text-sm text-gray-900">{player.primarySport}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{player.disabilityType}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{player.address?.city}</div>
                          <div className="text-sm text-gray-500">{player.address?.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(player.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewPlayer(player)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownloadIdCard(player.playerId)}
                              className="text-green-600 hover:text-green-900"
                              title="Download ID Card"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePlayer(player._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Player"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => fetchData({ page: pagination.currentPage - 1 })}
                      disabled={!pagination.hasPrevPage}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchData({ page: pagination.currentPage + 1 })}
                      disabled={!pagination.hasNextPage}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span>
                        {' '}to{' '}
                        <span className="font-medium">
                          {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}
                        </span>
                        {' '}of{' '}
                        <span className="font-medium">{pagination.totalItems}</span>
                        {' '}results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => fetchData({ page: pagination.currentPage - 1 })}
                          disabled={!pagination.hasPrevPage}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => fetchData({ page: pagination.currentPage + 1 })}
                          disabled={!pagination.hasNextPage}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Player Details Modal */}
      {showPlayerModal && selectedPlayer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Player Details - {selectedPlayer.firstName} {selectedPlayer.lastName}
                </h3>
                <button
                  onClick={() => setShowPlayerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedPlayer.firstName} {selectedPlayer.lastName}</p>
                    <p><span className="font-medium">Email:</span> {selectedPlayer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedPlayer.phone}</p>
                    <p><span className="font-medium">Player ID:</span> {selectedPlayer.playerId}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formatDate(selectedPlayer.dateOfBirth)}</p>
                    <p><span className="font-medium">Gender:</span> {selectedPlayer.gender}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sports Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Primary Sport:</span> {selectedPlayer.primarySport}</p>
                    <p><span className="font-medium">Secondary Sport:</span> {selectedPlayer.secondarySport || 'None'}</p>
                    <p><span className="font-medium">Experience Level:</span> {selectedPlayer.experienceLevel}</p>
                    <p><span className="font-medium">Years of Experience:</span> {selectedPlayer.yearsOfExperience}</p>
                    <p><span className="font-medium">Coach:</span> {selectedPlayer.coachName || 'None'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Disability Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {selectedPlayer.disabilityType}</p>
                    <p><span className="font-medium">Classification:</span> {selectedPlayer.disabilityClassification}</p>
                    <p><span className="font-medium">Description:</span> {selectedPlayer.impairmentDescription}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Street:</span> {selectedPlayer.address?.street}</p>
                    <p><span className="font-medium">City:</span> {selectedPlayer.address?.city}</p>
                    <p><span className="font-medium">State:</span> {selectedPlayer.address?.state}</p>
                    <p><span className="font-medium">Postal Code:</span> {selectedPlayer.address?.postalCode}</p>
                    <p><span className="font-medium">Country:</span> {selectedPlayer.address?.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadIdCard(selectedPlayer.playerId)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download ID Card
                </button>
                <button
                  onClick={() => setShowPlayerModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerManagement; 