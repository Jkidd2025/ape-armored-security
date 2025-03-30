
import React from "react";

type ProgressStepsProps = {
  currentStep: number;
  steps: { title: string; description: string }[];
};

const ProgressSteps = ({ currentStep, steps }: ProgressStepsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-8">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= index + 1 ? 'bg-apearmor-teal text-black' : 'bg-muted text-muted-foreground'}`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-20 ${currentStep > index + 1 ? 'bg-apearmor-teal' : 'bg-muted'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-muted-foreground">
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );
};

export default ProgressSteps;
