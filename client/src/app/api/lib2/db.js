import { initializeApp } from "firebase/app";
import { getDatabase, ref, orderByChild, startAt, endAt, limitToFirst } from "firebase/database";

// Initialize Firebase app
const firebaseConfig = {

  };
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

    
export const fetchUsers = async (q, page) => {
    try {
        const usersRef = ref(database, 'users');
        const query = orderByChild(usersRef, 'username').equalTo(q);
        const snapshot = await get(query);
        const usersObject = snapshot.val();
        const usersArray = usersObject ? Object.values(usersObject) : [];
        const count = usersArray.length;
        const users = usersArray.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
        return { count, users };
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch users");
    }
}

export const fetchUser = async (id) => {
    try {
        const userRef = ref(database, `users/${id}`);
        const snapshot = await get(userRef);
        return snapshot.val();
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch user");
    }
}