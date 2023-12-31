function formatTime(inputTime) {
    const [hours, minutes] = inputTime.split(':');
  
    const formattedHours = hours % 12 || 12;
  
    const period = hours < 12 ? 'AM' : 'PM';
  
    const formattedTime = `${formattedHours}:${minutes} ${period}`;
  
    return formattedTime;
  }