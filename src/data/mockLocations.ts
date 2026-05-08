export interface Location {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  coordinates: { lat: number; lng: number };
  isHiddenGem: boolean;
  category: 'nature' | 'urban' | 'cultural' | 'adventure';
}

export const mockLocations: Location[] = [
  {
    id: '1',
    title: 'Secret Lagoons of El Nido',
    description: 'Hidden turquoise waters surrounded by towering limestone cliffs in Palawan.',
    youtubeId: '3zO_HpepZis', // Example travel video
    coordinates: { lat: 11.1963, lng: 119.3146 },
    isHiddenGem: true,
    category: 'nature',
  },
  {
    id: '2',
    title: 'Shibuya Nightlife',
    description: 'The electric pulse of Tokyo’s most iconic crossing and neon-lit alleys.',
    youtubeId: '9vMsh_LzT9A', // Example Tokyo video
    coordinates: { lat: 35.6595, lng: 139.7005 },
    isHiddenGem: false,
    category: 'urban',
  },
  {
    id: '3',
    title: 'Kyoto Zen Temples',
    description: 'Ancient spiritual sanctuaries and serene rock gardens in Japan’s cultural heart.',
    youtubeId: 'qf6u9LpW_pM', // Example Kyoto video
    coordinates: { lat: 35.0116, lng: 135.7681 },
    isHiddenGem: false,
    category: 'cultural',
  },
  {
    id: '4',
    title: 'Swiss Alps Paragliding',
    description: 'Soar above Interlaken for the ultimate adrenaline rush and breathtaking peaks.',
    youtubeId: 'Kz9p0oT9X6E', // Example Alps video
    coordinates: { lat: 46.6863, lng: 7.8632 },
    isHiddenGem: false,
    category: 'adventure',
  },
  {
    id: '5',
    title: 'Chefchaouen Blue City',
    description: 'A labyrinth of blue-washed streets tucked away in the Rif Mountains of Morocco.',
    youtubeId: 'q_OosC9vJ5A', // Example Chefchaouen video
    coordinates: { lat: 35.1688, lng: -5.2636 },
    isHiddenGem: true,
    category: 'cultural',
  },
  {
    id: '6',
    title: 'Banff National Park',
    description: 'Glacial lakes and rugged peaks in the heart of the Canadian Rockies.',
    youtubeId: 'l9-3EitA50E', // Example Banff video
    coordinates: { lat: 51.4968, lng: -116.0469 },
    isHiddenGem: false,
    category: 'nature',
  }
];
