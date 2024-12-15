import {
  Account, // Handles user authentication operations.
  Avatars, // Generates avatar images (for user profiles).
  Client, // Initializes Appwrite client for making requests.
  Databases, // Provides access to databases.
  ID, // Generates unique IDs for documents and users.
  ImageGravity, // (Unused here, might be for handling image positioning in Appwrite).
  Query, // Provides methods for querying the database.
  Storage, // Manages file storage operations.
} from 'react-native-appwrite';
import { AppConfig, Form } from './types'; // Custom types (not used in this snippet).
import { ImagePickerAsset } from 'expo-image-picker'; // For picking images (not used in this snippet).
import Constants from 'expo-constants';
const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECTID,
  APPWRITE_DATABASEID,
  APPWRITE_PLATFORM,
  APPWRITE_STORAGEID,
  APPWRITE_USERCOLLECTIONID,
  APPWRITE_VIDEOCOLLECTIONID,
} = Constants.expoConfig?.extra as AppConfig;

// Configuration object for Appwrite integration, using environment variables.
export const config = {
  endpoint: APPWRITE_ENDPOINT, // Appwrite API endpoint.
  platform: APPWRITE_PLATFORM, // Platform identifier for the app.
  projectId: APPWRITE_PROJECTID, // Project ID in Appwrite.
  databaseId: APPWRITE_DATABASEID, // Database ID in Appwrite.
  userCollectionId: APPWRITE_USERCOLLECTIONID, // Collection ID for user data.
  videoCollectionId: APPWRITE_VIDEOCOLLECTIONID, // Collection ID for video posts.
  storageId: APPWRITE_STORAGEID, // Storage ID for file storage.
};

// Destructure the config values for ease of use.
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Initialize the Appwrite client with the endpoint, project, and platform details.
const client = new Client();
client
  .setEndpoint(endpoint as string) // Set the Appwrite endpoint.
  .setProject(projectId as string) // Set the project ID.
  .setPlatform(platform as string); // Set the platform/bundle ID.

// Initialize Appwrite services for account management, storage, avatars, and databases.
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new user account in Appwrite.
export const createUser = async (
  email: string, // User email address.
  password: string, // User password.
  username: string // Username for the user.
) => {
  try {
    // Create a new account with the provided email, password, and username.
    const newAccount = await account.create(
      ID.unique(), // Generate a unique user ID.
      email,
      password,
      username
    );

    // If account creation fails, throw an error.
    if (!newAccount) throw Error;

    // Generate an avatar URL based on the username (using initials).
    const avatarUrl = avatars.getInitials(username);

    // Sign in the user after creating the account.
    await signIn(email, password);

    // Create a new document in the user collection with user details.
    const newUser = await databases.createDocument(
      databaseId as string,
      userCollectionId as string,
      ID.unique(), // Generate a unique document ID.
      {
        accountId: newAccount.$id, // Store the account ID.
        email,
        username,
        avatar: avatarUrl, // Store the avatar URL.
      }
    );
    return newUser; // Return the created user document.
  } catch (error: any) {
    console.log(error); // Log any errors.
    throw new Error(error); // Throw an error if something fails.
  }
};

// Function to sign in a user using email and password.
export const signIn = async (email: string, password: string) => {
  try {
    // Create a new session with email and password.
    const session = await account.createEmailPasswordSession(email, password);
    return session; // Return the session data.
  } catch (error: any) {
    throw new Error(error); // Throw an error if sign-in fails.
  }
};

// Function to get the current logged-in user.
export const getCurrentUser = async () => {
  try {
    // Retrieve the current authenticated account.
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    // Fetch user details from the database using the account ID.
    const currentUser = await databases.listDocuments(
      databaseId as string,
      userCollectionId as string,
      [Query.equal('accountId', currentAccount.$id)] // Query for the user document.
    );

    // If no user is found, throw an error.
    if (!currentUser || currentUser.documents.length === 0)
      throw new Error('No user is logged in');

    // Return the user and their preferences.
    return {
      currentUser: currentUser.documents[0],
      userPrefs: currentAccount.prefs,
    };
  } catch (error: any) {
    throw new Error(error); // Throw an error if fetching user fails.
  }
};

// Function to fetch all video posts from the database.
export const getAllPosts = async () => {
  try {
    // Fetch all documents (posts) from the video collection, ordered by creation date.
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt')] // Sort by creation date in descending order.
    );
    return posts.documents; // Return the fetched posts.
  } catch (error: any) {
    throw new Error(error); // Throw an error if fetching posts fails.
  }
};

// Function to fetch the latest video posts (up to 7).
export const getLatestPost = async () => {
  try {
    // Fetch the latest 7 documents (posts) from the video collection.
    const posts = await databases.listDocuments(
      databaseId as string,
      videoCollectionId as string,
      [Query.orderDesc('$createdAt'), Query.limit(7)] // Sort by creation date and limit to 7.
    );
    return posts.documents; // Return the fetched posts.
  } catch (error: any) {
    throw new Error(error); // Throw an error if fetching the latest posts fails.
  }
};

// Sign out the current user by deleting the active session
export const signOut = async () => {
  try {
    // Delete the current session
    const session = await account.deleteSession('current');
    return session; // Return the session information
  } catch (error: any) {
    throw new Error(error); // If there's an error, throw a new error
  }
};

