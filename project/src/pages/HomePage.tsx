import React from 'react';
import { ArrowRight, Users, Shield, TrendingUp, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Projects',
      description: 'All fundraisers undergo thorough verification to ensure authenticity and transparency.'
    },
    {
      icon: TrendingUp,
      title: 'Milestone-Based',
      description: 'Donations are released based on project milestones, ensuring funds are used effectively.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Supporting local community projects with transparent progress tracking.'
    },
    {
      icon: CheckCircle,
      title: 'NFT Rewards',
      description: 'Donors receive NFT certificates as proof of their contribution and support.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to{' '}
          <span className="text-blue-600">FairFund</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          A transparent platform where verified community projects receive milestone-based donations.
          Support local initiatives with confidence and track your impact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => onNavigate('apply')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Apply to Fundraise</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => onNavigate('donate')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Donate to a Project</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Making a Difference</h2>
          <p className="text-gray-600">Our community's impact through transparent fundraising</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">₹2.5M+</div>
            <div className="text-gray-600">Total Funds Raised</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
            <div className="text-gray-600">Projects Funded</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">5,000+</div>
            <div className="text-gray-600">Active Donors</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center space-y-12">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Apply & Verify</h3>
            <p className="text-gray-600">Submit your project proposal with required documentation for verification</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Receive Donations</h3>
            <p className="text-gray-600">Once verified, start receiving donations from the community</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Track Progress</h3>
            <p className="text-gray-600">Upload milestone proof and withdraw funds as you progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;