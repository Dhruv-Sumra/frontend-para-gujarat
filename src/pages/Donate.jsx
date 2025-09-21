import React from 'react';
import { Copy, Phone, Mail } from 'lucide-react';

export default function Donate() {
  const bankDetails = {
    accountName: "Para Sports Association of Gujarat",
    accountNumber: "1234567890123456",
    ifscCode: "SBIN0001234",
    bankName: "State Bank of India",
    branch: "Ahmedabad Main Branch"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <section className="bg-[var(--card)] border-b border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
            Support Gujarat Para Athletes
          </h1>
          <p className="text-xl text-[var(--text)]/70 mb-8 max-w-2xl mx-auto">
            Transfer funds directly to our bank account. 80G tax exemption available.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[var(--card)] rounded-lg shadow-sm border border-[var(--card-border)] p-8">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-8">Bank Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-[var(--bg)] rounded-lg border">
              <label className="text-sm font-medium text-[var(--text)]/70">Account Name</label>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[var(--text)] mt-1">{bankDetails.accountName}</p>
                <button 
                  onClick={() => copyToClipboard(bankDetails.accountName)}
                  className="text-[var(--primary)] hover:text-[var(--accent)]"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-[var(--bg)] rounded-lg border">
              <label className="text-sm font-medium text-[var(--text)]/70">Account Number</label>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[var(--text)] mt-1">{bankDetails.accountNumber}</p>
                <button 
                  onClick={() => copyToClipboard(bankDetails.accountNumber)}
                  className="text-[var(--primary)] hover:text-[var(--accent)]"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-[var(--bg)] rounded-lg border">
              <label className="text-sm font-medium text-[var(--text)]/70">IFSC Code</label>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[var(--text)] mt-1">{bankDetails.ifscCode}</p>
                <button 
                  onClick={() => copyToClipboard(bankDetails.ifscCode)}
                  className="text-[var(--primary)] hover:text-[var(--accent)]"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-[var(--bg)] rounded-lg border">
              <label className="text-sm font-medium text-[var(--text)]/70">Bank & Branch</label>
              <p className="text-[var(--text)] mt-1">{bankDetails.bankName}</p>
              <p className="text-sm text-[var(--text)]/70">{bankDetails.branch}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--primary)]" />
                <a href="mailto:psaofgujarat@gmail.com" className="text-[var(--primary)] hover:underline">
                  psaofgujarat@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--primary)]" />
                <a href="tel:+919876543210" className="text-[var(--primary)] hover:underline">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}