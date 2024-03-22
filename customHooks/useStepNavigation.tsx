/**
 * Custom hook that manages navigation between steps.
 * Maintains current step state and provides handlers to
 * increment or decrement the step.
 */

import { useState } from "react";

export const useStepNavigation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Total number of steps

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return {
    currentStep,
    totalSteps,
    handleNext,
    handlePrev,
  };
};
