
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const UserSettings = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-sm text-gray-500">
                Manage your account settings and preferences.
              </p>
            </div>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input id="company" placeholder="Your company name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry (Optional)</Label>
                <Input id="industry" placeholder="Your industry" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
              <p className="text-sm text-gray-500">
                Choose how and when you want to be notified.
              </p>
            </div>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive email notifications when your catalogue is generated.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Processing Updates</h3>
                  <p className="text-sm text-gray-500">
                    Get notified about processing status changes.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Features</h3>
                  <p className="text-sm text-gray-500">
                    Be the first to know about new features and updates.
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Communications</h3>
                  <p className="text-sm text-gray-500">
                    Receive promotional offers and marketing emails.
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">API Access</h2>
              <p className="text-sm text-gray-500">
                Manage your API keys for programmatic access to our services.
              </p>
            </div>
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>API Key</CardTitle>
                <CardDescription>
                  Use this key to access our API from your applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input
                    value="••••••••••••••••••••••••••••••"
                    readOnly
                  />
                  <Button variant="outline" size="sm">
                    Show
                  </Button>
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" className="text-red-600">
                    Revoke Key
                  </Button>
                  <Button>
                    Generate New Key
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h3 className="font-medium text-amber-800 mb-2">API Usage Limits</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 100 requests per day on the Free plan</li>
                <li>• Upgrade to Premium for unlimited API access</li>
                <li>• Rate limiting may apply during peak usage</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
