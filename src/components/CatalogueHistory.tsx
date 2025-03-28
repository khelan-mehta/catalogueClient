
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, MoreHorizontal, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample data for demonstration
const mockCatalogues = [
  { 
    id: 1, 
    name: "Product Catalogue 1", 
    createdAt: "2023-06-12", 
    thumbnail: "/placeholder.svg" 
  },
  { 
    id: 2, 
    name: "Product Catalogue 2", 
    createdAt: "2023-06-10", 
    thumbnail: "/placeholder.svg" 
  },
  { 
    id: 3, 
    name: "Product Catalogue 3", 
    createdAt: "2023-06-05", 
    thumbnail: "/placeholder.svg" 
  },
];

const CatalogueHistory = () => {
  const [catalogues, setCatalogues] = useState(mockCatalogues);
  const [viewCatalogue, setViewCatalogue] = useState<typeof mockCatalogues[0] | null>(null);
  
  const deleteCatalogue = (id: number) => {
    setCatalogues(catalogues.filter(cat => cat.id !== id));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Catalogues</h2>
          <Button variant="outline">Sort by Date</Button>
        </div>
        
        {catalogues.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No catalogues yet</h3>
            <p className="text-gray-500 mb-4">Upload an image to create your first catalogue</p>
            <Button variant="outline">Create New Catalogue</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogues.map((catalogue) => (
              <div key={catalogue.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src={catalogue.thumbnail} 
                    alt={catalogue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="mr-2"
                          onClick={() => setViewCatalogue(catalogue)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{viewCatalogue?.name}</DialogTitle>
                          <DialogDescription>
                            Created on {viewCatalogue?.createdAt}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={viewCatalogue?.thumbnail} 
                            alt={viewCatalogue?.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button>Edit Catalogue</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium truncate">{catalogue.name}</h3>
                      <p className="text-xs text-gray-500">Created: {catalogue.createdAt}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => setViewCatalogue(catalogue)}
                          className="cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteCatalogue(catalogue.id)}
                          className="text-red-600 focus:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CatalogueHistory;
