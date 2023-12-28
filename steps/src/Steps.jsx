import { useState } from "react";
import { Button } from "./Button";
import StepMessage from "./StepMessage";
const message = ["Learn React", "Apply for jobs", "Invest your new income"];

export function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep((currentStep) => currentStep - 1);
    }
  }

  function handleNext() {
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
    }
  }

  function handleClosed() {
    setIsOpen((is) => !is);
  }

  return (
    <>
      <button className="close" onClick={() => handleClosed()}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{message[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              textColor="white"
              bgColor="#7950f2"
              onClick={handlePrevious}
            >
              <span> {`<--`} </span> Previous
            </Button>
            <Button textColor="white" bgColor="#7950f2" onClick={handleNext}>
              Next <span> {`-->`} </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
