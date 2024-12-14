import { getAllPosts, getCurrentUser } from '@/lib/appwrite'; // Import functions to fetch posts and get the current user
import { createContext, useContext, useState, useEffect } from 'react'; // React hooks for context and state management
import { Models } from 'react-native-appwrite'; // Import Appwrite models for type safety

import { GlobalType } from '@/lib/types'; // Import custom types for global context
import useAppwrite from '@/lib/useAppwrite'; // Custom hook to handle Appwrite functions

// Create the GlobalContext to hold app-wide state
const GlobalContext = createContext<GlobalType>({} as GlobalType);

// Custom hook to use the global context
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider component to manage global state and provide it to the app
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  // State hooks to manage authentication and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [user, setUser] = useState<Models.Document | null>(null); // Stores the current user document or null
  const [userPrefs, setUserPrefs] = useState<Models.Preferences | null>(null); // Stores user preferences or null
  const [isLoading, setIsLoading] = useState(true); // Tracks if data is still loading

  // e '{ currentUser: Models.Document; userPrefs: Models.Preferences; }' is not assignable to parameter of type 'SetStateAction<Document | null>'

  // Use the custom hook to fetch all posts from Appwrite
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  // useEffect hook to check if the user is logged in when the component mounts
  useEffect(() => {
    getCurrentUser()
      .then(
        ({
          currentUser,
          userPrefs,
        }: {
          currentUser: Models.Document;
          userPrefs: Models.Preferences;
        }) => {
          if (currentUser) {
            setIsLoggedIn(true); // If user exists, set login state to true
            setUser(currentUser); // Store current user data
            setUserPrefs(userPrefs); // Store user preferences
          } else {
            setIsLoggedIn(false); // If no user, set login state to false
            setUser(null); // Clear user data
          }
        }
      )
      .catch((error: any) => {
        // console.log('Error during authentication check:', error); // Optional error logging
      })
      .finally(() => setIsLoading(false)); // Set loading state to false after the data fetch
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    // Provide the global state values to the children components
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        posts,
        refetch,
        userPrefs,
        setUserPrefs,
      }}
    >
      {children} {/* Render the children components within the provider */}
    </GlobalContext.Provider>
  );
};
