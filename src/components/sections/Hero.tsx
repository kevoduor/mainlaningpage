
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { Calendar } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-br from-nia-100 via-white to-white -z-10"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 inset-0 bg-grid-nia-100/40 bg-[length:20px_20px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-balance">
            3X More Patients, 50% Less Admin Work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-balance max-w-3xl mx-auto">
            Nia helps dental clinics attract more patients, reduce no-shows, and automate operations —all in one cloud-based dental clinic management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <CTAButton 
              size="lg" 
              className="flex items-center w-full sm:w-auto" 
              isBookDemo={true}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free Demo
            </CTAButton>
            <CTAButton size="lg" variant="outline" className="w-full sm:w-auto">
              View Features
            </CTAButton>
          </div>
        </div>
        
        {/* Main Hero image */}
        <div className="relative mx-auto max-w-5xl animate-fade-in delay-300 mb-12">
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-nia-300/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-nia-600/20 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Nia dental management dashboard" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 right-8 bg-white rounded-lg px-4 py-3 shadow-lg border border-nia-100 animate-float">
            <div className="flex items-center">
              <div className="flex items-center space-x-1 text-green-500 mr-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold">Live</span>
              </div>
              <span className="text-sm font-medium">250+ Clinics Using Nia</span>
            </div>
          </div>
        </div>
        
        {/* Feature Images Carousel */}
        <div className="mb-16 animate-fade-in delay-400">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">Designed for Modern Dental Practices</h3>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {[
                {
                  src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                  alt: "Dental clinic reception"
                },
                {
                  src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
                  alt: "Patient management interface"
                },
                {
                  src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                  alt: "Dental appointment scheduling"
                },
                {
                  src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                  alt: "Modern dental practice"
                }
              ].map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <AspectRatio ratio={16/9} className="bg-muted rounded-xl overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all hover:scale-105 duration-500"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 lg:-left-8" />
            <CarouselNext className="right-1 lg:-right-8" />
          </Carousel>
        </div>
        
        {/* Testimonial Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto animate-fade-in delay-500">
          <div className="col-span-1 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1607935022113-3141bec7db0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Dental patient experience" 
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
            <div className="bg-nia-100 rounded-xl p-4 shadow-sm">
              <p className="text-nia-600 font-medium">
                "Nia has revolutionized how we manage our dental practice. The time we save on administrative tasks can now be invested in patient care."
              </p>
              <p className="text-nia-900 text-sm mt-2">- Dr. Sarah Johnson, DDS</p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 rounded-xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80" 
              alt="Dental team working with Nia software" 
              className="w-full h-full object-cover aspect-[16/9]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
