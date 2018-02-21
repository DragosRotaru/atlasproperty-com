export default {
  type: 'I\'m a',
  choices: {
    0: {
      text: 'student',
      type: 'looking to rent a place',
      choices: {
        1: {
          text: 'with some friends',
          link: '/properties?type=student&group=yes',
        },
        2: {
          text: 'with other students',
          link: '/properties?type=student&group=no',
        },
        3: {
          text: 'alone',
          link: '/properties?type=student&beds=1&group=no',
        },
      },
    },
    4: {
      text: 'professional',
      type: 'looking to',
      choices: {
        5: {
          text: 'find my ideal space',
          link: '/properties?type=professional',
        },
        6: {
          text: 'advance my career',
          link: '/company#careers',
        },
      },
    },
    7: {
      text: 'parent',
      type: 'looking to find',
      choices: {
        8: {
          text: 'all-inclusive',
          type: 'living for my child',
          link: '/tenants#lifestyle',
        },
        9: {
          text: 'affordable',
          type: 'living for my child',
          link: '/tenants#affordable',
        },
      },
    },
    10: {
      text: 'tenant',
      type: 'and I',
      choices: {
        11: {
          text: 'need a rent receipt',
          href: 'https://atlaspropertygroup.typeform.com/to/Gqtv2c',
        },
        12: {
          text: 'have a maintenance issue',
          href: 'https://atlaspropertygroup.typeform.com/to/wOt21e',
        },
        13: {
          text: 'want my place cleaned',
          href: 'https://atlaspropertygroup.typeform.com/to/VTOzC1',
        },
        14: {
          text: 'need to contact you',
          link: '/contact',
        },
      },
    },
    15: {
      text: 'property owner or investor',
      type: 'interested in',
      choices: {
        16: {
          text: 'property management solutions',
          link: '/owners#manage',
        },
        17: {
          text: 'buying property',
          link: '/owners#buy',
        },
        18: {
          text: 'developments',
          link: '/owners#develop',
        },
      },
    },
  },
};