// Upload a file to the server
export const uploadFile = async (file: ImagePickerAsset, type: string) => {
  if (!file) return; // If no file is provided, return early

  // Prepare the file metadata
  const asset = {
    name: file.fileName as string, // File name
    type: file.mimeType as string, // Mime type of the file
    size: file.fileSize as number, // File size
    uri: file.uri, // URI of the file
  };

  try {
    // Upload the file to the storage service
    const uploadedFile = await storage.createFile(
      storageId as string, // Storage ID
      ID.unique(), // Unique ID for the file
      asset // File metadata
    );

    // Get the preview URL of the uploaded file
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl; // Return the URL of the uploaded file
  } catch (error: any) {
    throw new Error(error); // If there's an error, throw a new error
  }
};

// Get a preview of the uploaded file (either image or video)
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    // Check the type of file and fetch the preview accordingly
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId as string, fileId as string); // Get video preview
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        storageId as string, // Storage ID
        fileId, // File ID
        2000, // Width of the preview
        2000, // Height of the preview
        'top' as ImageGravity, // Image gravity (positioning)
        100 // Image quality
      );
    } else {
      throw new Error('Invalid file type'); // If the type is invalid, throw an error
    }

    if (!fileUrl) throw Error; // If no URL is returned, throw an error

    return fileUrl; // Return the preview URL
  } catch (error: any) {
    throw new Error(error); // If there's an error, throw a new error
  }
};

// Create a video post by uploading the thumbnail and video files
export const createVideoPost: (form: Form) => void = async (form) => {
  try {
    // Upload the thumbnail and video files simultaneously
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail as ImagePickerAsset, 'image'), // Upload thumbnail image
      uploadFile(form.video as ImagePickerAsset, 'video'), // Upload video
    ]);

    // Create a new post in the database with the provided data
    const newPost = await databases.createDocument(
      databaseId as string, // Database ID
      videoCollectionId as string, // Video collection ID
      ID.unique(), // Unique ID for the post
      {
        title: form.title as string, // Title of the video post
        thumbnail: thumbnailUrl, // URL of the uploaded thumbnail
        video: videoUrl, // URL of the uploaded video
        prompt: form.prompt, // Prompt text for the post
        creator: form.userId, // Creator ID (user who is posting)
      }
    );

    return newPost; // Return the newly created post
  } catch (error: any) {
    throw new Error(error); // If there's an error, throw a new error
  }
};

// Get video posts created by a specific user
export const getUserPosts = async (userId: string) => {
  try {
    // List all video posts where the creator matches the userId
    const posts = await databases.listDocuments(
      databaseId as string, // Database ID
      videoCollectionId as string, // Video collection ID
      [Query.equal('creator', userId)] // Query to filter posts by creator
    );

    return posts.documents; // Return the list of posts
  } catch (error: any) {
    throw new Error(error); // If an error occurs, throw a new error
  }
};

// Search video posts that match a given query
export const searchPosts = async (query: string) => {
  try {
    // Search for video posts where the title matches the query
    const posts = await databases.listDocuments(
      databaseId as string, // Database ID
      videoCollectionId as string, // Video collection ID
      [Query.search('title', query)] // Query to search titles of posts
    );

    if (!posts) throw new Error('Something went wrong'); // If no posts are found, throw an error

    return posts.documents; // Return the list of posts
  } catch (error: any) {
    throw new Error(error); // If an error occurs, throw a new error
  }
};

// Get the latest created video posts (up to 7 posts)
export const getLatestPosts = async () => {
  try {
    // List video posts ordered by creation date (most recent first), limiting the result to 7 posts
    const posts = await databases.listDocuments(
      databaseId as string, // Database ID
      videoCollectionId as string, // Video collection ID
      [Query.orderDesc('$createdAt'), Query.limit(7)] // Query to order by creation date
    );

    return posts.documents; // Return the list of posts
  } catch (error: any) {
    throw new Error(error); // If an error occurs, throw a new error
  }
};

// Get the current user's saved video posts by their IDs
export const getSavedPosts = async (ids: string[]) => {
  try {
    // List documents where the post ID matches one of the saved IDs
    const posts = await databases.listDocuments(
      databaseId as string, // Database ID
      videoCollectionId as string, // Video collection ID
      [Query.equal('$id', ids)] // Query to filter posts by saved IDs
    );
    return posts.documents; // Return the list of saved posts
  } catch (error: any) {
    throw new Error(error); // If an error occurs, throw a new error
  }
};

// Save a video post to the current user's favorites (or remove if already saved)
export const saveFavorite = async (id: string) => {
  try {
    // Get the current user's preferences
    const { prefs } = await account.get();
    let updatedPrefs = prefs.saved
      ? prefs.saved.includes(id) // Check if the ID is already saved
        ? prefs.saved.filter((e: string) => e !== id) // Remove if already saved
        : [...prefs.saved, id] // Add if not already saved
      : [id]; // If no saved preferences, initialize with the current ID

    // Update the user's preferences with the new saved list
    const res = await account.updatePrefs({
      saved: updatedPrefs, // New saved list
    });
    return res.prefs; // Return the updated preferences
  } catch (error: any) {
    throw new Error(error); // If an error occurs, throw a new error
  }
};

// Delete a video post (currently just logs the post ID)
export const deletePost = async (id: string) => {
  console.log(id); // For now, just log the ID of the post to be deleted
};
