import { ref, set, get } from "firebase/database";
import { database } from "../firebaseConfig.js";
import { kpis, products, transactions } from "../data/data.js";

// Function to set data to Firebase Realtime Database
const setDataToFirebase = async (path, data) => {
  try {
    await set(ref(database, path), data);
  } catch (error) {
    throw error;
  }
};

// Function to get data from Firebase Realtime Database
const getDataFromFirebase = async (ref) => {
  try {
    const snapshot = await get(ref);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// Function to fetch and set data from/to Firebase Realtime Database
export const fetchKpi = async () => {
  const kpiRef = ref(database, 'kpis');


  try {
    // Setting data to Firebase
    await setDataToFirebase('kpis', kpis);

    // Fetching data from Firebase
    const kpiData = await getDataFromFirebase(kpiRef);



    return { kpiData};
  } catch (error) {
    throw error;
  }
};

export const fetchProduct = async () => {
  const productRef = ref(database, 'products');


  try {
    // Setting data to Firebase
    await setDataToFirebase('products', products);

    // Fetching data from Firebase
    const productData = await getDataFromFirebase(productRef);


    return { productData,  };
  } catch (error) {
    throw error;
  }
};

export const fectTransacTionData = async () => {
  const transactionRef = ref(database, 'transactions');

  try {
    // Setting data to Firebase
    await setDataToFirebase('transactions', transactions);

    // Fetching data from Firebase
    const transactionData = await getDataFromFirebase(transactionRef);


    return {  transactionData };
  } catch (error) {
    throw error;
  }
};
