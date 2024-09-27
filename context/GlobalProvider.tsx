import { getAllPosts, getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect } from 'react';
import { Models } from 'react-native-appwrite';

import { GlobalType } from '@/lib/types';
import useAppwrite from '@/lib/useAppwrite';

const GlobalContext = createContext<GlobalType>({} as GlobalType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [userPrefs, setUserPrefs] = useState<Models.Preferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: posts, refetch } = useAppwrite(getAllPosts);

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
            setIsLoggedIn(true);
            setUser(currentUser);
            setUserPrefs(userPrefs);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        }
      )
      .catch((error: any) => {
        // console.log('Error during authentication check:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
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
      {children}
    </GlobalContext.Provider>
  );
};
