import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export interface UserPlan {
  planType: 'free' | 'basic' | 'professional' | 'enterprise';
  startDate: Date;
  endDate: Date;
  features: string[];
  status: 'active' | 'inactive' | 'trial';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  plan: UserPlan;
  companyName?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const defaultPlan: UserPlan = {
      planType: 'free',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días de prueba
      features: ['basic_diagnostics', 'limited_reports'],
      status: 'trial'
    };

    const userData: UserProfile = {
      uid,
      email: data.email || '',
      displayName: data.displayName || null,
      plan: data.plan || defaultPlan,
      companyName: data.companyName,
      phoneNumber: data.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(userRef, userData);
    return userData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserPlan = async (uid: string, plan: Partial<UserPlan>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    const currentPlan = userSnap.data().plan;
    const updatedPlan = { ...currentPlan, ...plan, updatedAt: new Date() };
    
    await updateDoc(userRef, { plan: updatedPlan });
    return updatedPlan;
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw error;
  }
}; 