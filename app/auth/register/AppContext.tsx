// auth/register/AppContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  firstName?: string;
  lastName?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  maritalStatus?: string;
  socioProfessionalStatus?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  return (
    <AppContext.Provider value={{ currentStep, setCurrentStep, formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;