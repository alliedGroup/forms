import './App.css';
import React, { useState } from 'react';
import PersonalInformation from './components/PersonalInformation';
import EducationDetails from './components/EducationDetails';
import FamilyDetails from './components/FamilyDetails';
import JointFamilyDetails from './components/JointFamilyDetails';
import AddressDetails from './components/AddressDetails';
import WorkExperience from './components/WorkExperience';
import EntranceExamDetails from './components/EntranceExamDetails';

const App = () => {
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Helper function to determine the range of visible steps for the indicator
  const getStepIndices = () => {
    const totalSteps = 8; // Total number of steps
    const visibleSteps = 4; // Steps to show at a time (3 or 4 steps)
    const startStep = Math.max(currentStep - Math.floor(visibleSteps / 2), 1);
    const endStep = Math.min(startStep + visibleSteps - 1, totalSteps);

    let steps = [];
    for (let i = startStep; i <= endStep; i++) {
      steps.push(i);
    }

    // Add ellipses if steps are skipped
    if (startStep > 1) {
      steps = [1, '...'].concat(steps.slice(1));
    }
    if (endStep < totalSteps) {
      steps.push('...');
      steps.push(totalSteps);
    }

    return steps;
  };

  return (
    <div className="container">
      {/* Step Indicator */}
      <div className="step-indicator-container text-center mt-4">
        <div className="step-indicator">
          {getStepIndices().map((step, index) => (
            <div
              key={index}
              className={`step-circle ${step === currentStep ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && <PersonalInformation data={data} handleInputChange={handleInputChange} />}
      {currentStep === 2 && <EducationDetails data={data} handleInputChange={handleInputChange} />}
      {currentStep === 3 && <FamilyDetails data={data} handleInputChange={handleInputChange} />}
      {currentStep === 4 && <JointFamilyDetails data={data} handleInputChange={handleInputChange} />}
      {currentStep === 5 && <AddressDetails data={data} handleInputChange={handleInputChange} />}
      {currentStep === 6 && <WorkExperience data={data} handleInputChange={handleInputChange} />}
      {currentStep === 7 && <EntranceExamDetails data={data} handleInputChange={handleInputChange} />}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        {currentStep > 1 && (
          <button className="btn btn-secondary" onClick={prevStep}>Back</button>
        )}
        {currentStep < 8 ? (
          <button className="btn btn-primary" onClick={nextStep}>Next</button>
        ) : (
          <button className="btn btn-success">Submit</button>
        )}
      </div>
    </div>
  );
};

export default App;
