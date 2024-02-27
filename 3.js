// Efficient Meeting Scheduler
// Problem Statement:
// You are developing a feature for a calendar application that helps users find available meeting times. Your task is to implement a MeetingScheduler class that supports the following operations:

// schedule(start, end): Adds a new meeting to the calendar. The start and end parameters are integers representing the start time and end time of the meeting (in a 24-hour format). This method should return true if the meeting was successfully scheduled without any conflicts, and false otherwise.

// findAvailableSlots(duration, start, end): Finds all available slots in the calendar that can accommodate a meeting of duration minutes, within the specified start and end times. This method should return a list of available slots, where each slot is represented by a tuple (availableStart, availableEnd).

// Meetings cannot overlap, but they can start immediately after another meeting ends. For simplicity, assume that all times are in minutes from the start of the day (e.g., 9:00 AM is represented as 540).

// Constraints:
// 0 ≤ start < end ≤ 24 * 60
// 1 ≤ duration ≤ 24 * 60
// The number of calls to schedule and findAvailableSlots will not exceed 104.

function createMeetingScheduler() {
  let meetings = []; // Closure to store meetings

  function schedule(start, end) {
    // If case : when meetings length is 0 meaning all schedule is just available. So, just push the schedule
    if (meetings.length === 0) {
      meetings.push([start, end]);
      return true;
    } else {
      // Starting schedule edge case
      if (end <= meetings[0][0]) {
        meetings.unshift([start, end]);
        return true;
      } else if (start >= meetings[meetings.length - 1][1]) {
        // Last schedule edge case
        meetings.push([start, end]);
        return true;
      }

      // Between schedule cases
      for (let i = 0; i < meetings.length - 1; i++) {
        if (start >= meetings[i][1] && end <= meetings[i+1][0]) {
          meetings.splice(i+1, 0, [start, end]);
          return true;
        }
      }
    }

    // No condition met
    return false;
  }

  function findAvailableSlots(duration, start, end) {
    const availableSlots = [];

    // If case : when meetings length is 0 meaning all schedule is available. So, just push the whole duration
    if (meetings.length === 0) {
      availableSlots.push([start, end]);
    } else {
      // Starting day case
      if (meetings[0][0] - start >= duration) {
        availableSlots.push([start, meetings[0][0]]);
      }

      // Between schedule case
      for (let i = 0; i < meetings.length - 1; i++) {
        if (meetings[i+1][0] - meetings[i][1] >= duration) {
          availableSlots.push([meetings[i][1], meetings[i+1][0]]);
        }
      }

      // Ending day case
      if (end - meetings[meetings.length - 1][1] >= duration) {
        availableSlots.push([meetings[meetings.length - 1][1], end]);
      }
    }

    return availableSlots;
  }

  return { schedule, findAvailableSlots };
}

const scheduler = createMeetingScheduler();

// Schedule some meetings
console.log(scheduler.schedule(60, 120));  // True: Meeting scheduled from 1:00 to 2:00
console.log(scheduler.schedule(150, 180)); // True: Meeting scheduled from 2:30 to 3:00

// Find available slots
console.log(scheduler.findAvailableSlots(30, 0, 240));
// Expected Output: [[0, 60], [120, 150], [180, 240]]
// Explanation: Shows available slots before the first meeting, between the two meetings, and after the last meeting within the specified range.
