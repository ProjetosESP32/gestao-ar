import { Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Children, forwardRef, ReactNode, useImperativeHandle, useState } from 'react'
import { TabPanel } from './TabPanel'

export interface Step {
  label: string
  isOptional: boolean
}

interface FullStepProps {
  steps: Step[]
  children: JSX.Element[]
  EndStepperComponent: ReactNode
  onReset?: () => void
  onFinish?: () => void
}

export interface FullStepRef {
  reset: () => void
}

export const FullSteper = forwardRef<FullStepRef, FullStepProps>(
  ({ children, steps, onReset, onFinish, EndStepperComponent }, ref) => {
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())

    const isLast = activeStep === steps.length - 1

    const isStepOptional = (step: number) => steps[step].isOptional
    const isStepSkipped = (step: number) => skipped.has(step)

    const handleNext = () => {
      if (isLast) {
        onFinish && onFinish()
      }

      if (isStepSkipped(activeStep)) {
        skipped.delete(activeStep)
      }

      setActiveStep(activeStep + 1)
      setSkipped(skipped)
    }

    const handleBack = () => {
      setActiveStep(activeStep - 1)
    }

    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.")
      }

      setActiveStep(activeStep + 1)

      skipped.add(activeStep)
      setSkipped(skipped)
    }

    const handleReset = () => {
      onReset && onReset()
      setActiveStep(0)
    }

    useImperativeHandle(ref, () => ({
      reset() {
        setActiveStep(0)
        setSkipped(new Set())
      },
    }))

    return (
      <Stack spacing={2}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label, isOptional }, index) => (
            <Step key={label} completed={isStepSkipped(index) || index < activeStep}>
              <StepLabel optional={isOptional ? <Typography variant='caption'>Opcional</Typography> : null}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {Children.map(children, (child, index) => (
          <TabPanel panelNumber={index} selectedPanel={activeStep}>
            {child}
          </TabPanel>
        ))}
        {activeStep === steps.length ? (
          EndStepperComponent
        ) : (
          <Stack direction='row' justifyContent='space-between'>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            <Stack direction='row' spacing={1}>
              {isStepOptional(activeStep) && !isLast && <Button onClick={handleSkip}>Pular</Button>}
              {isLast && <Button onClick={handleReset}>Reiniciar</Button>}
              <Button onClick={handleNext}>{isLast ? 'Finalizar' : 'Próximo'}</Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    )
  },
)
