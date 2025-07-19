import React from 'react';
import { Link } from 'react-router-dom';

export default function PlayerRegistrationSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Registration Successful!</h1>
        <p className="mb-6 text-gray-700">Thank you for registering as a para sports player. Your details have been received and your ID card will be sent to your email soon.</p>
        <div className="flex flex-col gap-2">
          <Link to="/" className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition-colors">Go to Home</Link>
        </div>
      </div>
    </div>
  );
} 