
import React from 'react';
import { fadeIn } from '@/utils/animationUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, Star, Clock, Plus } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const collections = [
    { 
      id: 1, 
      title: "Development Resources", 
      description: "Useful articles and tutorials for coding",
      icon: <Folder className="h-5 w-5" />,
      items: 12,
      lastUpdated: "2 days ago"
    },
    { 
      id: 2, 
      title: "AI Research Papers", 
      description: "Collection of interesting AI and ML research",
      icon: <Star className="h-5 w-5" />,
      items: 8,
      lastUpdated: "1 week ago"
    },
    { 
      id: 3, 
      title: "Project Ideas", 
      description: "Inspiration for future projects",
      icon: <Clock className="h-5 w-5" />,
      items: 5,
      lastUpdated: "3 days ago"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#343440]">
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-[#343440]">
        <h1 className="font-semibold">Collections</h1>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Card key={collection.id} className={`border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ${fadeIn(index + 1)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 p-2 rounded-md">
                      {collection.icon}
                    </div>
                    <Button variant="ghost" size="icon">
                      <span className="text-lg">⋯</span>
                    </Button>
                  </div>
                  <CardTitle className="mt-2">{collection.title}</CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {collection.items} items • Updated {collection.lastUpdated}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Collection</Button>
                </CardFooter>
              </Card>
            ))}

            {/* Add Collection Card */}
            <Card className={`border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${fadeIn(4)}`}>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                <Plus className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create New Collection</h3>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Organize your favorite searches and resources
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
