import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeamAssignments from './components/TeamAssignments';
import FloorOverview from './components/FloorOverview';
import RoomManager from './components/RoomManager';
import { CONSTRAINTS } from './utils/housekeepingData';
import { HousekeepingProvider, useHousekeeping } from './context/HousekeepingContext'; // Import context
import TeamManagement from './components/TeamManagement'; // Import the new component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function App() {
  return (
    <Router>
      <HousekeepingProvider> {/* Wrap the application with the provider */}
        <AppContent />
      </HousekeepingProvider>
    </Router>
  );
}

function AppContent() {
  const { availableRooms, activeTeams } = useHousekeeping();

  console.log("App - availableRooms", availableRooms);
  console.log("App - activeTeams", activeTeams);

  const HomeView = () => (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-6">
        
        {/* Removed the Team Selection Card from here */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Current Status
            </CardTitle>
            <CardDescription>
              Overview of available rooms and active teams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">
                  Available Rooms
                </Badge>
                <div className="text-lg font-semibold text-primary">
                  {availableRooms.length}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">
                  Active Teams
                </Badge>
                <div className="text-lg font-semibold text-primary">
                  {activeTeams.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TeamAssignments /> {/* Props will be consumed from context */}
        </div>
        
        <div>
          <FloorOverview 
            rooms={availableRooms} 
            teams={activeTeams}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/teams" element={<TeamManagement />} />
          <Route 
            path="/rooms" 
            element={<RoomManager />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
