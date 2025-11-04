
import React from 'react';

interface CandidateInputProps {
  value: string;
  onChange: (name: string) => void;
}

const CandidateInput: React.FC<CandidateInputProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <label htmlFor="candidate-name" className="block text-xl font-bold text-slate-800 mb-3">
        Candidate Name
      </label>
      <input
        id="candidate-name"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter candidate's full name"
        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        aria-label="Candidate Name"
      />
    </div>
  );
};

export default CandidateInput;
