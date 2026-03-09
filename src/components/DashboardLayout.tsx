import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <ParticleBackground />
        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <header className="h-14 flex items-center border-b border-border/30 backdrop-blur-sm bg-background/50 px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
            <div className="ml-4 text-xs font-mono text-muted-foreground tracking-wider uppercase">
              WGAN-GP Research Dashboard
            </div>
          </header>
          <main className="flex-1 overflow-auto scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
