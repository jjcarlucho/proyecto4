import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, setAdmin, logout } from './authSlice';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        dispatch(setUser(user));
        // Consultar el rol en Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          dispatch(setAdmin(data.role === 'admin'));
        } else {
          dispatch(setAdmin(false));
        }
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
}; 