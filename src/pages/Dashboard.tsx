import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Layout,
  Upload,
  Image as ImageIcon,
  FileText,
  Settings,
} from "lucide-react";
import UploadSection from "@/components/UploadSection";
import CatalogueHistory from "@/components/CatalogueHistory";
import UserSettings from "@/components/UserSettings";
import { useToast } from "@/components/ui/use-toast";
import { clearSession, getSession, setSession } from "@/lib/session";
import axios from "axios";
import { BASE_URL } from "@/env";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("access_token");
    const userId = queryParams.get("userId") || "";

    if (token) {
      setSession("access_token", token);
      setSession("userId", userId);
    }

    const timeout = setTimeout(() => {
      const accessToken = getSession("access_token");
      if (!accessToken) {
        navigate("/login");
      } else {
        setTimeout(() => {
          navigate("/dashboard");
          fetchUserDetails();
        }, 1000);
      }
    }, 100);

    //const cleanupSSE = setupSSE(); // Initialize SSE connection

    return () => {
      clearTimeout(timeout);
      //cleanupSSE(); // Clean up SSE on component unmount
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/${getSession("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${getSession("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        setSession("access_token", user.newAccessToken);
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      clearSession();
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">
            CatalogueAI Dashboard
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="md:col-span-1 shadow-sm">
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "upload" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("upload")}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("history")}
                >
                  <ImageIcon className="mr-2 h-5 w-5" />
                  My Catalogues
                </Button>
                <Button
                  variant={activeTab === "templates" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("templates")}
                >
                  <Layout className="mr-2 h-5 w-5" />
                  Templates
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </nav>

              <div className="mt-8 pt-6 border-t">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900">Need help?</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Check our documentation or contact support if you have
                    questions.
                  </p>
                  <Button
                    variant="link"
                    className="text-indigo-600 p-0 h-auto mt-2 text-sm"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content area */}
          <div className="md:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="history">My Catalogues</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <UploadSection />
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <CatalogueHistory />
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Choose a Template
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        "Modern",
                        "Classic",
                        "Minimalist",
                        "Elegant",
                        "Bold",
                        "Creative",
                      ].map((template) => (
                        <div
                          key={template}
                          className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                          <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                            <Layout className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium">{template}</h3>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <UserSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
