import React, { useState, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Upload, User, MapPin, Trophy, Heart, FileText, Camera, UserPlus, Globe } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import AccessibleInput from '../components/AccessibleInput';
import AccessibleSelect from '../components/AccessibleSelect';
import AccessibleTextarea from '../components/AccessibleTextarea';
import { playerAPI } from '../services/api';
import { useFormSubmit } from '../hooks/useApi';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PlayerRegistration = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { register, handleSubmit, formState: { errors }, setValue: _setValue, control, reset } = useForm();
  
  // Use the form submit hook
  const { loading: isSubmitting, error: submitError, success, submit, reset: resetSubmit } = useFormSubmit(playerAPI.register);



  const uniqueIdTypeOptions = [
    { value: 'PCI_LICENCE', label: 'National Licence ID (PCI)' },
    { value: 'NSRS_ID', label: 'NSRS Unique ID' },
    { value: 'UDID', label: 'Unique Disability ID (UDID)' }
  ];

  // Form submission using the API service
  const onSubmit = useCallback(async (data) => {
    try {
      console.log('Form data received:', data);
      
      // Validate required nested fields
      if (!data.address?.street) {
        toast.error('Street address is required');
        return;
      }
      if (!data.emergencyContact?.phone) {
        toast.error('Emergency contact phone is required');
        return;
      }
      
      // Prepare the data object with proper structure
      const submitData = {
        ...data,
        // Ensure nested objects are properly structured
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          postalCode: data.address?.postalCode || '',
          country: data.address?.country || 'India'
        },
        emergencyContact: {
          name: data.emergencyContact?.name || '',
          relationship: data.emergencyContact?.relationship || '',
          phone: data.emergencyContact?.phone || ''
        }
      };
      
      console.log('Prepared submit data:', submitData);
      
      // Always use FormData for consistency with file uploads
      const formData = new FormData();
      
      // Add all non-nested fields
      Object.keys(submitData).forEach(key => {
        if (key !== 'address' && key !== 'emergencyContact' && submitData[key]) {
          formData.append(key, submitData[key]);
        }
      });
      
      // Add nested objects with dot notation
      if (submitData.address) {
        Object.keys(submitData.address).forEach(subKey => {
          if (submitData.address[subKey]) {
            formData.append(`address.${subKey}`, submitData.address[subKey]);
          }
        });
      }
      
      if (submitData.emergencyContact) {
        Object.keys(submitData.emergencyContact).forEach(subKey => {
          if (submitData.emergencyContact[subKey]) {
            formData.append(`emergencyContact.${subKey}`, submitData.emergencyContact[subKey]);
          }
        });
      }
      
      // Add profile photo if present
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }
      
      // Log FormData contents for debugging
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }
      
      const response = await submit(formData);
      toast.success(response.data.message || 'Player registered successfully!');
      
      reset();
      setProfilePhoto(null);
      setPhotoPreview(null);
      resetSubmit();
      setTimeout(() => navigate('/register/success'), 1200);
    } catch (error) {
      console.error('Registration error:', error);
      // The error handling is already done in the API interceptor
    }
  }, [submit, profilePhoto, reset, resetSubmit, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <UserPlus className="w-8 h-8" />
                  {t('playerRegistration')}
                </h1>
                <p className="text-blue-100 mt-2">
                  {t('joinCommunity')}
                </p>
              </div>
              

            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Unique ID Verification */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-orange-500 mt-1 mr-3" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    {t('mandatoryIdVerification')}
                  </h3>
                  <p className="text-orange-700 text-sm mb-4">
                    Please enter your National Licence ID or NSRS Unique ID issued by the Paralympic Committee of India or the Unique Disability ID (UDID).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('idType')}</label>
                      <select {...register('uniqueIdType', { required: 'Please select your ID type' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="">Select ID Type</option>
                        {uniqueIdTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {errors.uniqueIdType && <span className="text-red-500 text-sm">{errors.uniqueIdType.message}</span>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('uniqueIdNumber')}</label>
                      <input {...register('uniqueIdNumber', { required: 'Please enter your unique ID number' })} placeholder="Enter your ID number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" />
                      {errors.uniqueIdNumber && <span className="text-red-500 text-sm">{errors.uniqueIdNumber.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Camera className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Profile Photo</h2>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile preview" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfilePhoto(file);
                        const reader = new FileReader();
                        reader.onload = (e) => setPhotoPreview(e.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('firstName')}</label>
                  <input {...register('firstName', { required: 'First name is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('lastName')}</label>
                  <input {...register('lastName', { required: 'Last name is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input type="date" {...register('dateOfBirth', { required: 'Date of birth is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select {...register('gender', { required: 'Gender is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" {...register('email', { required: 'Email is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input {...register('phone', { required: 'Phone number is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input {...register('address.street', { required: 'Street address is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input {...register('address.city', { required: 'City is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input {...register('address.state', { required: 'State is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.address?.state && <span className="text-red-500 text-sm">{errors.address.state.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                  <input {...register('address.postalCode', { required: 'Postal code is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.address?.postalCode && <span className="text-red-500 text-sm">{errors.address.postalCode.message}</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <input {...register('address.country', { required: 'Country is required' })} defaultValue="India" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.address?.country && <span className="text-red-500 text-sm">{errors.address.country.message}</span>}
              </div>
            </div>

            {/* Sports Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Trophy className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Sports Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Sport *</label>
                  <select {...register('primarySport', { required: 'Primary sport is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Primary Sport</option>
                    <option value="Para Swimming">Para Swimming</option>
                    <option value="Para Athletics">Para Athletics</option>
                    <option value="Wheelchair Basketball">Wheelchair Basketball</option>
                    <option value="Para Badminton">Para Badminton</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.primarySport && <span className="text-red-500 text-sm">{errors.primarySport.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                  <select {...register('experienceLevel', { required: 'Experience level is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Experience Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Elite">Elite</option>
                  </select>
                  {errors.experienceLevel && <span className="text-red-500 text-sm">{errors.experienceLevel.message}</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <input type="number" min="0" {...register('yearsOfExperience', { required: 'Years of experience is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.yearsOfExperience && <span className="text-red-500 text-sm">{errors.yearsOfExperience.message}</span>}
              </div>
            </div>

            {/* Disability Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <Heart className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Disability Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disability Type *</label>
                  <select {...register('disabilityType', { required: 'Disability type is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Disability Type</option>
                    <option value="Physical Impairment">Physical Impairment</option>
                    <option value="Visual Impairment">Visual Impairment</option>
                    <option value="Intellectual Impairment">Intellectual Impairment</option>
                    <option value="Hearing Impairment">Hearing Impairment</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.disabilityType && <span className="text-red-500 text-sm">{errors.disabilityType.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disability Classification *</label>
                  <input {...register('disabilityClassification', { required: 'Disability classification is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.disabilityClassification && <span className="text-red-500 text-sm">{errors.disabilityClassification.message}</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Impairment Description *</label>
                <textarea {...register('impairmentDescription', { required: 'Impairment description is required' })} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                {errors.impairmentDescription && <span className="text-red-500 text-sm">{errors.impairmentDescription.message}</span>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Emergency Contact</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input {...register('emergencyContact.name', { required: 'Emergency contact name is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.emergencyContact?.name && <span className="text-red-500 text-sm">{errors.emergencyContact.name.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                  <input {...register('emergencyContact.relationship', { required: 'Relationship is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.emergencyContact?.relationship && <span className="text-red-500 text-sm">{errors.emergencyContact.relationship.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                  <input {...register('emergencyContact.phone', { required: 'Emergency contact phone is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.emergencyContact?.phone && <span className="text-red-500 text-sm">{errors.emergencyContact.phone.message}</span>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Registering...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Register as Para Athlete
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;