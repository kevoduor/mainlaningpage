import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Home, ArrowLeft, RefreshCw, Search, Smile } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useDeviceType } from "@/hooks/use-device-type";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MobileOptimizedImage from "@/components/ui/MobileOptimizedImage";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Error404 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, isLandscape, screenSize } = useDeviceType();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    toast.error("Page not found", {
      description: "We couldn't find the page you were looking for",
      duration: 3000,
    });
    
    const titleInterval = setInterval(() => {
      setAnimateTitle(prev => !prev);
    }, 2000);
    
    return () => clearInterval(titleInterval);
  }, [location.pathname]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent, isTouch = false) => {
    if (found) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let clientX, clientY;
      
      if (isTouch && 'touches' in e) {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else if (!isTouch && 'clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      setPosition({
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y))
      });
      
      const distanceToCenter = Math.sqrt(
        Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
      );
      
      const threshold = isMobile ? 15 : 10;
      if (distanceToCenter < threshold) {
        setFound(true);
        toast.success("You found it!", {
          description: "Great job finding your way!",
        });
      }
    }
  };

  const resetGame = () => {
    setFound(false);
    setPosition({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/blog");
      toast.info(`Search results for "${searchQuery}" coming soon!`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | Nia Dental Software</title>
        <meta name="description" content="We couldn't find the page you were looking for. Please navigate back to our homepage or explore our blog." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.heynia.com/404" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 px-4 bg-gradient-to-b from-nia-50 to-white">
        <div className="max-w-4xl w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold text-nia-800 mb-4 sm:mb-6 ${animateTitle ? 'animate-pulse' : ''}`}>
              4<span className="text-nia-600">0</span>4
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-nia-700 text-balance">
              Oops! This page seems to be missing
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto">
              Looks like the page you're looking for has vanished like a loose tooth!
            </p>
          </div>
          
          <div 
            ref={containerRef}
            className="relative bg-nia-100 rounded-xl h-48 sm:h-64 md:h-80 mb-6 sm:mb-8 overflow-hidden cursor-pointer border-2 border-nia-300 shadow-lg"
            onMouseMove={(e) => !isMobile && handleInteraction(e)}
            onTouchMove={(e) => handleInteraction(e, true)}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-dashed border-nia-400 flex items-center justify-center">
              <div className="text-nia-500 text-xs">Guide here</div>
            </div>
            
            <div 
              className={`absolute w-12 h-12 transition-all duration-100 ${found ? 'animate-bounce' : ''}`}
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <Smile className="w-full h-full text-nia-600" />
            </div>
            
            {found && (
              <div className="absolute inset-0 bg-nia-100/80 flex flex-col items-center justify-center animate-fade-in">
                <h3 className="text-xl font-bold text-nia-700 mb-2">You found it!</h3>
                <p className="text-nia-600 mb-4">Now let's get you back on track</p>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            )}
            
            <div className="absolute bottom-2 left-2 text-xs text-nia-500">
              {!found ? (isMobile ? "Tap and drag the smile!" : "Guide the smile to the center!") : "Great job!"}
            </div>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Looking for something specific?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-nia-600 transition-all"
                />
              </div>
              <Button type="submit" className="sm:flex-shrink-0">Search</Button>
            </form>
          </div>
          
          <div className="mb-8">
            <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
              {isMobile ? (
                <MobileOptimizedImage 
                  src="/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png"
                  alt="Dental clinic workspace" 
                  className="w-full h-full object-cover"
                  priority={true}
                />
              ) : (
                <OptimizedImage 
                  src="/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png"
                  alt="Dental clinic workspace" 
                  className="w-full h-full object-cover"
                  priority={true}
                />
              )}
            </AspectRatio>
          </div>
          
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Error404;
