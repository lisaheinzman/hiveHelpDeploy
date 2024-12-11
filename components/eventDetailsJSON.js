const currentDate = new Date().toISOString().split('T')[0];

export const eventDetailsJSON = {
  [currentDate]: {
    title: 'Today',
    dateString: [currentDate],
    description: 'Have a wonderful day!!'
  },
  [currentDate]: {
    title: 'Today',
    dateString: [currentDate],
    description: 'Have a wonderful day!!'
  },
  '2024-02-04': {
    title: 'Special Event',
    dateString: '2024-02-04',
    description: 'This is a special event on February 4th.',
  },
  '2024-02-06': {
    title: 'Red Dot Event',
    dateString: '2024-02-04',
    description: 'This event has a red dot on February 6th.',
  }
}
