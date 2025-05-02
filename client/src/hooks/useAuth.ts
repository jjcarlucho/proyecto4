import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export interface User extends FirebaseUser {
  company?: string;
  phone?: string;
  subscription?: {
    plan: string;
    status: 'active' | 'inactive' | 'cancelled';
    nextBillingDate: string;
    features: string[];
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
}

interface ProfileData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        const enhancedUser: User = {
          ...user,
          company: userData?.company,
          phone: userData?.phone,
          subscription: userData?.subscription,
        };

        setState({
          user: enhancedUser,
          isAuthenticated: true,
          loading: false,
          error: null,
          forgotPasswordSuccess: false,
          resetPasswordSuccess: false,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
          forgotPasswordSuccess: false,
          resetPasswordSuccess: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.data();

      const enhancedUser: User = {
        ...result.user,
        company: userData?.company,
        phone: userData?.phone,
        subscription: userData?.subscription,
      };

      setState(prev => ({
        ...prev,
        user: enhancedUser,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const register = async (email: string, password: string, name: string, plan: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateFirebaseProfile(result.user, { displayName: name });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        name,
        subscription: {
          plan,
          status: 'active',
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          features: getPlanFeatures(plan),
        },
        createdAt: new Date().toISOString(),
      });

      setState(prev => ({
        ...prev,
        user: result.user,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setState(prev => ({
        ...prev,
        forgotPasswordSuccess: true,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!state.user) throw new Error('No authenticated user');

    try {
      // Update Firebase profile
      await updateFirebaseProfile(state.user, {
        displayName: data.name,
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', state.user.uid), {
        name: data.name,
        company: data.company,
        phone: data.phone,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          displayName: data.name,
          company: data.company,
          phone: data.phone,
        },
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateSubscription = async (plan: string) => {
    if (!state.user) throw new Error('No authenticated user');

    try {
      const subscription = {
        plan,
        status: 'active' as const,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        features: getPlanFeatures(plan),
      };

      // Update Firestore document
      await updateDoc(doc(db, 'users', state.user.uid), {
        subscription,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          subscription,
        },
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    updateProfile,
    updateSubscription,
  };
}

function getPlanFeatures(plan: string): string[] {
  switch (plan.toLowerCase()) {
    case 'basic':
      return [
        'Up to 10 vehicles per month',
        'Basic diagnostic reports',
        'Email support',
        '1 user account',
      ];
    case 'professional':
      return [
        'Up to 50 vehicles per month',
        'Advanced diagnostic reports',
        'Priority email & chat support',
        'Up to 3 user accounts',
        'Custom branding',
        'API access',
      ];
    case 'enterprise':
      return [
        'Unlimited vehicles',
        'Advanced diagnostic reports',
        '24/7 priority support',
        'Unlimited user accounts',
        'Custom branding',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
      ];
    default:
      return [];
  }
} 