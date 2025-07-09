import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CheckCircle, Upload, Download, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

interface OrganizerDashboardProps {
  onNavigate: (page: string) => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ onNavigate }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Simulate fetching project data
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        // Simulate API call to GET /api/fundraiser/:wallet
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockProject: Project = {
          id: '1',
          name: 'Community Garden Initiative',
          description: 'Building a sustainable community garden for local food production',
          fundraiserName: 'John Smith',
          walletAddress: '0x1234567890abcdef',
          totalAmount: 100000,
          currentAmount: 45000,
          currentMilestone: 2,
          status: 'verified',
          canWithdraw: true,
          milestones: [
            { id: 1, title: 'Land Acquisition', description: 'Secure land for the garden', targetAmount: 30000, completed: true, proofUploaded: true, completedDate: '2024-01-15' },
            { id: 2, title: 'Site Preparation', description: 'Clear and prepare the land', targetAmount: 25000, completed: true, proofUploaded: true, completedDate: '2024-02-01' },
            { id: 3, title: 'Infrastructure Setup', description: 'Install water systems and fencing', targetAmount: 25000, completed: false, proofUploaded: false },
            { id: 4, title: 'Planting Phase', description: 'Plant initial crops and trees', targetAmount: 20000, completed: false, proofUploaded: false },
          ]
        };
        
        setProject(mockProject);
        setWalletAddress(mockProject.walletAddress);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verified';
      case 'pending': return 'Pending';
      case 'under_review': return 'Under Review';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Project Found</h2>
        <p className="text-gray-600 mb-6">You don't have any active fundraising projects.</p>
        <button
          onClick={() => onNavigate('apply')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply to Fundraise
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
        <p className="text-gray-600">Track your project progress and manage fundraising</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wallet Address</p>
              <p className="text-sm text-gray-900 font-mono">{walletAddress}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">₹{project.currentAmount.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Milestone</p>
              <p className="text-2xl font-bold text-gray-900">{project.currentMilestone}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Project Status</p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Funding Progress</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{project.currentAmount.toLocaleString()} / ₹{project.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(project.currentAmount / project.totalAmount) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((project.currentAmount / project.totalAmount) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Milestones</h2>
        <div className="space-y-4">
          {project.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {milestone.completed ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-bold">{milestone.id}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                <p className="text-sm text-gray-600">{milestone.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="text-gray-500">Target: ₹{milestone.targetAmount.toLocaleString()}</span>
                  {milestone.completed && milestone.completedDate && (
                    <span className="text-green-600">Completed: {milestone.completedDate}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onNavigate('upload')}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Milestone Proof</span>
        </button>
        
        {project.canWithdraw && (
          <button
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            onClick={() => alert('Withdraw functionality would be implemented here')}
          >
            <Download className="h-5 w-5" />
            <span>Withdraw Funds</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;