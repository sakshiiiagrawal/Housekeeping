import React, { useState } from 'react';
import * as HousekeepingTypes from '../types/housekeeping';
import { CONSTRAINTS, ALL_ROOMS } from '../utils/housekeepingData';
import { useHousekeeping } from '../context/HousekeepingContext'; // Import context
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TeamAssignmentsProps {
  // Props are now consumed from context, no longer needed here
}

const TeamAssignments: React.FC<TeamAssignmentsProps> = () => {
  const { availableRooms, setAvailableRooms, activeTeams, setActiveTeams } = useHousekeeping();

  console.log("TeamAssignments", { teams: activeTeams, availableRooms });
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [autoAssignInProgress, setAutoAssignInProgress] = useState(false);

  // Helper to get rooms by number
  const getRoomByNumber = (roomNumber: string): HousekeepingTypes.Room | undefined => {
    return ALL_ROOMS.find(room => room.number === roomNumber);
  };

  // Helper to calculate team stats from a given list of assigned room numbers
  const calculateStatsForAssignedRooms = (assignedRoomsNumbers: string[]) => {
    const assignedRoomData = assignedRoomsNumbers.map(num => getRoomByNumber(num)).filter(Boolean) as HousekeepingTypes.Room[];
    const totalCredits = assignedRoomData.reduce((sum, room) => sum + room.credits, 0);
    const floors = [...new Set(assignedRoomData.map(room => room.floor))].sort((a, b) => a - b);
    return { totalCredits, floors, roomCount: assignedRoomsNumbers.length };
  };

  // Calculate team's current assignments and credits (for display)
  const calculateTeamStats = (team: HousekeepingTypes.Team) => {
    return calculateStatsForAssignedRooms(team.assignedRooms);
  };

  // Helper function to check if an assignment violates maxTeamsPerFloor considering all teams' potential assignments
  const checkMaxTeamsPerFloorGlobal = (
    roomFloorBeingConsidered: number,
    potentialAssignedRoomsMap: Map<string, string[]> // Map representing proposed assignments across all teams
  ): boolean => {
    const floorsWithTeamsCount: Record<number, number> = {};

    for (const assignedRoomsNumbers of potentialAssignedRoomsMap.values()) {
      const assignedRoomData = assignedRoomsNumbers.map(num => getRoomByNumber(num)).filter(Boolean) as HousekeepingTypes.Room[];
      const floorsForThisTeam = [...new Set(assignedRoomData.map(room => room.floor))];

      floorsForThisTeam.forEach(floor => {
        floorsWithTeamsCount[floor] = (floorsWithTeamsCount[floor] || 0) + 1;
      });
    }
    // Check if the floor in question will exceed the limit *after* this potential assignment
    return (floorsWithTeamsCount[roomFloorBeingConsidered] || 0) <= CONSTRAINTS.maxTeamsPerFloor;
  };

  // Auto-assign rooms to teams based on their fixed zones
  const autoAssignRooms = () => {
    setAutoAssignInProgress(true);

    // Initialize current assignments as a Map for easy updates
    let currentAssignedRoomsMap = new Map<string, string[]>();
    activeTeams.forEach(team => currentAssignedRoomsMap.set(team.id, [])); // Initialize with empty assignments for each active team

    let currentAvailableRoomsState = [...availableRooms]; // Rooms currently available for assignment

    // Phase 1: Initial assignment to active teams based on fixed zones
    const teamsSortedByFixedRooms = [...activeTeams].sort((a, b) => b.fixedRooms.length - a.fixedRooms.length); // Prioritize teams with more fixed rooms

    teamsSortedByFixedRooms.forEach(team => {
      let currentTeamAssignedRooms = currentAssignedRoomsMap.get(team.id) || [];
      let { totalCredits: currentTeamCredits, floors: currentTeamFloors } = calculateStatsForAssignedRooms(currentTeamAssignedRooms);

      const fixedZoneRooms = currentAvailableRoomsState.filter(room => team.fixedRooms.includes(room.number))
        .sort((a, b) => b.credits - a.credits);

      for (const room of fixedZoneRooms) {
        const potentialCredits = currentTeamCredits + room.credits;
        const potentialTeamFloors = [...new Set([...currentTeamFloors, room.floor])];

        // Create a temporary map for the global check including the potential new assignment
        const tempPotentialAssignedRoomsMap = new Map(currentAssignedRoomsMap);
        tempPotentialAssignedRoomsMap.set(team.id, [...currentTeamAssignedRooms, room.number]);

        if (
          potentialCredits <= CONSTRAINTS.maxCredits &&
          potentialTeamFloors.length <= CONSTRAINTS.maxFloorsPerTeam &&
          checkMaxTeamsPerFloorGlobal(room.floor, tempPotentialAssignedRoomsMap)
        ) {
          currentTeamAssignedRooms.push(room.number);
          currentTeamCredits = potentialCredits;
          currentTeamFloors = potentialTeamFloors; // Update for next iteration
          currentAvailableRoomsState = currentAvailableRoomsState.filter(r => r.number !== room.number);
        }
        if (currentTeamCredits >= CONSTRAINTS.minCredits) break; // Reached min credits for this team, move to next
      }
      currentAssignedRoomsMap.set(team.id, currentTeamAssignedRooms);
    });

    // Phase 2: Distribute remaining unassigned rooms to fill teams to minCredits
    // Filter available rooms that haven't been assigned in Phase 1
    let unassignedRoomsPhase2 = currentAvailableRoomsState.filter(room => {
      let isAssigned = false;
      for (const assignedRooms of currentAssignedRoomsMap.values()) {
        if (assignedRooms.includes(room.number)) {
          isAssigned = true;
          break;
        }
      }
      return !isAssigned;
    });

    unassignedRoomsPhase2.sort(() => Math.random() - 0.5); // Randomize to distribute evenly

    activeTeams.forEach(team => {
      let currentTeamAssignedRooms = currentAssignedRoomsMap.get(team.id) || [];
      let { totalCredits: currentTeamCredits, floors: currentTeamFloors } = calculateStatsForAssignedRooms(currentTeamAssignedRooms);

      if (currentTeamCredits < CONSTRAINTS.minCredits) {
        // Iterate over a copy to allow modification of unassignedRoomsPhase2 during iteration
        for (const room of [...unassignedRoomsPhase2]) {
          const potentialCredits = currentTeamCredits + room.credits;
          const potentialTeamFloors = [...new Set([...currentTeamFloors, room.floor])];

          const tempPotentialAssignedRoomsMap = new Map(currentAssignedRoomsMap);
          tempPotentialAssignedRoomsMap.set(team.id, [...currentTeamAssignedRooms, room.number]);

          if (
            potentialCredits <= CONSTRAINTS.minCredits && // Only assign up to minCredits in this phase
            potentialCredits <= CONSTRAINTS.maxCredits &&
            potentialTeamFloors.length <= CONSTRAINTS.maxFloorsPerTeam &&
            checkMaxTeamsPerFloorGlobal(room.floor, tempPotentialAssignedRoomsMap)
          ) {
            currentTeamAssignedRooms.push(room.number);
            currentTeamCredits = potentialCredits;
            currentTeamFloors = potentialTeamFloors;
            // Mark room as assigned in the current snapshot
            currentAssignedRoomsMap.set(team.id, currentTeamAssignedRooms);
            unassignedRoomsPhase2 = unassignedRoomsPhase2.filter(r => r.number !== room.number);
          }
        }
      }
    });
    // Update currentAvailableRoomsState for phase 3, only keeping truly unassigned rooms
    currentAvailableRoomsState = unassignedRoomsPhase2;


    // Phase 3: Distribute remaining rooms up to maxCredits if all teams meet minCredits
    const allTeamsMeetMin = Array.from(currentAssignedRoomsMap.keys()).every(teamId => {
      const stats = calculateStatsForAssignedRooms(currentAssignedRoomsMap.get(teamId) || []);
      return stats.totalCredits >= CONSTRAINTS.minCredits;
    });

    if (allTeamsMeetMin) {
      activeTeams.forEach(team => {
        let currentTeamAssignedRooms = currentAssignedRoomsMap.get(team.id) || [];
        let { totalCredits: currentTeamCredits, floors: currentTeamFloors } = calculateStatsForAssignedRooms(currentTeamAssignedRooms);

        // Iterate over a copy to allow modification of currentAvailableRoomsState during iteration
        for (const room of [...currentAvailableRoomsState]) { // Iterate over remaining unassigned rooms
          const potentialCredits = currentTeamCredits + room.credits;
          const potentialTeamFloors = [...new Set([...currentTeamFloors, room.floor])];

          const tempPotentialAssignedRoomsMap = new Map(currentAssignedRoomsMap);
          tempPotentialAssignedRoomsMap.set(team.id, [...currentTeamAssignedRooms, room.number]);

          if (
            potentialCredits <= CONSTRAINTS.maxCredits &&
            potentialTeamFloors.length <= CONSTRAINTS.maxFloorsPerTeam &&
            checkMaxTeamsPerFloorGlobal(room.floor, tempPotentialAssignedRoomsMap)
          ) {
            currentTeamAssignedRooms.push(room.number);
            currentTeamCredits = potentialCredits;
            currentTeamFloors = potentialTeamFloors;
            // Mark room as assigned in the current snapshot
            currentAssignedRoomsMap.set(team.id, currentTeamAssignedRooms);
            currentAvailableRoomsState = currentAvailableRoomsState.filter(r => r.number !== room.number);
          }
        }
      });
    }

    // Convert map back to array of teams for onTeamsUpdate
    const finalUpdatedTeams: HousekeepingTypes.Team[] = activeTeams.map(team => {
      const assignedRooms = currentAssignedRoomsMap.get(team.id) || [];
      const stats = calculateStatsForAssignedRooms(assignedRooms);
      return {
        ...team,
        assignedRooms: assignedRooms,
        totalCredits: stats.totalCredits,
        floors: stats.floors,
      };
    });

    setActiveTeams(finalUpdatedTeams);
    setAvailableRooms(currentAvailableRoomsState);
    setAutoAssignInProgress(false);
  };

  // Reset assignments
  const resetAssignments = () => {
    const resetTeams = activeTeams.map(team => ({
      ...team,
      assignedRooms: [],
      totalCredits: 0,
      floors: [],
    }));

    setActiveTeams(resetTeams);
    setAvailableRooms([...ALL_ROOMS]); // Restore all rooms to available
  };

  // No longer needed in TeamAssignments as per requirements
  // const toggleRoomAssignment = (teamId: string, roomNumber: string) => { /* ... */ };

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
              className="w-full sm:w-auto px-6 py-3 text-lg bg-green-500 text-white hover:bg-green-600 flex items-center justify-center"
              variant="default"
            >
              {autoAssignInProgress ? 'Assigning...' : '🎯 Auto Assign'}
            </Button>
            <Button
              variant="destructive"
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
          {activeTeams.map(team => {
            const stats = calculateTeamStats(team);
            const progressPercentage = Math.min((stats.totalCredits / CONSTRAINTS.maxCredits) * 100, 100);

            return (
              <Card
                key={team.id}
                className={cn(
                  "border-l-4",
                  team.color ? `border-[${team.color}]` : "border-gray-300",
                  selectedTeam === team.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                )}
                onClick={() => setSelectedTeam(team.id === selectedTeam ? null : team.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: team.color }}
                      />
                      {team.name}
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {stats.roomCount} Rooms
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={stats.totalCredits >= CONSTRAINTS.minCredits && stats.totalCredits <= CONSTRAINTS.maxCredits ? "default" : "destructive"}
                        className="text-xs"
                      >
                        Credits: {stats.totalCredits.toFixed(1)} / {CONSTRAINTS.maxCredits}
                      </Badge>
                      <Badge
                        variant={stats.floors.length <= CONSTRAINTS.maxFloorsPerTeam ? "default" : "destructive"}
                        className="text-xs"
                      >
                        Floors: {stats.floors.length} / {CONSTRAINTS.maxFloorsPerTeam}
                      </Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={progressPercentage}
                    className="mb-4"
                  />
                  {selectedTeam === team.id && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                      {team.assignedRooms.length > 0 ? (
                        team.assignedRooms.sort((a, b) => parseInt(a) - parseInt(b)).map(roomNumber => (
                          <Badge key={roomNumber} variant="outline" className="flex justify-center items-center h-8">
                            {roomNumber}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm col-span-full">No rooms assigned.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {activeTeams.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">No active teams selected. Please go to Team Management to select teams.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamAssignments; 