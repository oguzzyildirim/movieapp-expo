import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [storedData, setStoredData] = useState<T>(initialValue);

  const storeData = async (value: T) => {
    try {
      const valueToStore = JSON.stringify(value);
      await AsyncStorage.setItem(key, valueToStore);
      setStoredData(value);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storageValue = await AsyncStorage.getItem(key);
        if (storageValue !== null) {
          setStoredData(JSON.parse(storageValue));
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [key]);

  return { storedData, storeData };
};
