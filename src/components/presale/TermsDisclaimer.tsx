
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PresaleFormValues } from "./PresaleForm";

interface TermsDisclaimerProps {
  control: Control<PresaleFormValues>;
}

const TermsDisclaimer = ({ control }: TermsDisclaimerProps) => {
  return (
    <FormField
      control={control}
      name="agreeToTerms"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-4">
          <div className="bg-muted p-4 rounded-md max-h-60 overflow-y-auto text-sm text-muted-foreground">
            <h3 className="font-semibold mb-2">Presale Terms & Conditions</h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                Not every application will be approved for presale. Application submission does not guarantee participation.
              </li>
              <li>
                Applicants can apply to more than one presale event if they wish to increase their chances of participation.
              </li>
              <li>
                All approved applicants will be required to enroll in at least the Chimp service package of ApeArmor.
              </li>
              <li>
                Application submission will be followed by a one-on-one video conference with a developer from the ApeArmor team.
              </li>
              <li>
                Approved applicants will receive direct messages from the team outlining the steps required to proceed with presale purchase and enrollment into Streamflow.
              </li>
              <li>
                By submitting this application, you acknowledge understanding of the vesting schedule and commitment level required for the project.
              </li>
              <li>
                The vesting schedule is subject to change based on presale outcomes and project development milestones.
              </li>
            </ul>
          </div>
          <div className="flex items-top space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="text-sm leading-none">
              I have read and agree to the terms and conditions
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TermsDisclaimer;
