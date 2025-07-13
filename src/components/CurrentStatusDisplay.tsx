import React from 'react';
import { useHousekeeping } from '../context/HousekeepingContext';
import { ALL_ROOMS } from '../utils/housekeepingData';
import { Badge } from '@/components/ui/badge';
import StatusBadgeWithDialog from './StatusBadgeWithDialog';

const CurrentStatusDisplay: React.FC = () => {
  const { availableRooms, activeTeams } = useHousekeeping();

  const assignedRoomsList = activeTeams.reduce((acc: string[], team) => acc.concat(team.assignedRooms), []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatusBadgeWithDialog
        label="Available Rooms"
        value={availableRooms.length}
        dialogTitle="Available Rooms"
        dialogDescription="List of all rooms currently available for assignment."
        dialogContent={(
          <div className="grid grid-cols-3 gap-2">
            {availableRooms.length > 0 ? (
              availableRooms.sort((a, b) => parseInt(a.number) - parseInt(b.number)).map(room => (
                <Badge key={room.number} variant="secondary" className="flex justify-center items-center h-8">
                  {room.number}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm col-span-full">No rooms currently available.</p>
            )}
          </div>
        )}
      />

      <StatusBadgeWithDialog
        label="Active Teams"
        value={activeTeams.length}
        dialogTitle="Active Teams"
        dialogDescription="List of teams currently active for housekeeping duties."
        dialogContent={(
          <div className="grid grid-cols-2 gap-2">
            {activeTeams.length > 0 ? (
              activeTeams.sort((a, b) => a.name.localeCompare(b.name)).map(team => (
                <Badge
                  key={team.id}
                  variant="secondary"
                  className="flex justify-center items-center h-8"
                  style={{ backgroundColor: team.color, color: 'white' }}
                >
                  {team.name}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm col-span-full">No active teams selected.</p>
            )}
          </div>
        )}
      />

      <StatusBadgeWithDialog
        label="Assigned Rooms"
        value={assignedRoomsList.length}
        dialogTitle="Assigned Rooms"
        dialogDescription="List of rooms that have been assigned to active teams."
        dialogContent={(
          <div className="grid grid-cols-3 gap-2">
            {assignedRoomsList.length > 0 ? (
              assignedRoomsList.sort((a, b) => parseInt(a) - parseInt(b)).map(roomNumber => {
                const room = ALL_ROOMS.find(r => r.number === roomNumber);
                return (
                  <Badge key={roomNumber} variant="secondary" className="flex justify-center items-center h-8">
                    {room ? `${room.number} (${room.credits}c)` : roomNumber}
                  </Badge>
                );
              })
            ) : (
              <p className="text-muted-foreground text-sm col-span-full">No rooms assigned yet.</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CurrentStatusDisplay; 