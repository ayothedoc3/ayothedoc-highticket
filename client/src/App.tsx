import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initAnalytics, initAttribution, trackPageView } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Checklist from "./pages/Checklist";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Automation from "./pages/Automation";
import AutomationPlaybook from "./pages/AutomationPlaybook";
import Offer from "./pages/Offer";
import Playbook from "./pages/Playbook";

function AnalyticsListener() {
  const [location] = useLocation();

  useEffect(() => {
    initAttribution();
    initAnalytics();
  }, []);

  useEffect(() => {
    initAttribution();
    trackPageView(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/checklist"} component={Checklist} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/automation"} component={Automation} />
      <Route path={"/automation/:slug"} component={AutomationPlaybook} />
      <Route path={"/playbook"} component={Playbook} />
      <Route path={"/offer"} component={Offer} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AnalyticsListener />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
