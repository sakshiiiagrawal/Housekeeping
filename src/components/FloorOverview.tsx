import React, { useState } from 'react';
import * as HousekeepingTypes from '../types/housekeeping';
import { getFloorSummary } from '../utils/housekeepingData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FloorOverviewProps {
  rooms: HousekeepingTypes.Room[];
  teams: HousekeepingTypes.Team[];
}

const FloorOverview: React.FC<FloorOverviewProps> = ({ rooms, teams }) => {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  
  const floorSummary = getFloorSummary();
  
  // Get team assigned to a room
  const getTeamForRoom = (roomNumber: string) => {
    return teams.find(team => team.assignedRooms.includes(roomNumber));
  };

  // Get teams working on a floor
  const getTeamsOnFloor = (floor: number) => {
    return teams.filter(team => team.floors.includes(floor));
  };

  // Calculate floor statistics
  const getFloorStats = (floor: number) => {
    const floorRooms = rooms.filter(room => room.floor === floor);
    const assignedRooms = floorRooms.filter(room => getTeamForRoom(room.number));
    const totalCredits = floorRooms.reduce((sum, room) => sum + room.credits, 0);
    const assignedCredits = assignedRooms.reduce((sum, room) => sum + room.credits, 0);
    const teamsOnFloor = getTeamsOnFloor(floor);
    
    return {
      totalRooms: floorRooms.length,
      assignedRooms: assignedRooms.length,
      availableRooms: floorRooms.length - assignedRooms.length,
      totalCredits,
      assignedCredits,
      availableCredits: totalCredits - assignedCredits,
      teamsCount: teamsOnFloor.length,
      teams: teamsOnFloor,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏢 Floor Overview
        </CardTitle>
        <CardDescription>
          Room assignments by floor
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {floorSummary.map(({ floor, totalRooms, totalCredits }) => {
            const stats = getFloorStats(floor);
            const completionPercentage = stats.totalRooms > 0 ? (stats.assignedRooms / stats.totalRooms) * 100 : 0;
            
            return (
              <Card 
                key={floor}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedFloor === floor && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedFloor(selectedFloor === floor ? null : floor)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Floor {floor}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {stats.assignedRooms}/{stats.totalRooms} rooms
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Progress value={completionPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {completionPercentage.toFixed(0)}% assigned
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Credits:</div>
                      <div className="text-sm text-muted-foreground">
                        {stats.assignedCredits.toFixed(1)} / {stats.totalCredits}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Teams:</div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">{stats.teamsCount}</span>
                        {stats.teams.map(team => (
                          <div
                            key={team.id}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: team.color }}
                            title={team.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {selectedFloor === floor && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Teams on Floor {floor}:</h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {stats.teams.length > 0 ? (
                              stats.teams.map(team => (
                                <div key={team.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: team.color }}
                                    />
                                    <span className="font-medium text-sm">{team.name}</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {team.totalCredits.toFixed(1)} credits
                                  </Badge>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground italic text-center py-4">
                                No teams assigned to this floor
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Rooms on Floor {floor}:</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                            {rooms
                              .filter(room => room.floor === floor)
                              .sort((a, b) => a.number.localeCompare(b.number))
                              .map(room => {
                                const assignedTeam = getTeamForRoom(room.number);
                                
                                return (
                                  <Card
                                    key={room.number}
                                    className={cn(
                                      "p-2 text-xs",
                                      assignedTeam ? "border-l-4" : "border-l-4 border-l-muted"
                                    )}
                                    style={{
                                      borderLeftColor: assignedTeam?.color || undefined
                                    }}
                                  >
                                    <div className="space-y-1">
                                      <div className="font-medium">{room.number}</div>
                                      <div className="text-[10px] text-muted-foreground">
                                        {room.credits} {room.credits > 1 ? 'credits' : 'credit'}
                                      </div>
                                      {room.isCombined && (
                                        <Badge variant="secondary" className="text-[8px] h-4">
                                          Combined
                                        </Badge>
                                      )}
                                      {assignedTeam && (
                                        <div className="text-[10px] font-medium text-primary">
                                          {assignedTeam.name}
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>

      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-primary">
                  {teams.reduce((sum, team) => sum + team.assignedRooms.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Assigned Rooms</div>
              </div>
              
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-primary">
                  {teams.reduce((sum, team) => sum + team.totalCredits, 0).toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">Assigned Credits</div>
              </div>
              
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-primary">
                  {teams.filter(team => team.assignedRooms.length > 0).length}
                </div>
                <div className="text-xs text-muted-foreground">Active Teams</div>
              </div>
              
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-primary">
                  {new Set(teams.flatMap(team => team.floors)).size}
                </div>
                <div className="text-xs text-muted-foreground">Floors in Use</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default FloorOverview; 