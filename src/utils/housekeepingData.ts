import * as HousekeepingTypes from '../types/housekeeping';

export const CONSTRAINTS: HousekeepingTypes.AssignmentConstraints = {
  minCredits: 15.5,
  maxCredits: 17,
  maxFloorsPerTeam: 2,
  maxTeamsPerFloor: 3,
};

export const ALL_ROOMS: HousekeepingTypes.Room[] = [
  // Floor 1
  { number: '101', floor: 1, credits: 1.5 },
  { number: '104', floor: 1, credits: 2 },
  { number: '105', floor: 1, credits: 1 },
  { number: '107', floor: 1, credits: 1 },
  { number: '108', floor: 1, credits: 2 },
  { number: '109', floor: 1, credits: 1 },
  { number: '110', floor: 1, credits: 2 },
  { number: '112', floor: 1, credits: 1 },
  { number: '115', floor: 1, credits: 2 },
  { number: '119', floor: 1, credits: 1.5 },
  { number: '123', floor: 1, credits: 1 },
  { number: '125', floor: 1, credits: 1 },
  { number: '127', floor: 1, credits: 1 },
  { number: '129', floor: 1, credits: 1 },
  { number: '131', floor: 1, credits: 1 },
  { number: '133', floor: 1, credits: 1 },

  // Floor 2
  { number: '201', floor: 2, credits: 1.5 },
  { number: '204', floor: 2, credits: 2 },
  { number: '205', floor: 2, credits: 1 },
  { number: '207', floor: 2, credits: 1 },
  { number: '208', floor: 2, credits: 2 },
  { number: '209', floor: 2, credits: 1 },
  { number: '210', floor: 2, credits: 2 },
  { number: '212', floor: 2, credits: 1 },
  { number: '215', floor: 2, credits: 2 },
  { number: '216', floor: 2, credits: 1 },
  { number: '218', floor: 2, credits: 1 },
  { number: '219', floor: 2, credits: 1.5 },
  { number: '220', floor: 2, credits: 1 },
  { number: '222', floor: 2, credits: 1 },
  { number: '223', floor: 2, credits: 1 },
  { number: '224', floor: 2, credits: 1 },
  { number: '225', floor: 2, credits: 1 },
  { number: '226', floor: 2, credits: 1 },
  { number: '227', floor: 2, credits: 1 },
  { number: '228', floor: 2, credits: 1 },
  { number: '229', floor: 2, credits: 1 },
  { number: '231', floor: 2, credits: 1 },
  { number: '233', floor: 2, credits: 1 },

  // Floor 3
  { number: '301', floor: 3, credits: 1.5 },
  { number: '304', floor: 3, credits: 2 },
  { number: '305', floor: 3, credits: 1 },
  { number: '307', floor: 3, credits: 1 },
  { number: '308', floor: 3, credits: 2 },
  { number: '309', floor: 3, credits: 1 },
  { number: '310+312', floor: 3, credits: 2.5, isCombined: true },
  { number: '314', floor: 3, credits: 1 },
  { number: '315', floor: 3, credits: 2 },
  { number: '316', floor: 3, credits: 1 },
  { number: '318', floor: 3, credits: 1 },
  { number: '319', floor: 3, credits: 1.5 },
  { number: '320', floor: 3, credits: 1 },
  { number: '322', floor: 3, credits: 1 },
  { number: '323', floor: 3, credits: 1 },
  { number: '324', floor: 3, credits: 1 },
  { number: '325', floor: 3, credits: 1 },
  { number: '326', floor: 3, credits: 1 },
  { number: '327', floor: 3, credits: 1 },
  { number: '328', floor: 3, credits: 1 },
  { number: '329', floor: 3, credits: 1 },
  { number: '331', floor: 3, credits: 1 },
  { number: '333', floor: 3, credits: 1 },

  // Floor 4
  { number: '401', floor: 4, credits: 1.5 },
  { number: '404', floor: 4, credits: 2 },
  { number: '405', floor: 4, credits: 1 },
  { number: '407', floor: 4, credits: 1 },
  { number: '408', floor: 4, credits: 2 },
  { number: '409', floor: 4, credits: 1 },
  { number: '410', floor: 4, credits: 2 },
  { number: '412', floor: 4, credits: 1 },
  { number: '415', floor: 4, credits: 2 },
  { number: '416', floor: 4, credits: 1 },
  { number: '418', floor: 4, credits: 1 },
  { number: '419', floor: 4, credits: 1.5 },
  { number: '420', floor: 4, credits: 1 },
  { number: '422', floor: 4, credits: 1 },
  { number: '423', floor: 4, credits: 1 },
  { number: '424', floor: 4, credits: 1 },
  { number: '425', floor: 4, credits: 1 },
  { number: '426', floor: 4, credits: 1 },
  { number: '427', floor: 4, credits: 1 },
  { number: '428', floor: 4, credits: 1 },
  { number: '429', floor: 4, credits: 1 },
  { number: '431', floor: 4, credits: 1 },
  { number: '433', floor: 4, credits: 1 },

  // Floor 5
  { number: '501', floor: 5, credits: 1.5 },
  { number: '504', floor: 5, credits: 2 },
  { number: '505', floor: 5, credits: 1 },
  { number: '507', floor: 5, credits: 1 },
  { number: '508', floor: 5, credits: 2 },
  { number: '509', floor: 5, credits: 1 },
  { number: '510', floor: 5, credits: 2 },
  { number: '512', floor: 5, credits: 1 },
  { number: '515', floor: 5, credits: 2 },
  { number: '516', floor: 5, credits: 1 },
  { number: '518', floor: 5, credits: 1 },
  { number: '519', floor: 5, credits: 1.5 },
  { number: '520', floor: 5, credits: 1 },
  { number: '522', floor: 5, credits: 1 },
  { number: '523', floor: 5, credits: 1 },
  { number: '524', floor: 5, credits: 1 },
  { number: '525', floor: 5, credits: 1 },
  { number: '526', floor: 5, credits: 1 },
  { number: '527', floor: 5, credits: 1 },
  { number: '528', floor: 5, credits: 1 },
  { number: '529', floor: 5, credits: 1 },
  { number: '531', floor: 5, credits: 1 },
  { number: '533', floor: 5, credits: 1 },

  // Floor 6
  { number: '601', floor: 6, credits: 1.5 },
  { number: '602', floor: 6, credits: 1 },
  { number: '604', floor: 6, credits: 1 },
  { number: '605', floor: 6, credits: 1 },
  { number: '607', floor: 6, credits: 1 },
  { number: '608', floor: 6, credits: 2 },
  { number: '609', floor: 6, credits: 1 },
  { number: '610', floor: 6, credits: 2 },
  { number: '612', floor: 6, credits: 1 },
  { number: '614', floor: 6, credits: 1 },
  { number: '615', floor: 6, credits: 2 },
  { number: '616', floor: 6, credits: 1 },
  { number: '618', floor: 6, credits: 1 },
  { number: '619', floor: 6, credits: 1.5 },
  { number: '620', floor: 6, credits: 1 },
  { number: '622', floor: 6, credits: 1 },
  { number: '623', floor: 6, credits: 1 },
  { number: '624', floor: 6, credits: 1 },
  { number: '625', floor: 6, credits: 1 },
  { number: '626', floor: 6, credits: 1 },
  { number: '627', floor: 6, credits: 1 },
  { number: '628', floor: 6, credits: 1 },
  { number: '629', floor: 6, credits: 1 },
  { number: '631', floor: 6, credits: 1 },
  { number: '633', floor: 6, credits: 1 },

  // Floor 7
  { number: '702+708', floor: 7, credits: 4, isCombined: true },
  { number: '705', floor: 7, credits: 4 }, // Wildcard room
  { number: '710', floor: 7, credits: 1 },
  { number: '711', floor: 7, credits: 1 },
  { number: '714', floor: 7, credits: 1 },
  { number: '718', floor: 7, credits: 1.5 },
  { number: '721', floor: 7, credits: 1.5 },
  { number: '722', floor: 7, credits: 1.5 },
  { number: '724', floor: 7, credits: 1 },
  { number: '725', floor: 7, credits: 1 },
  { number: '728', floor: 7, credits: 2 },
  { number: '729', floor: 7, credits: 1 },
  { number: '731', floor: 7, credits: 1 },

  // Floor 8
  { number: '802', floor: 8, credits: 1 },
  { number: '803', floor: 8, credits: 1 },
  { number: '808', floor: 8, credits: 2 },
  { number: '809', floor: 8, credits: 1 },
  { number: '810', floor: 8, credits: 1 },
  { number: '814', floor: 8, credits: 1 },
  { number: '818', floor: 8, credits: 1 },
  { number: '822', floor: 8, credits: 1 },
  { number: '823', floor: 8, credits: 1 },
  { number: '826', floor: 8, credits: 1 },
  { number: '827', floor: 8, credits: 1 },
  { number: '833', floor: 8, credits: 2 },
  { number: '900', floor: 8, credits: 4 },
];

