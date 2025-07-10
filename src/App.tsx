import React, { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';

function App() {
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [availableRooms, setAvailableRooms] = useState<HousekeepingTypes.Room[]>(ALL_ROOMS);
  const [teams, setTeams] = useState<HousekeepingTypes.Team[]>([...TEAMS]);
  const [dailyAssignment, setDailyAssignment] = useState<HousekeepingTypes.DailyAssignment>({
    date: currentDate,
    availableRooms: ALL_ROOMS,
    teams: [...TEAMS],
    assignments: [],
    constraints: CONSTRAINTS,
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const HomeView = () => (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">🧹 Daily Housekeeping Manager</h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📅 Assignment Date
              </CardTitle>
              <CardDescription>
                Select the date for room assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label htmlFor="date" className="text-sm font-medium">
                  Date:
                </label>
                <Input
                  type="date"
                  id="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-auto"
                />
                <p className="text-sm text-muted-foreground italic">
                  {formatDate(currentDate)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
            teams={teams} 
            availableRooms={availableRooms}
            onTeamsUpdate={setTeams}
            onRoomsUpdate={setAvailableRooms}
          />
        </div>
        
        <div>
          <FloorOverview 
            rooms={availableRooms} 
            teams={teams}
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
