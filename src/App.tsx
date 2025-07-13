import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeamAssignments from './components/TeamAssignments';
import FloorOverview from './components/FloorOverview';
import RoomManager from './components/RoomManager';
import { HousekeepingProvider, useHousekeeping } from './context/HousekeepingContext';
import TeamManagement from './components/TeamManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CurrentStatusDisplay from './components/CurrentStatusDisplay'; // Import the new container component

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

  const HomeView = () => {
    return (
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
              <CurrentStatusDisplay /> {/* Render the new container component */}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TeamAssignments />
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
  };

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
