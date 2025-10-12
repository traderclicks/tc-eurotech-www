/**
 * Central registry of images currently used on the website
 * This allows the gallery "Current" tab to dynamically show only active images
 */

export interface CurrentImageSet {
  section: string;
  description: string;
  images: string[];
}

/**
 * Get all images currently in use on the website
 */
export function getCurrentImages(): CurrentImageSet[] {
  return [
    {
      section: 'Home Hero Slider',
      description: 'Main homepage hero background images (in rotation order)',
      images: [
        '/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg', // 71
        '/images/DSC00619.jpg', // 80
        '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg', // 35
        '/images/DSC00748.jpg', // 93
        '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg', // 44
        '/images/DSC00972.jpg', // 99
        '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg', // 10
        '/images/DSC00773.jpg', // 97
        '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg', // 30
        '/images/DSC00751.jpg', // 94
        '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg', // 67
        '/images/DSC00727.jpg', // 90
        '/gallery/range-rover/range-rover-1725815761.jpg' // 116
      ]
    },
    {
      section: 'Home Service Cards',
      description: 'Service card background images on homepage',
      images: [
        '/gallery/jaguar/introspectivedsgn-oUoLi5k7esA-unsplash.jpg', // Jaguar
        '/gallery/land-rover/timtrad-CLm3pWXrS9Q-unsplash.jpg', // Land Rover
        '/gallery/range-rover/range-rover-1725815761.jpg', // Range Rover
        '/bmw.jpg', // BMW
        '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg', // Mini
        '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg' // Insurance
      ]
    },
    {
      section: 'Home Blog Cards',
      description: 'Blog article images on homepage',
      images: [
        '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg', // Blog 1
        '/bmw.jpg', // Blog 2
        '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg' // Blog 3
      ]
    },
    {
      section: 'Jaguar Page Hero',
      description: 'Jaguar service page hero slider images',
      images: [
        '/gallery/jaguar/introspectivedsgn-oUoLi5k7esA-unsplash.jpg',
        '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg',
        '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg',
        '/gallery/jaguar/escobar_kanishk-J1kmixRfys0-unsplash.jpg',
        '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg'
      ]
    },
    {
      section: 'Land Rover Page',
      description: 'Land Rover service page images - not yet configured',
      images: []
    },
    {
      section: 'Range Rover Page',
      description: 'Range Rover service page images - not yet configured',
      images: []
    },
    {
      section: 'BMW Page',
      description: 'BMW service page images - not yet configured',
      images: []
    },
    {
      section: 'Mini Page',
      description: 'Mini service page hero slider and content images',
      images: [
        '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg',
        '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
        '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg',
        '/gallery/mini/v1d-kySbGWdOmio-unsplash.jpg',
        '/gallery/mini/sonniehiles-PUBt7UPbJFY-unsplash.jpg',
        '/gallery/mini/huntleytography-0jdnuETGLRg-unsplash.jpg',
        '/gallery/mini/picsbyjameslee-msFTpW3g9CA-unsplash.jpg'
      ]
    },
    {
      section: 'Insurance Page',
      description: 'Insurance claims page images - not yet configured',
      images: []
    }
  ];
}

/**
 * Get flat array of all unique current images
 */
export function getCurrentImagePaths(): string[] {
  const allImages = getCurrentImages().flatMap(set => set.images);
  return [...new Set(allImages)]; // Remove duplicates
}
