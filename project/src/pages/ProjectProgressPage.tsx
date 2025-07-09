import React, { useState } from 'react';
import { Search, TrendingUp, CheckCircle, Clock, User, Target, Calendar, Image } from 'lucide-react';
import { Project } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectProgressPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      // Simulate API call to GET /api/project-progress/:projectId
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockProject: Project = {
        id: '1',
        name: 'Community Garden Initiative',
        description: 'Building a sustainable community garden for local food production and education',
        fundraiserName: 'John Smith',
        walletAddress: '0x1234567890abcdef',
        totalAmount: 100000,
        currentAmount: 65000,
        currentMilestone: 3,
        status: 'verified',
        canWithdraw: true,
        milestones: [
          { 
            id: 1, 
            title: 'Land Acquisition', 
            description: 'Secure and legally acquire 2 acres of land for the community garden', 
            targetAmount: 30000, 
            completed: true, 
            proofUploaded: true, 
            completedDate: '2024-01-15',
            proofUrl: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          { 
            id: 2, 
            title: 'Site Preparation', 
            description: 'Clear the land, level the ground, and prepare soil for planting', 
            targetAmount: 25000, 
            completed: true, 
            proofUploaded: true, 
            completedDate: '2024-02-01',
            proofUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          { 
            id: 3, 
            title: 'Infrastructure Setup', 
            description: 'Install water irrigation systems, fencing, and storage facilities', 
            targetAmount: 25000, 
            completed: true, 
            proofUploaded: true, 
            completedDate: '2024-02-20',
            proofUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          { 
            id: 4, 
            title: 'Planting Phase', 
            description: 'Plant initial crops, fruit trees, and establish growing areas', 
            targetAmount: 20000, 
            completed: false, 
            proofUploaded: false 
          },
        ]
      };
      
      setProject(mockProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      setProject(null);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Progress Tracker</h1>
        <p className="text-gray-600">Track milestone progress and view proof of completion</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
              Project Name or Wallet Address
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter project name or wallet address..."
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors flex items-center space-x-2 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Project Details */}
      {searched && !loading && (
        <div className="space-y-8">
          {project ? (
            <>
              {/* Project Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{project.name}</h2>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Fundraiser:</span>
                        <span className="text-gray-900">{project.fundraiserName}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Goal:</span>
                        <span className="text-gray-900">₹{project.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Funding Progress */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Funding Progress</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Amount</span>
                          <span className="font-semibold text-gray-900">₹{project.currentAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(project.currentAmount / project.totalAmount) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{Math.round((project.currentAmount / project.totalAmount) * 100)}% Complete</span>
                          <span>₹{(project.totalAmount - project.currentAmount).toLocaleString()} remaining</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Milestone */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Current Milestone</span>
                      </div>
                      <p className="text-blue-800">{project.currentMilestone} of {project.milestones.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Milestone Timeline</h3>
                
                <div className="space-y-6">
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative">
                      {/* Timeline Line */}
                      {index < project.milestones.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-20 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Milestone Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          milestone.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <Clock className="h-6 w-6" />
                          )}
                        </div>

                        {/* Milestone Content */}
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                              <span className="text-sm font-medium text-gray-500">
                                Target: ₹{milestone.targetAmount.toLocaleString()}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{milestone.description}</p>
                            
                            {milestone.completed && (
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2 text-sm text-green-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Completed on {milestone.completedDate}</span>
                                </div>
                                
                                {milestone.proofUrl && (
                                  <div className="flex items-center space-x-2">
                                    <Image className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">Proof uploaded:</span>
                                    <img 
                                      src={milestone.proofUrl} 
                                      alt="Milestone proof" 
                                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Status</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {project.milestones.filter(m => m.completed).length}
                    </div>
                    <div className="text-gray-600">Milestones Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {project.milestones.length - project.milestones.filter(m => m.completed).length}
                    </div>
                    <div className="text-gray-600">Remaining Milestones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {Math.round((project.milestones.filter(m => m.completed).length / project.milestones.length) * 100)}%
                    </div>
                    <div className="text-gray-600">Project Completion</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
              <p className="text-gray-600 mb-6">No project found with the provided name or wallet address.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectProgressPage;