
import { useState, useEffect } from "react";
import { X, Check, Info, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type CookieSettings = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const consentGiven = localStorage.getItem("cookieConsentGiven");
    if (!consentGiven) {
      // If no consent was given yet, show the banner
      setIsVisible(true);
    } else {
      // Load saved settings
      try {
        const savedSettings = JSON.parse(localStorage.getItem("cookieSettings") || "{}");
        setCookieSettings(prev => ({ ...prev, ...savedSettings }));
      } catch (e) {
        console.error("Failed to parse saved cookie settings");
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    saveConsent(allAccepted);
    setIsVisible(false);
    toast({
      title: "Cookies accepted",
      description: "Thank you! Your cookie preferences have been saved.",
    });
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    saveConsent(necessaryOnly);
    setIsVisible(false);
    toast({
      title: "Only necessary cookies accepted",
      description: "Your preference for only necessary cookies has been saved.",
    });
  };

  const savePreferences = () => {
    saveConsent(cookieSettings);
    setSettingsOpen(false);
    setIsVisible(false);
    toast({
      title: "Cookie preferences saved",
      description: "Your cookie preferences have been updated.",
    });
  };

  const saveConsent = (settings: CookieSettings) => {
    localStorage.setItem("cookieConsentGiven", "true");
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    setCookieSettings(settings);
    
    // Here you would typically also fire some analytics or tracking events
    // based on the user's consent choices
  };

  const handleSettingChange = (key: keyof CookieSettings) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const openSettings = () => {
    setSettingsOpen(true);
  };

  // Manage cookie button that is always available
  const OpenCookieSettingsButton = () => (
    <Button 
      variant="outline" 
      size="sm" 
      className="fixed bottom-4 left-4 z-50 rounded-full p-2 h-10 w-10"
      onClick={openSettings}
      aria-label="Cookie Settings"
    >
      <Settings className="h-5 w-5" />
    </Button>
  );

  if (!isVisible && !settingsOpen) {
    return <OpenCookieSettingsButton />;
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-apearmor-darkbronze p-4 shadow-lg z-50 animate-in fade-in slide-in-from-bottom">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This site uses cookies to enhance your experience, analyze site usage, and assist with our marketing efforts. 
                  By clicking "Accept All", you consent to our use of cookies. To learn more or customize, click "Preferences".
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={acceptNecessary}>
                  Necessary Only
                </Button>
                <Button variant="outline" onClick={openSettings}>
                  Preferences
                </Button>
                <Button onClick={acceptAll} className="glow-effect">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-gradient-gold">Cookie Preferences</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. Necessary cookies are required for basic site functionality.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="options">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="about">About Cookies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="options" className="space-y-4 py-4">
              <div className="flex items-center justify-between py-3 border-b border-apearmor-darkbronze">
                <div>
                  <h4 className="font-medium text-primary">Necessary Cookies</h4>
                  <p className="text-sm text-muted-foreground">Required for the website to function properly.</p>
                </div>
                <Switch checked={cookieSettings.necessary} disabled />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-apearmor-darkbronze">
                <div>
                  <h4 className="font-medium">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">Help us improve our website by collecting anonymous usage data.</p>
                </div>
                <Switch 
                  id="analytics" 
                  checked={cookieSettings.analytics} 
                  onCheckedChange={() => handleSettingChange("analytics")} 
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-apearmor-darkbronze">
                <div>
                  <h4 className="font-medium">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">Used to track visitors across websites to display relevant advertisements.</p>
                </div>
                <Switch 
                  id="marketing" 
                  checked={cookieSettings.marketing} 
                  onCheckedChange={() => handleSettingChange("marketing")} 
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-apearmor-darkbronze">
                <div>
                  <h4 className="font-medium">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">Remember your settings and preferences for a better experience.</p>
                </div>
                <Switch 
                  id="preferences" 
                  checked={cookieSettings.preferences} 
                  onCheckedChange={() => handleSettingChange("preferences")} 
                />
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">What are cookies?</h4>
                  <p className="text-sm text-muted-foreground">
                    Cookies are small text files that are stored on your device when you visit a website. 
                    They are widely used to make websites work efficiently and provide information to the website owners.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-primary">How we use cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    ApeArmor uses cookies for various purposes, including remembering your preferences, 
                    understanding how you use our website, and providing personalized content and advertisements.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Your rights</h4>
                  <p className="text-sm text-muted-foreground">
                    Under various privacy laws including GDPR and CCPA/CPRA, you have the right to choose which cookies you accept. 
                    You can modify your preferences at any time by clicking the Cookie Settings button at the bottom of the page.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Learn more</h4>
                  <p className="text-sm text-muted-foreground">
                    For more information about how we handle your data, please visit our <a href="/privacy-policy" className="text-apearmor-teal hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button onClick={savePreferences}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {!isVisible && <OpenCookieSettingsButton />}
    </>
  );
};

export default CookieConsent;
