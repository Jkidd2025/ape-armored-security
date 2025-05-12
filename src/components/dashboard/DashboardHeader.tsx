
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">ApeArmor Token Dashboard</h1>
      <p className="text-muted-foreground">
        Real-time analytics and statistics for the ApeArmor token ecosystem
      </p>
      
      <Card className="mt-6 bg-gradient-to-r from-apearmor-dark to-black text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <img 
              src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
              alt="ApeArmor Logo" 
              className="w-8 h-8 mr-2"
            />
            ApeArmor (APE)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-300">Current Price</p>
              <p className="text-2xl font-bold">$0.00075</p>
              <span className="inline-flex items-center text-green-400 text-sm">
                +2.3% <span className="ml-1">↑</span>
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-300">Market Cap</p>
              <p className="text-2xl font-bold">$748,100</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">24h Volume</p>
              <p className="text-2xl font-bold">$24,563</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
