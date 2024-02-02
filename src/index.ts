class Employee {
	id: string;
	name: string;
	meetings: string[];
	timezone: string;
	constructor(id: string, name: string, meetings: string[], timezone: string) {
		this.id = id;
		this.name = name;
		this.meetings = meetings;
		this.timezone = timezone;
	}
}

class Meeting {
	id: number;
	startTime: number;
	endTime: number;
	requiredParticipants: string[];
	optionalParticipants: string[];
	dependencies: string[];
	priority: number;

	constructor(
		id: number,
		startTime: number,
		endTime: number,
		requiredParticipants: string[],
		optionalParticipants: string[],
		dependencies: string[],
		priority: number
	) {
		this.dependencies = dependencies;
		this.id = id;
		this.endTime = endTime;
		this.startTime = startTime;
		this.requiredParticipants = requiredParticipants;
		this.optionalParticipants = optionalParticipants;
		this.priority = priority;
	}
}

class MeetingRoom {
	id!: number;
	meetings!: Meeting[];

	constructor(id: number) {
		this.id = id;
		this.meetings = [];
	}

	isAvailable(startTime: number, endTime: number) {
		for (const meeting of this.meetings) {
			if (
				(startTime >= meeting.startTime && startTime <= meeting.endTime) ||
				(endTime >= meeting.startTime && endTime <= meeting.endTime)
			)
				return false;
		}
		return true;
	}

	bookMeeting(id: number, startTime: number, endTime: number) {
		const meeting = new Meeting(id, startTime, endTime, [], [], [], 1);
		this.meetings.push(meeting);
		return meeting;
	}
}

class MeetingScheduler {
	MAX_MEETING_ROOMS = 5;
	meetingRoomList!: MeetingRoom[];
	meetings!: Meeting[];
	counter = 0;

	constructor(n: number) {
		this.MAX_MEETING_ROOMS = n;
		this.meetingRoomList = [];
		this.counter = 0;
		this.meetings = [];
		this.initMeetingRooms();
	}

	initMeetingRooms() {
		for (let i = 0; i < this.MAX_MEETING_ROOMS; i++) {
			const room = new MeetingRoom(i);
			this.meetingRoomList.push(room);
		}
	}

	bookMeeting(startTime: number, endTime: number) {
		try {
			for (const room of this.meetingRoomList) {
				if (room.isAvailable(startTime, endTime)) {
					const meeting = room.bookMeeting(this.counter++, startTime, endTime);
					this.meetings.push(meeting);
					return meeting;
				}
			}
			throw new Error('Meeting Room Unavailable');
		} catch (error: any) {
			console.log(error.message);
		}
	}
}

// function scheduleMeetings(meetings, employees, meetingRooms) {
// 	const scheduledMeetings = [];

// 	meetings.forEach((meeting) => {
// 		const suitableEmployees = findSuitableEmployees(meeting, employees);
// 		const suitableRooms = findSuitableRooms(meeting, meetingRooms);

// 		if (suitableEmployees.length > 0 && suitableRooms.length > 0) {
// 			const scheduledMeeting = schedule(meeting, suitableEmployees, suitableRooms);
// 			scheduledMeetings.push(scheduledMeeting);
// 		}
// 	});

// 	return scheduledMeetings;
// }

// function findSuitableEmployees(meeting, employees) {
// 	// Implement logic to find employees with available time slots, considering constraints and preferences.
// 	return employees.filter((employee) => isAvailable(employee, meeting));
// }

// function findSuitableRooms(meeting, meetingRooms) {
// 	// Implement logic to find meeting rooms available for the specified duration and prioritize based on constraints.
// 	return meetingRooms.filter((room) => isRoomAvailable(room, meeting));
// }

// function schedule(meeting, employees, meetingRooms) {
// 	// Implement logic to schedule the meeting based on priorities, dependencies, and other constraints.
// 	// Update employee and room availability accordingly.
// 	const scheduledMeeting = {
// 		meeting,
// 		participants: employees,
// 		room: meetingRooms[0], // Assuming the first available room is selected
// 		startTime: findAppropriateTime(meeting, employees),
// 		endTime: findAppropriateTime(meeting, employees) + meeting.duration,
// 	};

// 	return scheduledMeeting;
// }

// function isAvailable(employee, meeting) {
// 	// Check if the employee is available during the meeting's time slot.
// 	// Consider constraints such as busy time slots and preferred time slots.
// 	return true; // Replace with actual logic
// }

// function isRoomAvailable(room, meeting) {
// 	// Check if the meeting room is available for the specified duration.
// 	// Consider constraints such as room limitations.
// 	return true; // Replace with actual logic
// }

// function findAppropriateTime(meeting, employees) {
// 	// Implement logic to find a suitable start time for the meeting respecting constraints.
// 	return Date.now(); // Replace with actual logic
// }
