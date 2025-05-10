
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { fadeIn } from '@/utils/animationUtils';
import { UserRound, Mail, AtSign, Bell, Shield, LogOut, Key } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    avatar: '/lovable-uploads/user.png',
    notifications: {
      email: true,
      push: false
    },
    privacy: {
      profileVisibility: true,
      activityStatus: true
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleChange = (category: 'notifications' | 'privacy', field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully."
    });
  };

  const handlePasswordReset = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "Check your inbox for instructions to reset your password."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
        <h1 className="font-semibold">Profile Settings</h1>
      </header>
      <div className="flex-1 overflow-auto p-4 animate-fade-in bg-gray-50 dark:bg-chat-dark">
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-8">
            {/* Profile Information */}
            <Card className={fadeIn()}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={formData.avatar} alt={formData.name} />
                      <AvatarFallback>
                        <UserRound className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Avatar
                    </Button>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mt-1">
                      Pro Member
                    </Badge>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <UserRound className="w-4 h-4" />
                          Full Name
                        </Label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="transition-all duration-300"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="transition-all duration-300"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="username" className="flex items-center gap-2">
                          <AtSign className="w-4 h-4" />
                          Username
                        </Label>
                        <Input 
                          id="username" 
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Card className={fadeIn(2)}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => 
                        handleToggleChange('notifications', 'email', checked)
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch 
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => 
                        handleToggleChange('notifications', 'push', checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Privacy & Security */}
            <Card className={fadeIn(3)}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your account security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Make your profile visible to others
                      </p>
                    </div>
                    <Switch 
                      checked={formData.privacy.profileVisibility}
                      onCheckedChange={(checked) => 
                        handleToggleChange('privacy', 'profileVisibility', checked)
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Activity Status</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Show when you're active
                      </p>
                    </div>
                    <Switch 
                      checked={formData.privacy.activityStatus}
                      onCheckedChange={(checked) => 
                        handleToggleChange('privacy', 'activityStatus', checked)
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handlePasswordReset}
                    >
                      <Key className="w-4 h-4" />
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <Button 
                variant="destructive" 
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-primary hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
