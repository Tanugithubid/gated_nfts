import React, { useState } from 'react';
import { Upload, FileText, Send, Camera } from 'lucide-react';
import { ProofUpload } from '../types';

const UploadProofPage: React.FC = () => {
  const [formData, setFormData] = useState<ProofUpload>({
    milestoneNumber: 1,
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const milestones = [
    { id: 1, title: 'Land Acquisition' },
    { id: 2, title: 'Site Preparation' },
    { id: 3, title: 'Infrastructure Setup' },
    { id: 4, title: 'Planting Phase' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'milestoneNumber' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to POST /api/upload-proof
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle success
      alert('Milestone proof uploaded successfully! Your submission is under review.');
      
      // Reset form
      setFormData({
        milestoneNumber: 1,
        description: '',
      });
      setFile(null);
    } catch (error) {
      alert('Error uploading proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Milestone Proof</h1>
          <p className="text-gray-600">Submit documentation to verify milestone completion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Milestone Selection */}
          <div>
            <label htmlFor="milestoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Milestone Number
            </label>
            <select
              id="milestoneNumber"
              name="milestoneNumber"
              value={formData.milestoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {milestones.map((milestone) => (
                <option key={milestone.id} value={milestone.id}>
                  Milestone {milestone.id}: {milestone.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Describe the milestone completion with details about what was accomplished..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="h-4 w-4 inline mr-1" />
              Upload Proof (Image or PDF)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                required
              />
              <label htmlFor="file" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, JPEG, PNG up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Upload Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure images are clear and well-lit</li>
              <li>• Include multiple angles if applicable</li>
              <li>• Add timestamps or date stamps when possible</li>
              <li>• Keep file sizes under 10MB</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Submit Proof</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProofPage;