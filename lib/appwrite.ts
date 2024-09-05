import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from 'react-native-appwrite';
import { Form } from './types';
import { ImagePickerAsset } from 'expo-image-picker';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  databaseId: process.env.EXPO_PUBLIC_DATABASEID,
  userCollectionId: process.env.EXPO_PUBLIC_USERCOLLECTIONID,
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEOCOLLECTIONID,
  storageId: process.env.EXPO_PUBLIC_STORAGEID,
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint as string) // Your Appwrite Endpoint
  .setProject(projectId as string) // Your project ID
  .setPlatform(platform as string); // Your application ID or bundle ID.

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId as string,
      userCollectionId as string,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId as string,
      userCollectionId as string,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserPost = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Upload File
export const uploadFile = async (file: ImagePickerAsset, type: string) => {
  if (!file) return;

  const asset = {
    name: file.fileName as string,
    type: file.mimeType as string,
    size: file.fileSize as number,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId as string,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get File Preview
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId as string, fileId as string);
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        storageId as string,
        fileId,
        2000,
        2000,
        'top' as ImageGravity,
        100
      );
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Create Video Post
export const createVideoPost: (form: Form) => void = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail as ImagePickerAsset, 'image'),
      uploadFile(form.video as ImagePickerAsset, 'video'),
    ]);

    const newPost = await databases.createDocument(
      databaseId as string,
      videoCollectionId as string,
      ID.unique(),
      {
        title: form.title as string,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get video posts created by user
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.equal('creator', userId)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get video posts that matches search query
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.search('title', query)]
    );

    if (!posts) throw new Error('Something went wrong');

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get latest created video posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
