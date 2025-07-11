import React, { useState, useMemo } from 'react';
import * as HousekeepingTypes from '../types/housekeeping';
import { ALL_ROOMS } from '../utils/housekeepingData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface RoomManagerProps {
  rooms: HousekeepingTypes.Room[];
  onRoomsUpdate: (rooms: HousekeepingTypes.Room[]) => void;
}

const RoomManager: React.FC<RoomManagerProps> = ({ rooms, onRoomsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('number');

  // Toggle room availability
  const toggleRoomAvailability = (roomNumber: string) => {
    const roomInList = rooms.find(room => room.number === roomNumber);
    
    if (roomInList) {
      // Room is currently available, make it unavailable
      const updatedRooms = rooms.filter(room => room.number !== roomNumber);
      onRoomsUpdate(updatedRooms);
    } else {
      // Room is currently unavailable, make it available
      const originalRoom = ALL_ROOMS.find(room => room.number === roomNumber);
      if (originalRoom) {
        const updatedRooms = [...rooms, originalRoom].sort((a, b) => 
          a.number.localeCompare(b.number)
        );
        onRoomsUpdate(updatedRooms);
      }
    }
  };

  const resetAllRooms = () => {
    onRoomsUpdate([...ALL_ROOMS]);
  };

  const removeAllRooms = () => {
    onRoomsUpdate([]);
  };

  // Get all unique floors for filter options
  const allFloors = [...new Set(ALL_ROOMS.map(room => room.floor))].sort();

  // Filter and sort rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filteredRooms = [...ALL_ROOMS]; // Start with all rooms

    // Apply search filter
    if (searchTerm) {
      filteredRooms = filteredRooms.filter(room =>
        room.number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply floor filter
    if (floorFilter !== 'all') {
      filteredRooms = filteredRooms.filter(room => 
        room.floor === parseInt(floorFilter)
      );
    }

    // Apply status filter
    if (statusFilter === 'available') {
      filteredRooms = filteredRooms.filter(room => 
        rooms.some(availableRoom => availableRoom.number === room.number)
      );
    } else if (statusFilter === 'unavailable') {
      filteredRooms = filteredRooms.filter(room => 
        !rooms.some(availableRoom => availableRoom.number === room.number)
      );
    }
    // No additional filtering for 'all' status; it should display all rooms handled by initial `filteredRooms` assignment.

    // Apply sorting
    switch (sortBy) {
      case 'number':
        return filteredRooms.sort((a, b) => a.number.localeCompare(b.number));
      case 'floor':
        return filteredRooms.sort((a, b) => a.floor - b.floor || a.number.localeCompare(b.number));
      case 'credits':
        return filteredRooms.sort((a, b) => b.credits - a.credits || a.number.localeCompare(b.number));
      default:
        return filteredRooms;
    }
  }, [searchTerm, floorFilter, statusFilter, sortBy, rooms]);

  // Statistics
  const stats = {
    totalRooms: ALL_ROOMS.length,
    availableRooms: rooms.length,
    unavailableRooms: ALL_ROOMS.length - rooms.length,
    totalCredits: ALL_ROOMS.reduce((sum, room) => sum + room.credits, 0),
    availableCredits: rooms.reduce((sum, room) => sum + room.credits, 0),
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛏️ Room Manager
          </CardTitle>
          <CardDescription>
            Manage room availability for housekeeping assignments
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-primary">{stats.totalRooms}</div>
                  <div className="text-xs text-muted-foreground">Total Rooms</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-green-600">{stats.availableRooms}</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-red-600">{stats.unavailableRooms}</div>
                  <div className="text-xs text-muted-foreground">Unavailable</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-primary">{stats.totalCredits}</div>
                  <div className="text-xs text-muted-foreground">Total Credits</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-green-600">{stats.availableCredits.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Available Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔧 Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={resetAllRooms} className="flex-1">
                  ✅ Make All Available
                </Button>
                <Button onClick={removeAllRooms} variant="destructive" className="flex-1">
                  ❌ Make All Unavailable
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Room:</label>
                  <Input
                    type="text"
                    placeholder="Room number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by Floor:</label>
                  <Select value={floorFilter} onValueChange={setFloorFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All floors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Floors</SelectItem>
                      {allFloors.map(floor => (
                        <SelectItem key={floor} value={floor.toString()}>
                          Floor {floor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by Status:</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rooms</SelectItem>
                      <SelectItem value="available">Available Only</SelectItem>
                      <SelectItem value="unavailable">Unavailable Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Room number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Room Number</SelectItem>
                      <SelectItem value="floor">Floor</SelectItem>
                      <SelectItem value="credits">Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                🏨 Rooms ({filteredAndSortedRooms.length} shown)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {filteredAndSortedRooms.map(room => {
                  const isAvailable = rooms.some(availableRoom => 
                    availableRoom.number === room.number
                  );

                  return (
                    <Card
                      key={room.number}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        isAvailable 
                          ? "border-green-200 bg-green-50 hover:bg-green-100" 
                          : "border-red-200 bg-red-50 hover:bg-red-100"
                      )}
                      onClick={() => toggleRoomAvailability(room.number)}
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-lg">{room.number}</span>
                          <Badge 
                            variant={isAvailable ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {isAvailable ? '✓' : '✗'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            Floor {room.floor}
                          </div>
                          <div className="text-xs font-medium">
                            {room.credits} {room.credits > 1 ? 'credits' : 'credit'}
                          </div>
                          {room.isCombined && (
                            <Badge variant="secondary" className="text-[8px] h-4">
                              Combined
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-center pt-1">
                          <span className={cn(
                            "text-xs font-medium",
                            isAvailable ? "text-green-700" : "text-red-700"
                          )}>
                            {isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredAndSortedRooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No rooms match your current filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomManager; 