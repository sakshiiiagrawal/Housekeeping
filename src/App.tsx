import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeamAssignments from './components/TeamAssignments';
import FloorOverview from './components/FloorOverview';
import RoomManager from './components/RoomManager';
import { TEAMS, ALL_ROOMS, CONSTRAINTS } from './utils/housekeepingData';
import * as HousekeepingTypes from './types/housekeeping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

function App() {
  const [availableRooms, setAvailableRooms] = useState<HousekeepingTypes.Room[]>(ALL_ROOMS);
  const [activeTeams, setActiveTeams] = useState<HousekeepingTypes.Team[]>(TEAMS);


  const handleTeamToggle = (teamId: string, isChecked: boolean) => {
    setActiveTeams(prevActiveTeams => {
      if (isChecked) {
        const teamToAdd = TEAMS.find(team => team.id === teamId);
        return teamToAdd ? [...prevActiveTeams, teamToAdd].sort((a, b) => a.id.localeCompare(b.id)) : prevActiveTeams;
      } else {
        return prevActiveTeams.filter(team => team.id !== teamId);
      }
    });
  };

  // Function to update the specific active teams, called from TeamAssignments
  const handleActiveTeamsUpdate = (updatedAssignments: HousekeepingTypes.Team[]) => {
    setActiveTeams(prevActiveTeams => {
      // Create a map for quick lookup of updated teams
      const updatedMap = new Map(updatedAssignments.map(team => [team.id, team]));

      // Merge the updated assignments back into the activeTeams list
      const mergedActiveTeams = prevActiveTeams.map(team => 
        updatedMap.has(team.id) ? updatedMap.get(team.id)! : team
      );
      return mergedActiveTeams;
    });
  };

  const HomeView = () => (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧑‍🤝‍🧑 Select Active Teams
            </CardTitle>
            <CardDescription>
              Choose which teams are working today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {TEAMS.map(team => (
                <div key={team.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`team-${team.id}`}
                    checked={activeTeams.some(activeTeam => activeTeam.id === team.id)}
                    onCheckedChange={(checked) => handleTeamToggle(team.id, checked === true)}
                  />
                  <label
                    htmlFor={`team-${team.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: team.color }}
                      />
                      {team.name}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Assignment Rules
            </CardTitle>
            <CardDescription>
              Business constraints for room assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">
                  Credits per Team
                </Badge>
                <div className="text-lg font-semibold text-primary">
                  {CONSTRAINTS.minCredits} - {CONSTRAINTS.maxCredits}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">
                  Max Floors per Team
                </Badge>
                <div className="text-lg font-semibold text-primary">
                  {CONSTRAINTS.maxFloorsPerTeam}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">
                  Max Teams per Floor
                </Badge>
                <div className="text-lg font-semibold text-primary">
                  {CONSTRAINTS.maxTeamsPerFloor}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TeamAssignments 
            teams={activeTeams} 
            availableRooms={availableRooms}
            onTeamsUpdate={handleActiveTeamsUpdate}
            onRoomsUpdate={setAvailableRooms}
          />
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
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route 
              path="/rooms" 
              element={
                <RoomManager 
                  rooms={availableRooms}
                  onRoomsUpdate={setAvailableRooms}
                />
              } 
            />
            <Route 
              path="/about" 
              element={
                <div className="container mx-auto p-6 max-w-4xl">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Housekeeping Manager</CardTitle>
                      <CardDescription>
                        This application helps hotel housekeeping managers assign rooms to cleaning teams 
                        efficiently while respecting operational constraints and workload balance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Badge className="mt-0.5">✓</Badge>
                            Automated room assignment based on team zones
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge className="mt-0.5">✓</Badge>
                            Credit-based workload balancing (15.5-17 credits per team)
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge className="mt-0.5">✓</Badge>
                            Floor limitation management (max 2 floors per team)
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge className="mt-0.5">✓</Badge>
                            Visual floor overview and team assignments
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge className="mt-0.5">✓</Badge>
                            Support for combined rooms and special assignments
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <div className="container mx-auto p-6 max-w-4xl">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact & Support</CardTitle>
                      <CardDescription>
                        For support with the Housekeeping Manager system:
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">IT Support</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">Email: support@hotel.com</p>
                            <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Housekeeping Department</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">Email: housekeeping@hotel.com</p>
                            <p className="text-sm text-muted-foreground">Phone: (555) 123-4568</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
