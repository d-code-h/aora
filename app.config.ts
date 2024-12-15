import 'dotenv/config';

export default {
  name: 'aora',
  slug: 'aora',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './public/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './public/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.RECORD_AUDIO'],
    package: 'com.dcodeh.aora',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './public/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './public/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-video',
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '67a491d5-0fb5-40c7-92c9-1679820ff929',
    },
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
    APPWRITE_DATABASEID: process.env.APPWRITE_DATABASEID,
    APPWRITE_PLATFORM: process.env.APPWRITE_PLATFORM,
    APPWRITE_PROJECTID: process.env.APPWRITE_PROJECTID,
    APPWRITE_STORAGEID: process.env.APPWRITE_STORAGEID,
    APPWRITE_USERCOLLECTIONID: process.env.APPWRITE_USERCOLLECTIONID,
    APPWRITE_VIDEOCOLLECTIONID: process.env.APPWRITE_VIDEOCOLLECTIONID,
  },
  owner: 'dcodeh',
};
