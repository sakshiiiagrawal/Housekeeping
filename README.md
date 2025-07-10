# 🧹 Daily Housekeeping Manager

A comprehensive React application for hotel housekeeping management that automates daily room assignments to cleaning teams while respecting operational constraints and ensuring fair workload distribution.

## 🏨 Features

### Core Functionality
- **Automated Room Assignment**: Intelligent algorithm assigns rooms to teams based on their fixed zones
- **Credit-Based Workload Balancing**: Ensures each team receives 15.5-17 credits worth of work
- **Floor Limitation Management**: Respects the constraint of maximum 2 floors per team and 3 teams per floor
- **Interactive Team Management**: Click-to-assign rooms with real-time credit calculation
- **Room Availability Control**: Mark rooms as available/unavailable for daily assignment

### Visual Interface
- **Team Dashboard**: View all 13 housekeeping teams with color-coded assignments
- **Floor Overview**: See room assignments organized by floor with completion tracking
- **Room Manager**: Comprehensive room availability management with search and filtering
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Special Room Handling
- **Combined Rooms**: Support for room combinations (702+708, 310+312)
- **Wildcard Room**: Room 705 can be assigned to any team for workload balancing
- **Suite Recognition**: Automatic identification of rooms with credits > 1

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd housekeeping-manager
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Application footer
│   ├── TeamAssignments.tsx  # Team management interface
│   ├── FloorOverview.tsx    # Floor-by-floor view
│   └── RoomManager.tsx      # Room availability management
├── types/              # TypeScript type definitions
│   └── housekeeping.ts # Domain-specific types
├── utils/              # Utility functions and data
│   └── housekeepingData.ts # Hotel rooms and teams data
├── hooks/              # Custom React hooks
│   └── useCounter.ts   # Counter hook for demos
└── styles/             # Component-specific CSS files

```

## 📋 Usage Guide

### Daily Assignment Workflow

1. **Set Date**: Select the assignment date using the date picker
2. **Review Available Rooms**: Check which rooms need cleaning that day
3. **Auto-Assign**: Click "Auto Assign" to automatically distribute rooms based on team zones
4. **Manual Adjustments**: Click on team cards to manually adjust assignments
5. **Monitor Constraints**: Green/red indicators show if teams meet credit requirements

### Room Management

1. **Navigate to Room Manager**: Use the "Room Manager" link in the header
2. **Filter by Floor**: Select specific floors to focus on
3. **Search Rooms**: Use the search bar to find specific room numbers
4. **Toggle Availability**: Click room cards to make them available/unavailable
5. **Bulk Operations**: Use buttons to make entire floors available/unavailable

### Team Assignment Details

Each team has:
- **Fixed Zone**: Predefined rooms they're trained to clean
- **Credit Target**: Must receive 15.5-17 credits total
- **Floor Limit**: Can work on maximum 2 floors
- **Color Coding**: Visual identification throughout the interface

## ⚙️ Technical Details

### Built With
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **CSS Custom Properties** for theming
- **Responsive Grid Layouts** for adaptive design

### Key Algorithms
- **Assignment Algorithm**: Greedy approach prioritizing fixed zones
- **Constraint Validation**: Real-time checking of credit and floor limits
- **Workload Balancing**: Even distribution using room credit values

### Data Structure
- **Room Data**: 161 rooms across 8 floors with individual credit values
- **Team Data**: 13 teams with fixed room assignments and color coding
- **Assignment Rules**: Configurable constraints for flexible operations

## 🎯 Business Rules

### Assignment Constraints
- Teams must receive between 15.5 and 17 credits
- Teams can work on maximum 2 floors
- Maximum 3 teams can be assigned to any single floor
- Room 705 is a wildcard assignable to any team

### Special Rooms
- **Room 702+708**: Combined unit worth 4 credits
- **Room 310+312**: Combined unit worth 2.5 credits
- **Suites**: Rooms with credit value > 1

### Team Zones
Each team has a designated zone of rooms they're trained to clean:
- **Mosaique**: Floor 1 rooms
- **Mandarine & Lempicka**: Floor 2 rooms
- **Soie & Paris**: Floor 3 rooms
- **Prince & Miroir**: Floor 4 rooms
- **Art Deco & Cuir**: Floor 5 rooms
- **Ceyladon & Or**: Floor 6 rooms
- **Macassar**: Floor 7 rooms
- **Duplex**: Floor 8 rooms

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Define types in `src/types/housekeeping.ts`
2. Add business logic to `src/utils/housekeepingData.ts`
3. Create components in `src/components/`
4. Style with CSS using the design system variables

## 📱 Mobile Support

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with side-by-side panels
- **Tablet**: Stacked layout with touch-friendly controls
- **Mobile**: Single-column layout with collapsible sections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the About section

---

Built with ❤️ for efficient hotel operations management.
