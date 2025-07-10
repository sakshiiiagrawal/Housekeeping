import React, { useState } from 'react';
import * as HousekeepingTypes from '../types/housekeeping';
import { CONSTRAINTS, WILDCARD_ROOMS, ALL_ROOMS } from '../utils/housekeepingData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TeamAssignmentsProps {
  teams: HousekeepingTypes.Team[];
  availableRooms: HousekeepingTypes.Room[];
  onTeamsUpdate: (teams: HousekeepingTypes.Team[]) => void;
  onRoomsUpdate: (rooms: HousekeepingTypes.Room[]) => void;
}

const TeamAssignments: React.FC<TeamAssignmentsProps> = ({
  teams,
  availableRooms,
  onTeamsUpdate,
  onRoomsUpdate,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [autoAssignInProgress, setAutoAssignInProgress] = useState(false);

  // Calculate team's current assignments and credits
  const calculateTeamStats = (team: HousekeepingTypes.Team) => {
    const assignedRoomNumbers = team.assignedRooms;
    const assignedRoomData = ALL_ROOMS.filter(room => 
      assignedRoomNumbers.includes(room.number)
    );
    
    const totalCredits = assignedRoomData.reduce((sum, room) => sum + room.credits, 0);
    const floors = [...new Set(assignedRoomData.map(room => room.floor))].sort();
    
    return {
      totalCredits,
      floors,
      roomCount: assignedRoomNumbers.length,
      isWithinRange: totalCredits >= CONSTRAINTS.minCredits && totalCredits <= CONSTRAINTS.maxCredits,
      hasValidFloors: floors.length <= CONSTRAINTS.maxFloorsPerTeam,
    };
  };

  // Auto-assign rooms to teams based on their fixed zones
  const autoAssignRooms = () => {
    setAutoAssignInProgress(true);
    
    const updatedTeams = teams.map(team => {
      // Find available rooms from team's fixed zone
      const availableFixedRooms = ALL_ROOMS.filter(room => 
        team.fixedRooms.includes(room.number) && availableRooms.some(ar => ar.number === room.number)
      );
      
      // Sort by credits (larger rooms first for better distribution)
      availableFixedRooms.sort((a, b) => b.credits - a.credits);
      
      let assignedRooms: string[] = [];
      let totalCredits = 0;
      
      // Assign rooms until we reach minimum credits
      for (const room of availableFixedRooms) {
        if (totalCredits + room.credits <= CONSTRAINTS.maxCredits) {
          assignedRooms.push(room.number);
          totalCredits += room.credits;
        }
        
        if (totalCredits >= CONSTRAINTS.minCredits) {
          break;
        }
      }
      
      // If still under minimum, try to add wildcard rooms
      if (totalCredits < CONSTRAINTS.minCredits) {
        const wildcardRooms = ALL_ROOMS.filter(room => 
          WILDCARD_ROOMS.includes(room.number) && 
          !assignedRooms.includes(room.number) &&
          availableRooms.some(ar => ar.number === room.number)
        );
        
        for (const room of wildcardRooms) {
          if (totalCredits + room.credits <= CONSTRAINTS.maxCredits) {
            assignedRooms.push(room.number);
            totalCredits += room.credits;
            break;
          }
        }
      }
      
      return {
        ...team,
        assignedRooms,
        totalCredits,
        floors: [...new Set(ALL_ROOMS
          .filter(room => assignedRooms.includes(room.number))
          .map(room => room.floor))].sort(),
      };
    });
    
    onTeamsUpdate(updatedTeams);
    
    // Remove assigned rooms from available rooms
    const allAssignedRooms = updatedTeams.flatMap(team => team.assignedRooms);
    const remainingRooms = ALL_ROOMS.filter(room => 
      !allAssignedRooms.includes(room.number)
    );
    onRoomsUpdate(remainingRooms);
    
    setAutoAssignInProgress(false);
  };

  // Reset assignments
  const resetAssignments = () => {
    const resetTeams = teams.map(team => ({
      ...team,
      assignedRooms: [],
      totalCredits: 0,
      floors: [],
    }));
    
    onTeamsUpdate(resetTeams);
    onRoomsUpdate([...ALL_ROOMS]); // Restore all rooms to available
  };

  // Toggle room assignment for a team
  const toggleRoomAssignment = (teamId: string, roomNumber: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const isAssigned = team.assignedRooms.includes(roomNumber);
        let newAssignedRooms: string[];
        let newAvailableRooms = [...availableRooms];

        if (isAssigned) {
          newAssignedRooms = team.assignedRooms.filter(r => r !== roomNumber);
          const roomBeingUnassigned = ALL_ROOMS.find(r => r.number === roomNumber);
          if (roomBeingUnassigned) {
            newAvailableRooms.push(roomBeingUnassigned);
            newAvailableRooms.sort((a,b) => a.number.localeCompare(b.number));
          }
        } else {
          newAssignedRooms = [...team.assignedRooms, roomNumber];
          newAvailableRooms = newAvailableRooms.filter(r => r.number !== roomNumber);
        }
        
        const roomData = ALL_ROOMS.filter(room => 
          newAssignedRooms.includes(room.number)
        );
        const totalCredits = roomData.reduce((sum, room) => sum + room.credits, 0);
        const floors = [...new Set(roomData.map(room => room.floor))].sort();
        
        onRoomsUpdate(newAvailableRooms);

        return {
          ...team,
          assignedRooms: newAssignedRooms,
          totalCredits,
          floors,
        };
      }
      return team;
    });
    
    onTeamsUpdate(updatedTeams);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              🧑‍🤝‍🧑 Team Assignments
            </CardTitle>
            <CardDescription>
              Manage room assignments for housekeeping teams
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={autoAssignRooms}
              disabled={autoAssignInProgress}
              className="w-full sm:w-auto"
            >
              {autoAssignInProgress ? 'Assigning...' : '🎯 Auto Assign'}
            </Button>
            <Button 
              variant="outline"
              onClick={resetAssignments}
              className="w-full sm:w-auto"
            >
              🔄 Reset All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {teams.map(team => {
            const stats = calculateTeamStats(team);
            const progressPercentage = Math.min((stats.totalCredits / CONSTRAINTS.maxCredits) * 100, 100);
            
            return (
              <Card 
                key={team.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedTeam === team.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: team.color }}
                    />
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Credits:</span>
                        <Badge 
                          variant={stats.isWithinRange ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {stats.totalCredits.toFixed(1)} / {CONSTRAINTS.minCredits}-{CONSTRAINTS.maxCredits}
                        </Badge>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Floors:</span>
                        <Badge 
                          variant={stats.hasValidFloors ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {stats.floors.length > 0 ? stats.floors.join(', ') : 'None'} 
                          {stats.floors.length > 0 && ` (${stats.floors.length}/${CONSTRAINTS.maxFloorsPerTeam})`}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Rooms:</span>
                        <Badge variant="outline" className="text-xs">
                          {stats.roomCount}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {selectedTeam === team.id && (
                    <div className="border-t pt-4 space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Assigned Rooms:</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {team.assignedRooms.length > 0 ? (
                            team.assignedRooms.map(roomNumber => {
                              const roomData = ALL_ROOMS.find(r => r.number === roomNumber);
                              return (
                                <div 
                                  key={roomNumber}
                                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{roomNumber}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {roomData?.credits || 0} credits
                                    </Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleRoomAssignment(team.id, roomNumber);
                                    }}
                                    className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                                  >
                                    ×
                                  </Button>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-sm text-muted-foreground italic text-center py-4">
                              No rooms assigned
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Available Fixed Zone Rooms:</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                          {team.fixedRooms.map(roomNumber => {
                            const isAvailable = availableRooms.some(room => room.number === roomNumber);
                            const isAssigned = team.assignedRooms.includes(roomNumber);
                            const roomData = ALL_ROOMS.find(r => r.number === roomNumber);
                            
                            return (
                              <Button
                                key={roomNumber}
                                variant={isAssigned ? "default" : "outline"}
                                size="sm"
                                disabled={!isAvailable}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isAvailable) {
                                    toggleRoomAssignment(team.id, roomNumber);
                                  }
                                }}
                                className={cn(
                                  "h-10 text-xs flex flex-col p-1",
                                  !isAvailable && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                <span className="font-medium">{roomNumber}</span>
                                <span className="text-[10px] opacity-80">
                                  {roomData?.credits || 0}c
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamAssignments; 