export const TEAMS: HousekeepingTypes.Team[] = [
  {
    id: 'mosaique',
    name: 'Mosaique',
    color: '#4ade80', // green
    fixedRooms: ['101', '105', '107', '109', '110', '112', '115', '119', '123', '125', '127', '129', '131'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'mandarine',
    name: 'Mandarine',
    color: '#facc15', // yellow
    fixedRooms: ['201', '202', '203', '204', '205', '206', '207', '209', '210', '211', '212', '227', '229', '230', '231', '232', '233'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'lempicka',
    name: 'Lempicka',
    color: '#fb923c', // orange
    fixedRooms: ['208', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226', '228'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'soie',
    name: 'Soie',
    color: '#3b82f6', // blue
    fixedRooms: ['301', '302', '303', '304', '305', '306', '307', '309', '310+312', '311', '313', '314', '327', '329', '330', '331', '332', '333'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'paris',
    name: 'Paris',
    color: '#a855f7', // purple
    fixedRooms: ['308', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '328'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'prince',
    name: 'Prince',
    color: '#ef4444', // red
    fixedRooms: ['401', '402', '403', '404', '405', '406', '407', '409', '410', '411', '412', '427', '429', '430', '431', '432', '433'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'miroir',
    name: 'Miroir',
    color: '#a3a3a3', // gray
    fixedRooms: ['408', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '428'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'artdeco',
    name: 'Art Deco',
    color: '#facc15', // yellow (different shade)
    fixedRooms: ['501', '502', '503', '504', '505', '506', '507', '509', '510', '511', '512', '527', '529', '530', '531', '532', '533'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'cuir',
    name: 'Cuir',
    color: '#1f2937', // dark gray
    fixedRooms: ['508', '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526', '528'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'ceyladon',
    name: 'Ceyladon',
    color: '#4ade80', // green (different shade)
    fixedRooms: ['601', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '623'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'or',
    name: 'Or',
    color: '#fb923c', // orange (different shade)
    fixedRooms: ['602', '604', '620', '622', '624', '625', '626', '627', '628', '629', '630', '631', '632', '633'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'macassar',
    name: 'Macassar',
    color: '#a855f7', // purple (different shade)
    fixedRooms: ['702+708', '710', '711', '714', '718', '721', '722', '724', '725', '728', '729', '731'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
  {
    id: 'duplex',
    name: 'Duplex',
    color: '#a3a3a3', // gray (different shade)
    fixedRooms: ['802', '803', '808', '809', '810', '814', '818', '822', '823', '826', '827', '833', '900'],
    assignedRooms: [],
    totalCredits: 0,
    floors: [],
  },
];

// Special room that can be assigned to any team
export const WILDCARD_ROOMS = ['705'];

// Get floor summary statistics
export const getFloorSummary = () => {
  const floors = Array.from(new Set(ALL_ROOMS.map(room => room.floor))).sort();

  return floors.map(floor => {
    const floorRooms = ALL_ROOMS.filter(room => room.floor === floor);
    const totalRooms = floorRooms.length;
    const totalCredits = floorRooms.reduce((sum, room) => sum + room.credits, 0);

    return {
      floor,
      totalRooms,
      totalCredits,
      rooms: floorRooms,
    };
  });
}; 