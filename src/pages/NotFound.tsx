
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Compass, Home, ArrowLeft, RefreshCw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (found) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setPosition({
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y))
      });
      
      const distanceToCenter = Math.sqrt(
        Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
      );
      
      if (distanceToCenter < 5) {
        setFound(true);
      }
    }
  };

  const resetGame = () => {
    setFound(false);
    setPosition({ x: 50, y: 50 });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | Nia Dental Software</title>
        <meta name="description" content="We couldn't find the page you were looking for. Please navigate back to our homepage or explore our blog." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.heynia.com/404" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 px-4 bg-gradient-to-b from-nia-50 to-white">
        <div className="max-w-3xl w-full mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-nia-800 mb-4 sm:mb-6 animate-pulse">4<span className="text-nia-600">0</span>4</h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-nia-700">
            Oops! This page seems to be missing
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto">
            Looks like the page you're looking for has vanished like a loose tooth!
          </p>
          
          <div 
            ref={containerRef}
            className="relative bg-nia-100 rounded-xl h-48 sm:h-64 md:h-80 mb-6 sm:mb-8 overflow-hidden cursor-pointer border-2 border-nia-300 shadow-lg"
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
              if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const x = ((touch.clientX - rect.left) / rect.width) * 100;
                const y = ((touch.clientY - rect.top) / rect.height) * 100;
                
                setPosition({
                  x: Math.max(10, Math.min(90, x)),
                  y: Math.max(10, Math.min(90, y))
                });
                
                const distanceToCenter = Math.sqrt(
                  Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
                );
                
                if (distanceToCenter < 10) {
                  setFound(true);
                }
              }
            }}
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
              <svg viewBox="0 0 24 24" className="w-full h-full fill-nia-600">
                <path d="M12,2C7.58,2 4,4.58 4,9c0,4 4,9 4,9h8s4,-5 4,-9c0,-4.42 -3.58,-7 -8,-7zm0,5c1.66,0 3,1.34 3,3 0,1.66 -1.34,3 -3,3s-3,-1.34 -3,-3c0,-1.66 1.34,-3 3,-3z" />
              </svg>
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
              {!found ? (isMobile ? "Tap and drag the tooth!" : "Guide the tooth to the dental chair!") : "Great job!"}
            </div>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center`}>
            <Button asChild size={isMobile ? "default" : "lg"} className={isMobile ? "w-full" : ""}>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className={isMobile ? "w-full" : ""}>
              <Link to="/blog">
                <Compass className="mr-2 h-4 w-4" />
                Explore our Blog
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size={isMobile ? "default" : "lg"}
              onClick={() => window.history.back()}
              className={isMobile ? "w-full" : ""}
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

export default NotFound;
