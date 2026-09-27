"use client";

import { useState, useEffect } from "react";
import { useAuth, UserBiometricStatus } from "./useAuth";

const BIOMETRIC_STORAGE_KEY = "evoting_biometrics";

export function useBiometric() {
  const { user, updateUser } = useAuth();

  const [biometrics, setBiometrics] = useState<UserBiometricStatus>({
    face: true,
    fingerprint: true,
    qr: true,
    iris: false
  });

  useEffect(() => {
    if (user?.biometricStatus) {
      setBiometrics(user.biometricStatus);
    } else {
      const stored = localStorage.getItem(BIOMETRIC_STORAGE_KEY);
      if (stored) {
        try {
          setBiometrics(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored biometrics", e);
        }
      }
    }
  }, [user]);

  const verifyBiometric = (type: keyof UserBiometricStatus): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updated = { ...biometrics, [type]: true };
        setBiometrics(updated);
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, JSON.stringify(updated));
        if (updateUser) {
          updateUser({ biometricStatus: updated });
        }
        resolve(true);
      }, 1200);
    });
  };

  const allRequiredVerified = biometrics.face && biometrics.fingerprint && biometrics.qr;

  return {
    biometrics,
    verifyBiometric,
    allRequiredVerified
  };
}
