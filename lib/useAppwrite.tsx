import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Models } from 'react-native-appwrite';

/**
 * Custom React hook for fetching and managing data from Appwrite.
 *
 * @param fn - A function that returns a promise resolving to an array of Appwrite documents.
 * @returns An object containing:
 *   - `data`: The fetched data (array of documents).
 *   - `isLoading`: A boolean indicating whether data is currently being fetched.
 *   - `refetch`: A function to manually re-fetch the data.
 */
const useAppwrite = (fn: () => Promise<Models.Document[]>) => {
  // State to store fetched data
  const [data, setData] = useState<Models.Document[]>([]);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches data from the provided function `fn`.
   * Handles loading state, error alerts, and updates the data state.
   */
  const fetchData = async () => {
    setIsLoading(true); // Indicate loading state

    try {
      // Call the provided function to fetch data
      const response: Models.Document[] = await fn();
      setData(response); // Update the state with fetched data
    } catch (error: any) {
      // Handle any errors by showing an alert with the error message
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false); // Indicate loading has completed
    }
  };

  // useEffect runs the fetchData function once when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this only runs once on mount

  // Provide a `refetch` function to manually fetch the data again
  const refetch = () => fetchData();

  // Return the fetched data, loading state, and the refetch function
  return { data, isLoading, refetch };
};

export default useAppwrite;
