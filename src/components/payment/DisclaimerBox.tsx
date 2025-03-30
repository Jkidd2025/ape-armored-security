
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const DisclaimerBox = () => {
  return (
    <Alert variant="destructive" className="bg-muted border border-amber-600 text-foreground mt-4">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-sm mt-2">
        <p className="font-semibold mb-2">Disclaimer:</p>
        <p className="mb-2">ApeArmor is not responsible for users sending incorrect payment types to the assigned payment wallet.</p>
        <p className="mb-2">ApeArmor cannot be held responsible for failed transactions because of network outages, wallet failures, or personal devices not responding to 3rd party applications.</p>
        <p>Failure to apply payment properly and complete all listed fields will fail to meet payment terms and conditions for an active ApeArmor account.</p>
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBox;
