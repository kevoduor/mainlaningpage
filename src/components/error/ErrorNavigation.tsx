
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Compass, ArrowLeft } from "lucide-react";
import { useDeviceType } from "@/hooks/use-device-type";

const ErrorNavigation: React.FC = () => {
  const { isMobile } = useDeviceType();
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'} gap-4`}>
      <Button asChild size={isMobile ? "default" : "lg"} className="w-full">
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full">
        <Link to="/blog">
          <Compass className="mr-2 h-4 w-4" />
          Explore our Blog
        </Link>
      </Button>
      
      <Button 
        variant="ghost" 
        size={isMobile ? "default" : "lg"}
        onClick={() => window.history.back()}
        className="w-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default ErrorNavigation;
