import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

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
    const posts = databases.listDocuments(
      databaseId as string,
      videoCollectionId as string
    );
    return (await posts).documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getLatestPost = async () => {
  try {
    const posts = databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );
    return (await posts).documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
