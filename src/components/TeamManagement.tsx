import React from 'react';
import { useHousekeeping } from '../context/HousekeepingContext';
import { TEAMS } from '../utils/housekeepingData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TeamManagement: React.FC = () => {
  const { activeTeams, setActiveTeams } = useHousekeeping();

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="animate-in fade-in-from-bottom-5 slide-in-from-bottom-5 duration-500 ease-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl font-bold text-primary">
            🧑‍🤝‍🧑 Team Management
            <Badge variant="outline" className="text-sm px-3 py-1 rounded-full">
              {activeTeams.length} Active Teams
            </Badge>
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-2">
            Select which housekeeping teams are active for today's assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {TEAMS.map(team => (
              <Card
                key={team.id}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3 rounded-lg shadow-sm border-2 transition-all duration-200 ease-in-out", // Reduced padding
                  "hover:shadow-md hover:scale-[1.02]",
                  activeTeams.some(activeTeam => activeTeam.id === team.id)
                    ? "border-primary ring-2 ring-primary bg-primary/5"
                    : "border-border bg-background"
                )}
              >
                <div className="absolute top-2 right-2"> {/* Adjusted position slightly */}
                  <Checkbox
                    id={`team-${team.id}`}
                    checked={activeTeams.some(activeTeam => activeTeam.id === team.id)}
                    onCheckedChange={(checked) => handleTeamToggle(team.id, checked === true)}
                  />
                </div>
                <label
                  htmlFor={`team-${team.id}`}
                  className="flex flex-col items-center space-y-1 cursor-pointer w-full h-full p-3" // Reduced padding and space-y
                >
                  <div 
                    className="w-8 h-8 rounded-full flex-shrink-0 mb-1" // Smaller icon
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="text-base font-semibold text-center">{team.name}</span> {/* Slightly smaller font */}
                  <span className="text-xs text-muted-foreground">{team.fixedRooms.length} Fixed Rooms</span> {/* Slightly smaller font */}
                </label>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement; 