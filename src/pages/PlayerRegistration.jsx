// PlayerRegistration.jsx for main website, adapted from idcard version (no audio/screenreader features)
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
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PlayerRegistration = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formLanguage, setFormLanguage] = useState('en');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue: _setValue, control, reset } = useForm();
  
  // Use the form submit hook
  const { loading: isSubmitting, error: submitError, success, submit, reset: resetSubmit } = useFormSubmit(playerAPI.register);

  // Options (copied from idcard)
  const sportsOptions = useMemo(() => [
    { value: 'Wheelchair Basketball', label: 'Wheelchair Basketball' },
    { value: 'Wheelchair Tennis', label: 'Wheelchair Tennis' },
    { value: 'Wheelchair Rugby', label: 'Wheelchair Rugby' },
    { value: 'Para Athletics', label: 'Para Athletics' },
    { value: 'Para Swimming', label: 'Para Swimming' },
    { value: 'Para Powerlifting', label: 'Para Powerlifting' },
    { value: 'Para Table Tennis', label: 'Para Table Tennis' },
    { value: 'Para Badminton', label: 'Para Badminton' },
    { value: 'Para Tennis', label: 'Para Tennis' },
    { value: 'Para Volleyball', label: 'Para Volleyball' },
    { value: 'Para Archery', label: 'Para Archery' },
    { value: 'Para Cycling', label: 'Para Cycling' },
    { value: 'Para Judo', label: 'Para Judo' },
    { value: 'Para Taekwondo', label: 'Para Taekwondo' },
    { value: 'Para Triathlon', label: 'Para Triathlon' },
    { value: 'Para Sailing', label: 'Para Sailing' },
    { value: 'Para Canoe', label: 'Para Canoe' },
    { value: 'Para Rowing', label: 'Para Rowing' },
    { value: 'Para Equestrian', label: 'Para Equestrian' },
    { value: 'Para Shooting', label: 'Para Shooting' },
    { value: 'Para Boccia', label: 'Para Boccia' },
    { value: 'Para Goalball', label: 'Para Goalball' },
    { value: 'Para Football', label: 'Para Football' },
    { value: 'Para Cricket', label: 'Para Cricket' },
    { value: 'Para Hockey', label: 'Para Hockey' },
    { value: 'Para Golf', label: 'Para Golf' },
    { value: 'Para Alpine Skiing', label: 'Para Alpine Skiing' },
    { value: 'Para Cross-Country Skiing', label: 'Para Cross-Country Skiing' },
    { value: 'Para Snowboarding', label: 'Para Snowboarding' },
    { value: 'Para Ice Hockey', label: 'Para Ice Hockey' },
    { value: 'Para Curling', label: 'Para Curling' },
    { value: 'Para Bobsleigh', label: 'Para Bobsleigh' },
    { value: 'Para Skeleton', label: 'Para Skeleton' },
    { value: 'Para Luge', label: 'Para Luge' },
    { value: 'Para Biathlon', label: 'Para Biathlon' },
    { value: 'Other', label: 'Other' }
  ], []);

  const disabilityOptions = useMemo(() => [
    { value: 'Physical Impairment', label: 'Physical Impairment' },
    { value: 'Visual Impairment', label: 'Visual Impairment' },
    { value: 'Intellectual Impairment', label: 'Intellectual Impairment' },
    { value: 'Hearing Impairment', label: 'Hearing Impairment' },
    { value: 'Multiple Disabilities', label: 'Multiple Disabilities' },
    { value: 'Other', label: 'Other' }
  ], []);

  const experienceOptions = useMemo(() => [
    { value: 'Beginner', label: 'Beginner (0-1 years)' },
    { value: 'Intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'Advanced', label: 'Advanced (6-10 years)' },
    { value: 'Elite', label: 'Elite (10+ years)' }
  ], []);

  const genderOptions = useMemo(() => [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ], []);

  const disabilityClassificationOptions = useMemo(() => [
    { value: 'T/F11-T/F13', label: 'T/F11-T/F13 (Visual Impairment)' },
    { value: 'T/F20', label: 'T/F20 (Intellectual Impairment)' },
    { value: 'T/F31-T/F38', label: 'T/F31-T/F38 (Coordination Impairments)' },
    { value: 'T/F40-T/F41', label: 'T/F40-T/F41 (Short Stature)' },
    { value: 'T/F42-T/F47', label: 'T/F42-T/F47 (Limb Deficiency, Leg Length Difference, Impaired Muscle Power or Impaired Range of Movement)' },
    { value: 'T/F51-T/F57', label: 'T/F51-T/F57 (Wheelchair Track & Field)' },
    { value: 'S1-S10', label: 'S1-S10 (Physical Impairment - Swimming)' },
    { value: 'S11-S13', label: 'S11-S13 (Visual Impairment - Swimming)' },
    { value: 'S14', label: 'S14 (Intellectual Impairment - Swimming)' },
    { value: 'SB1-SB9', label: 'SB1-SB9 (Breaststroke - Swimming)' },
    { value: 'SM1-SM10', label: 'SM1-SM10 (Medley - Swimming)' },
    { value: 'LW1-LW12', label: 'LW1-LW12 (Winter Sports)' },
    { value: 'B1-B3', label: 'B1-B3 (Blind/Visually Impaired)' },
    { value: 'SH1, SH2', label: 'SH1, SH2 (Shooting)' },
    { value: 'C1-C5', label: 'C1-C5 (Cycling)' },
    { value: 'H1-H5', label: 'H1-H5 (Handcycling)' },
    { value: 'T1-T2', label: 'T1-T2 (Tricycle)' },
    { value: 'PT1-PT5', label: 'PT1-PT5 (Paratriathlon)' },
    { value: 'Other', label: 'Other (please specify)' }
  ], []);

  // File upload handling
  const onDrop = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // Form submission using the API service
  const onSubmit = useCallback(async (data) => {
    try {
      const formData = new FormData();
      // Flatten and append all fields
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('passportNumber', data.passportNumber || '');
      formData.append('dateOfBirth', data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : '');
      formData.append('gender', data.gender || '');
      // Address
      formData.append('address.street', data.address?.streetAddress || '');
      formData.append('address.city', data.address?.city || '');
      formData.append('address.state', data.address?.state || '');
      formData.append('address.postalCode', data.address?.postalCode || '');
      formData.append('address.country', data.address?.country || '');
      // Sports
      formData.append('primarySport', data.primarySport || '');
      if (data.secondarySport && data.secondarySport.trim() !== '') {
        formData.append('secondarySport', data.secondarySport);
      }
      formData.append('experienceLevel', data.experienceLevel || '');
      formData.append('yearsOfExperience', data.yearsOfExperience || '');
      formData.append('coachName', data.coachName || '');
      formData.append('coachContact', data.coachContact || '');
      formData.append('achievements', data.achievements || '');
      // Disability
      formData.append('disabilityType', data.disabilityType || '');
      formData.append('disabilityClassification', data.disabilityClassification || '');
      formData.append('impairmentDescription', data.impairmentDescription || '');
      // Medical
      formData.append('emergencyContact.name', data.emergencyContact?.name || '');
      formData.append('emergencyContact.relationship', data.emergencyContact?.relationship || '');
      formData.append('emergencyContact.phone', data.emergencyContact?.phone || '');
      formData.append('medicalConditions', data.medicalConditions || '');
      formData.append('medications', data.medications || '');
      formData.append('allergies', data.allergies || '');
      // Photo
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }
      
      const response = await submit(formData);
      toast.success(response.data.message || 'Player registered successfully!');
      reset();
      setProfilePhoto(null);
      setPhotoPreview(null);
      resetSubmit();
      setTimeout(() => navigate('/register/success'), 1200);
    } catch (error) {
      // Error is already handled by the hook
      console.error('Registration error:', error);
    }
  }, [profilePhoto, reset, navigate, submit, resetSubmit]);

  // Translation object
  const formTranslations = useMemo(() => ({
    en: {
      'Player Registration Form': 'Player Registration Form',
      'Personal Information': 'Personal Information',
      'Address Information': 'Address Information',
      'Sports Information': 'Sports Information',
      'Disability Information': 'Disability Information',
      'Medical Information': 'Medical Information',
      'Profile Photo': 'Profile Photo',
      'First Name': 'First Name',
      'Last Name': 'Last Name',
      'Date of Birth': 'Date of Birth',
      'Gender': 'Gender',
      'Email Address': 'Email Address',
      'Phone Number': 'Phone Number',
      'Passport Number': 'Passport Number',
      'Street Address': 'Street Address',
      'City': 'City',
      'State': 'State',
      'Postal Code': 'Postal Code',
      'Country': 'Country',
      'Primary Sport': 'Primary Sport',
      'Secondary Sport': 'Secondary Sport',
      'Experience Level': 'Experience Level',
      'Years of Experience': 'Years of Experience',
      'Coach Name': 'Coach Name',
      'Coach Contact': 'Coach Contact',
      'Achievements': 'Achievements',
      'Disability Type': 'Disability Type',
      'Disability Classification': 'Disability Classification',
      'Impairment Description': 'Impairment Description',
      'Emergency Contact Name': 'Emergency Contact Name',
      'Relationship': 'Relationship',
      'Emergency Contact Phone': 'Emergency Contact Phone',
      'Medical Conditions': 'Medical Conditions',
      'Medications': 'Medications',
      'Allergies': 'Allergies',
      'Select date of birth': 'Select date of birth',
      'Select gender': 'Select gender',
      'Select primary sport': 'Select primary sport',
      'Select secondary sport (optional)': 'Select secondary sport (optional)',
      'Select experience level': 'Select experience level',
      'Select disability type': 'Select disability type',
      'e.g., T44, S10, etc.': 'e.g., T44, S10, etc.',
      'Please describe your impairment in detail': 'Please describe your impairment in detail',
      'e.g., Parent, Spouse, Guardian': 'e.g., Parent, Spouse, Guardian',
      'List any relevant medical conditions': 'List any relevant medical conditions',
      'List any medications you are currently taking': 'List any medications you are currently taking',
      'List your sports achievements, medals, records, etc.': 'List your sports achievements, medals, records, etc.',
      'JPG, PNG, GIF up to 5MB': 'JPG, PNG, GIF up to 5MB',
      'Register Player & Generate ID Card': 'Register Player & Generate ID Card',
      'Registering Player...': 'Registering Player...',
      'English': 'English',
      'Hindi': 'Hindi',
      'Gujarati': 'Gujarati',
    },
    hi: {
      'Player Registration Form': 'खिलाड़ी पंजीकरण फॉर्म',
      'Personal Information': 'व्यक्तिगत जानकारी',
      'Address Information': 'पता जानकारी',
      'Sports Information': 'खेल जानकारी',
      'Disability Information': 'अक्षमता जानकारी',
      'Medical Information': 'चिकित्सीय जानकारी',
      'Profile Photo': 'प्रोफाइल फोटो',
      'First Name': 'पहला नाम',
      'Last Name': 'अंतिम नाम',
      'Date of Birth': 'जन्म तिथि',
      'Gender': 'लिंग',
      'Email Address': 'ईमेल पता',
      'Phone Number': 'फोन नंबर',
      'Passport Number': 'पासपोर्ट नंबर',
      'Street Address': 'सड़क का पता',
      'City': 'शहर',
      'State': 'राज्य',
      'Postal Code': 'पिन कोड',
      'Country': 'देश',
      'Primary Sport': 'मुख्य खेल',
      'Secondary Sport': 'द्वितीयक खेल',
      'Experience Level': 'अनुभव स्तर',
      'Years of Experience': 'अनुभव के वर्ष',
      'Coach Name': 'कोच का नाम',
      'Coach Contact': 'कोच का संपर्क',
      'Achievements': 'उपलब्धियां',
      'Disability Type': 'अक्षमता का प्रकार',
      'Disability Classification': 'अक्षमता वर्गीकरण',
      'Impairment Description': 'अक्षमता का विवरण',
      'Emergency Contact Name': 'आपातकालीन संपर्क का नाम',
      'Relationship': 'संबंध',
      'Emergency Contact Phone': 'आपातकालीन संपर्क फोन',
      'Medical Conditions': 'चिकित्सीय स्थितियां',
      'Medications': 'दवाएं',
      'Allergies': 'एलर्जी',
      'Select date of birth': 'जन्म तिथि चुनें',
      'Select gender': 'लिंग चुनें',
      'Select primary sport': 'मुख्य खेल चुनें',
      'Select secondary sport (optional)': 'द्वितीयक खेल चुनें (वैकल्पिक)',
      'Select experience level': 'अनुभव स्तर चुनें',
      'Select disability type': 'अक्षमता का प्रकार चुनें',
      'e.g., T44, S10, etc.': 'जैसे, टी44, एस10, आदि',
      'Please describe your impairment in detail': 'कृपया अपनी अक्षमता का विस्तार से वर्णन करें',
      'e.g., Parent, Spouse, Guardian': 'जैसे, माता-पिता, पति/पत्नी, अभिभावक',
      'List any relevant medical conditions': 'कोई भी प्रासंगिक चिकित्सीय स्थितियां सूचीबद्ध करें',
      'List any medications you are currently taking': 'वर्तमान में ली जा रही कोई भी दवाएं सूचीबद्ध करें',
      'List your sports achievements, medals, records, etc.': 'अपनी खेल उपलब्धियां, पदक, रिकॉर्ड आदि सूचीबद्ध करें',
      'JPG, PNG, GIF up to 5MB': 'जेपीज, पीएनज, जीआइएफ 5 एमबी तक',
      'Register Player & Generate ID Card': 'खिलाड़ी पंजीकरण करें और आईडी कार्ड बनाएं',
      'Registering Player...': 'खिलाड़ी पंजीकरण हो रहा है...',
      'English': 'अंग्रेज़ी',
      'Hindi': 'हिंदी',
      'Gujarati': 'ગુજરાતી',
    },
    gu: {
      'Player Registration Form': 'ખેલાડી નોંધણી ફોર્મ',
      'Personal Information': 'વ્યક્તિગત માહિતી',
      'Address Information': 'સરનામું માહિતી',
      'Sports Information': 'ક્રીડા માહિતી',
      'Disability Information': 'અપંગતા માહિતી',
      'Medical Information': 'દવાકીય માહિતી',
      'Profile Photo': 'પ્રોફાઇલ ફોટો',
      'First Name': 'પહેલું નામ',
      'Last Name': 'છેલ્લું નામ',
      'Date of Birth': 'જન્મ તારીખ',
      'Gender': 'લિંગ',
      'Email Address': 'ઈમેઇલ સરનામું',
      'Phone Number': 'ફોન નંબર',
      'Passport Number': 'પાસપોર્ટ નંબર',
      'Street Address': 'શેરીનું સરનામું',
      'City': 'શહેર',
      'State': 'રાજ્ય',
      'Postal Code': 'પીન કોડ',
      'Country': 'દેશ',
      'Primary Sport': 'મુખ્ય ક્રીડા',
      'Secondary Sport': 'દ્વિતીય ક્રીડા',
      'Experience Level': 'અનુભવ સ્તર',
      'Years of Experience': 'અનુભવના વર્ષો',
      'Coach Name': 'કોચનું નામ',
      'Coach Contact': 'કોચનો સંપર્ક',
      'Achievements': 'પ્રાપ્તિઓ',
      'Disability Type': 'અપંગતાનો પ્રકાર',
      'Disability Classification': 'અપંગતા વર્ગીકરણ',
      'Impairment Description': 'અપંગતાનું વર્ણન',
      'Emergency Contact Name': 'કટોકટી સંપર્કનું નામ',
      'Relationship': 'સંબંધ',
      'Emergency Contact Phone': 'કટોકટી સંપર્ક ફોન',
      'Medical Conditions': 'દવાકીય સ્થિતિઓ',
      'Medications': 'દવાઓ',
      'Allergies': 'એલર્જી',
      'Select date of birth': 'જન્મ તારીખ પસંદ કરો',
      'Select gender': 'લિંગ પસંદ કરો',
      'Select primary sport': 'મુખ્ય ક્રીડા પસંદ કરો',
      'Select secondary sport (optional)': 'દ્વિતીય ક્રીડા પસંદ કરો (વૈકલ્પિક)',
      'Select experience level': 'અનુભવ સ્તર પસંદ કરો',
      'Select disability type': 'અપંગતાનો પ્રકાર પસંદ કરો',
      'e.g., T44, S10, etc.': 'દા.ત., ટી44, એસ10, વગેરે',
      'Please describe your impairment in detail': 'કૃપા કરી તમારી અપંગતાનું વિગતવાર વર્ણન કરો',
      'e.g., Parent, Spouse, Guardian': 'દા.ત., માતા-પિતા, પતિ/પત્ની, સંરક્ષક',
      'List any relevant medical conditions': 'કોઈપણ સંબંધિત દવાકીય સ્થિતિઓની યાદી બનાવો',
      'List any medications you are currently taking': 'તમે હાલમાં લઈ રહ્યા છો તે કોઈપણ દવાઓની યાદી બનાવો',
      'List your sports achievements, medals, records, etc.': 'તમારી ક્રીડા પ્રાપ્તિઓ, મેડલ્સ, રેકોર્ડ્સ, વગેરેની યાદી બનાવો',
      'JPG, PNG, GIF up to 5MB': 'જેપીજી, પીએનજી, જીઆઇએફ 5 એમબી સુધી',
      'Register Player & Generate ID Card': 'ખેલાડી નોંધણી કરો અને આઇડી કાર્ડ બનાવો',
      'Registering Player...': 'ખેલાડી નોંધણી થઈ રહી છે...',
      'English': 'અંગ્રેજી',
      'Hindi': 'હિન્દી',
      'Gujarati': 'ગુજરાતી',
    }
  }), []);

  // Translation function
  const t = useCallback((key) => formTranslations[formLanguage]?.[key] || key, [formTranslations, formLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto bg-[var(--card)] rounded-lg shadow p-6 border border-[var(--card-border)]">
        {/* Header with Logos and Title */}
        <div className="flex items-center justify-between mb-8">
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/logo1.png" 
              alt="Gujarat Para Sports Logo 1" 
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Center Title */}
          <div className="flex-1 text-center px-2 md:px-4">
            <h1 className="text-lg md:text-3xl font-bold text-[var(--primary)] mb-2">
              Para Sports Player Registration Form
            </h1>
            <p className="text-[var(--text)] text-sm">
              Gujarat Para Sports Association
            </p>
          </div>
          
          {/* Right Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/logo2.png" 
              alt="Gujarat Para Sports Logo 2" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <Globe size={20} className="text-orange-500" />
          <select
            value={formLanguage}
            onChange={e => setFormLanguage(e.target.value)}
            className="bg-[var(--card)] border border-[var(--card-border)] rounded px-2 py-1 text-[var(--text)] font-medium focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50"
            aria-label="Select form language"
          >
            <option value="en">{t('English')}</option>
            <option value="hi">{t('Hindi')}</option>
            <option value="gu">{t('Gujarati')}</option>
          </select>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Information */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><User size={20}/> {t('Personal Information')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AccessibleInput label={t('First Name')} id="firstName" {...register('firstName', { required: true })} error={errors.firstName} autoComplete="given-name" className="w-full mb-4" />
              <AccessibleInput label={t('Last Name')} id="lastName" {...register('lastName', { required: true })} error={errors.lastName} autoComplete="family-name" className="w-full mb-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <AccessibleInput label={t('Email Address')} id="email" {...register('email', { required: true })} error={errors.email} autoComplete="email" className="w-full mb-4" />
              <AccessibleInput label={t('Phone Number')} id="phone" {...register('phone', { required: true })} error={errors.phone} autoComplete="tel" className="w-full mb-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <AccessibleInput label={t('Passport Number')} id="passportNumber" {...register('passportNumber')} error={errors.passportNumber} autoComplete="off" className="w-full mb-4" />
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text)] mb-1">{t('Date of Birth')}</label>
                <Controller name="dateOfBirth" control={control} render={({ field }) => (
                  <DatePicker selected={field.value} onChange={field.onChange} dateFormat="yyyy-MM-dd" placeholderText={t('Select date of birth')} className="w-full px-4 py-2 border border-[var(--card-border)] rounded-md" maxDate={new Date()} showYearDropdown showMonthDropdown dropdownMode="select" />
                )} />
              </div>
            </div>
            <div className="mt-4">
              <Controller name="gender" control={control} rules={{ required: 'Gender is required' }} render={({ field }) => (
                <AccessibleSelect label={t('Gender')} options={genderOptions} value={field.value} onChange={option => field.onChange(option?.value || '')} isClearable placeholder={t('Select gender')} error={errors.gender} className="w-full mb-4" />
              )} />
            </div>
          </section>

          {/* Address Information */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin size={20}/> {t('Address Information')}</h2>
            <AccessibleInput label={t('Street Address')} {...register('address.streetAddress', { required: 'Street address is required' })} error={errors.address?.streetAddress?.message} required className="w-full mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AccessibleInput label={t('City')} {...register('address.city', { required: 'City is required' })} error={errors.address?.city?.message} required className="w-full mb-4" />
              <AccessibleInput label={t('State')} {...register('address.state', { required: 'State is required' })} error={errors.address?.state?.message} required className="w-full mb-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <AccessibleInput label={t('Postal Code')} {...register('address.postalCode', { required: 'Postal code is required' })} error={errors.address?.postalCode?.message} required className="w-full mb-4" />
              <AccessibleInput label={t('Country')} {...register('address.country', { required: 'Country is required' })} error={errors.address?.country?.message} required className="w-full mb-4" />
            </div>
          </section>

          {/* Sports Information */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Trophy size={20}/> {t('Sports Information')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller name="primarySport" control={control} rules={{ required: 'Primary sport is required' }} render={({ field }) => (
                <AccessibleSelect label={t('Primary Sport')} options={sportsOptions} value={field.value} onChange={option => field.onChange(option?.value || '')} error={errors.primarySport?.message} required className="w-full mb-4" placeholder={t('Select primary sport')} />
              )} />
              <Controller name="secondarySport" control={control} render={({ field }) => (
                <AccessibleSelect label={t('Secondary Sport')} options={sportsOptions} value={field.value} onChange={option => field.onChange(option?.value || '')} error={errors.secondarySport?.message} className="w-full mb-4" placeholder={t('Select secondary sport (optional)')} />
              )} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Controller name="experienceLevel" control={control} rules={{ required: 'Experience level is required' }} render={({ field }) => (
                <AccessibleSelect label={t('Experience Level')} options={experienceOptions} value={field.value} onChange={option => field.onChange(option?.value || '')} error={errors.experienceLevel?.message} required className="w-full mb-4" placeholder={t('Select experience level')} />
              )} />
              <AccessibleInput label={t('Years of Experience')} type="number" min="0" max="50" {...register('yearsOfExperience', { required: 'Years of experience is required', min: { value: 0, message: 'Years must be 0 or more' }, max: { value: 50, message: 'Years must be 50 or less' } })} error={errors.yearsOfExperience?.message} required className="w-full mb-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <AccessibleInput label={t('Coach Name')} {...register('coachName')} error={errors.coachName?.message} className="w-full mb-4" />
              <AccessibleInput label={t('Coach Contact')} type="tel" {...register('coachContact')} error={errors.coachContact?.message} className="w-full mb-4" />
            </div>
            <div className="mt-4">
              <AccessibleTextarea label={t('Achievements')} {...register('achievements')} error={errors.achievements?.message} className="w-full mb-4" rows={3} placeholder={t('List your sports achievements, medals, records, etc.')} />
            </div>
          </section>

          {/* Disability Information */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Heart size={20}/> {t('Disability Information')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller name="disabilityType" control={control} rules={{ required: 'Disability type is required' }} render={({ field }) => (
                <AccessibleSelect label={t('Disability Type')} options={disabilityOptions} value={field.value} onChange={option => field.onChange(option?.value || '')} error={errors.disabilityType?.message} required className="w-full mb-4" placeholder={t('Select disability type')} />
              )} />
              <Controller name="disabilityClassification" control={control} render={({ field }) => (
                <AccessibleSelect label={t('Disability Classification')} options={disabilityClassificationOptions} value={field.value} onChange={option => field.onChange(option.value)} isClearable placeholder={t('e.g., T44, S10, etc.')} error={errors.disabilityClassification} className="w-full mb-4" />
              )} />
            </div>
            <div className="mt-4">
              <AccessibleTextarea label={t('Impairment Description')} {...register('impairmentDescription', { required: 'Impairment description is required' })} error={errors.impairmentDescription?.message} required className="w-full mb-4" rows={3} placeholder={t('Please describe your impairment in detail')} />
            </div>
          </section>

          {/* Medical Information */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText size={20}/> {t('Medical Information')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AccessibleInput label={t('Emergency Contact Name')} {...register('emergencyContact.name', { required: 'Emergency contact name is required' })} error={errors.emergencyContact?.name?.message} required className="w-full mb-4" />
              <AccessibleInput label={t('Relationship')} {...register('emergencyContact.relationship', { required: 'Relationship is required' })} error={errors.emergencyContact?.relationship?.message} required className="w-full mb-4" placeholder={t('e.g., Parent, Spouse, Guardian')} />
            </div>
            <div className="mt-4">
              <AccessibleInput label={t('Emergency Contact Phone')} type="tel" {...register('emergencyContact.phone', { required: 'Emergency contact phone is required' })} error={errors.emergencyContact?.phone?.message} required className="w-full mb-4" />
            </div>
            <div className="mt-4">
              <AccessibleTextarea label={t('Medical Conditions')} {...register('medicalConditions')} error={errors.medicalConditions?.message} className="w-full mb-4" rows={2} placeholder={t('List any relevant medical conditions')} />
            </div>
            <div className="mt-4">
              <AccessibleTextarea label={t('Medications')} {...register('medications')} error={errors.medications?.message} className="w-full mb-4" rows={2} placeholder={t('List any medications you are currently taking')} />
            </div>
            <div className="mt-4">
              <AccessibleTextarea label={t('Allergies')} {...register('allergies')} error={errors.allergies?.message} className="w-full mb-4" rows={2} placeholder={t('List any allergies')} />
            </div>
          </section>

          {/* Profile Photo */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Camera size={20}/> {t('Profile Photo')}</h2>
            <div className="flex flex-col items-center">
              <input
                id="profilePhotoInput"
                type="file"
                accept="image/*"
                onChange={onDrop}
                className="hidden"
              />
              <label
                htmlFor="profilePhotoInput"
                className="cursor-pointer bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[var(--accent)] transition mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('profilePhotoInput').click(); }}
              >
                {photoPreview ? 'Change Photo' : 'Choose Photo'}
              </label>
              <span className="text-[var(--text)] text-sm mb-2">
                {profilePhoto ? profilePhoto.name : 'No file chosen'}
              </span>
              {photoPreview && <img src={photoPreview} alt="Profile preview" className="w-32 h-32 rounded-full object-cover border-2 border-[var(--card-border)]" />}
              <p className="text-[var(--text)] text-sm mt-2">{t('JPG, PNG, GIF up to 5MB')}</p>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto disabled:opacity-60">
              {isSubmitting ? <span>{t('Registering Player...')}</span> : <><UserPlus size={20}/> {t('Register Player & Generate ID Card')}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration; 