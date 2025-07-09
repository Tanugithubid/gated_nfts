# FairFund - Transparent Fundraising Platform

A responsive web application designed to support verified local fundraisers and donors through a transparent, milestone-based donation platform.

## Features

- **Verified Projects**: All fundraisers undergo thorough verification
- **Milestone-Based**: Donations released based on project milestones
- **Community Driven**: Supporting local community projects
- **NFT Rewards**: Donors receive NFT certificates as proof of contribution

## Pages

1. **Home Page** - Welcome page with platform overview
2. **Fundraiser Application** - Apply to start fundraising
3. **Organizer Dashboard** - Track project progress and manage funds
4. **Upload Proof** - Submit milestone completion proof
5. **Donate** - Make donations to verified projects
6. **My NFT** - View supporter NFT certificates
7. **Project Progress** - Track milestone progress publicly

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The application is designed to integrate with backend APIs:

- `POST /api/apply` - Submit fundraiser application
- `GET /api/fundraiser/:wallet` - Get organizer dashboard data
- `POST /api/upload-proof` - Upload milestone proof
- `POST /api/donate` - Process donations
- `GET /api/my-nft/:wallet` - Get supporter NFT data
- `GET /api/project-progress/:projectId` - Get project progress

## Live Demo

Visit the live application: [FairFund on Netlify](https://celadon-rugelach-5f01e1.netlify.app)

## License

MIT License