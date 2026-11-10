function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalised = string.toLowerCase().replace(/\s/g, '');
  const reversed = normalised.split('').reverse().join('');
  return normalised === reversed;
}

const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, meetingDuration) => {
  const toMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};
export { checkLength, isPalindrome, isMeetingWithinWorkday };
