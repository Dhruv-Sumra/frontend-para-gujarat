import React, { useState } from 'react';
import { Search, Download, Mail, Shield, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { idCardAPI, apiUtils } from '../services/api';
import { useFormSubmit } from '../hooks/useApi';
import toast from 'react-hot-toast';

const IdCardSearch = () => {
  const [searchMode, setSearchMode] = useState('search'); // 'search' or 'otp'
  const [playerId, setPlayerId] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);

  // API hooks
  const { loading: searchLoading, error: searchError, submit: searchSubmit, reset: resetSearch } = useFormSubmit(idCardAPI.search);
  const { loading: otpLoading, error: otpError, submit: sendOtpSubmit, reset: resetOtp } = useFormSubmit(idCardAPI.sendOTP);
  const { loading: verifyLoading, error: verifyError, submit: verifyOtpSubmit, reset: resetVerify } = useFormSubmit(idCardAPI.verifyOTP);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!playerId.trim() || !email.trim()) {
      toast.error('Please enter both Player ID and Email');
      return;
    }

    try {
      const response = await searchSubmit(playerId, email);
      setPlayerData(response.data.player);
      setShowOtpForm(true);
      toast.success('Player found! Please verify with OTP to download ID card.');
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Handle OTP send
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await sendOtpSubmit(email);
      toast.success('OTP sent to your email!');
      setSearchMode('otp');
    } catch (error) {
      console.error('OTP send error:', error);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      const response = await verifyOtpSubmit(email, otp);
      setPlayerData(response.data.player);
      toast.success('OTP verified successfully!');
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  // Handle ID card download
  const handleDownloadIdCard = async () => {
    if (!playerData?.playerId) {
      toast.error('No player data available');
      return;
    }

    try {
      const response = await idCardAPI.download(playerData.playerId);
      apiUtils.downloadFile(response.data, `Para_Sports_ID_Card_${playerData.playerId}.pdf`);
      toast.success('ID card downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download ID card. Please try again.');
    }
  };

  // Reset form
  const resetForm = () => {
    setPlayerId('');
    setEmail('');
    setOtp('');
    setPlayerData(null);
    setShowOtpForm(false);
    setSearchMode('search');
    resetSearch();
    resetOtp();
    resetVerify();
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ID Card Search & Download</h1>
          <p className="text-gray-600">Search for your Para Sports ID Card using your Player ID and Email</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Search className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Search for ID Card</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="playerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Player ID *
                </label>
                <input
                  type="text"
                  id="playerId"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="e.g., PS20250001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={searchLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searchLoading ? 'Searching...' : 'Search for ID Card'}
            </button>
          </form>

          {searchError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700">{searchError}</p>
              </div>
            </div>
          )}
        </div>

        {/* OTP Form */}
        {showOtpForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Security Verification</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium">Player Found!</p>
                  <p className="text-blue-700 text-sm mt-1">
                    For security reasons, we need to verify your identity. An OTP has been sent to your registered email address.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={verifyLoading}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {verifyLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {otpLoading ? 'Sending...' : 'Resend OTP'}
                </button>
              </div>
            </form>

            {(otpError || verifyError) && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-red-700">{otpError || verifyError}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Player Information */}
        {playerData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Player Information</h2>
              </div>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {playerData.firstName} {playerData.lastName}</p>
                  <p><span className="font-medium">Player ID:</span> {playerData.playerId}</p>
                  <p><span className="font-medium">Email:</span> {playerData.email}</p>
                  <p><span className="font-medium">Phone:</span> {playerData.phone}</p>
                  <p><span className="font-medium">Date of Birth:</span> {formatDate(playerData.dateOfBirth)}</p>
                  <p><span className="font-medium">Gender:</span> {playerData.gender}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sports Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Primary Sport:</span> {playerData.primarySport}</p>
                  <p><span className="font-medium">Secondary Sport:</span> {playerData.secondarySport || 'None'}</p>
                  <p><span className="font-medium">Experience Level:</span> {playerData.experienceLevel}</p>
                  <p><span className="font-medium">Years of Experience:</span> {playerData.yearsOfExperience}</p>
                  <p><span className="font-medium">Disability Type:</span> {playerData.disabilityType}</p>
                  <p><span className="font-medium">Registration Date:</span> {formatDate(playerData.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">ID Card Status: {playerData.idCardGenerated ? 'Generated' : 'Not Generated'}</span>
                </div>
                <button
                  onClick={handleDownloadIdCard}
                  disabled={!playerData.idCardGenerated}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download ID Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Download Your ID Card</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
              <p>Enter your Player ID and registered email address</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
              <p>Verify your identity with the OTP sent to your email</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
              <p>Download your Para Sports ID Card in PDF format</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> If you don't have your Player ID, please contact your district association or email us at{' '}
              <a href="mailto:psaofgujarat@gmail.com" className="underline">psaofgujarat@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCardSearch; 