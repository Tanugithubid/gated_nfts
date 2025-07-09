import React, { useState, useEffect } from 'react';
import { Wallet, DollarSign, Heart, Send } from 'lucide-react';
import { Donation, Project } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const DonatePage: React.FC = () => {
  const [formData, setFormData] = useState<Donation>({
    donorWallet: '',
    amount: 0,
    projectId: '',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Simulate API call to fetch available projects
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'Community Garden Initiative',
            description: 'Building a sustainable community garden',
            fundraiserName: 'John Smith',
            walletAddress: '0x1234567890abcdef',
            totalAmount: 100000,
            currentAmount: 45000,
            currentMilestone: 2,
            status: 'verified',
            canWithdraw: true,
            milestones: []
          },
          {
            id: '2',
            name: 'School Library Renovation',
            description: 'Renovating the local school library',
            fundraiserName: 'Sarah Johnson',
            walletAddress: '0x2345678901bcdef0',
            totalAmount: 75000,
            currentAmount: 30000,
            status: 'verified',
            currentMilestone: 1,
            canWithdraw: false,
            milestones: []
          },
          {
            id: '3',
            name: 'Clean Water Project',
            description: 'Installing clean water systems in rural areas',
            fundraiserName: 'Mike Chen',
            walletAddress: '0x3456789012cdef01',
            totalAmount: 150000,
            currentAmount: 85000,
            currentMilestone: 3,
            status: 'verified',
            canWithdraw: true,
            milestones: []
          },
        ];
        
        setProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to POST /api/donate
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle success
      alert(`Thank you for your donation of ₹${formData.amount.toLocaleString()}! You will receive an NFT certificate shortly.`);
      
      // Reset form
      setFormData({
        donorWallet: '',
        amount: 0,
        projectId: '',
      });
    } catch (error) {
      alert('Error processing donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const selectedProject = projects.find(p => p.id === formData.projectId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Donation</h1>
        <p className="text-gray-600">Support verified community projects and track your impact</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Donation Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Wallet */}
            <div>
              <label htmlFor="donorWallet" className="block text-sm font-medium text-gray-700 mb-2">
                <Wallet className="h-4 w-4 inline mr-1" />
                Your Wallet Address
              </label>
              <input
                type="text"
                id="donorWallet"
                name="donorWallet"
                value={formData.donorWallet}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0x..."
              />
            </div>

            {/* Project Selection */}
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 inline mr-1" />
                Select Project to Donate
              </label>
              <select
                id="projectId"
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Choose a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.fundraiserName}
                  </option>
                ))}
              </select>
            </div>

            {/* Donation Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Donation Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount || ''}
                onChange={handleInputChange}
                required
                min="1"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter amount"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.projectId || !formData.amount}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2 ${
                isSubmitting || !formData.projectId || !formData.amount
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Donate Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Project Preview */}
        <div className="space-y-6">
          {selectedProject && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Project</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedProject.name}</h4>
                  <p className="text-sm text-gray-600">{selectedProject.description}</p>
                  <p className="text-sm text-gray-500 mt-1">by {selectedProject.fundraiserName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{selectedProject.currentAmount.toLocaleString()} / ₹{selectedProject.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedProject.currentAmount / selectedProject.totalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((selectedProject.currentAmount / selectedProject.totalAmount) * 100)}% Complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Available Projects */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Available Projects</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">by {project.fundraiserName}</span>
                    <span className="text-green-600 font-medium">
                      ₹{project.currentAmount.toLocaleString()} raised
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;