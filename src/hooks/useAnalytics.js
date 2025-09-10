import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView, trackTimeOnPage } from '../analytics';

const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    // Track the initial page view
    logPageView(location.pathname + location.search);
    
    // Track time spent on page when component unmounts
    return () => {
      trackTimeOnPage(location.pathname);
    };
  }, [location]);

  // Helper functions for tracking different types of events
  const trackButtonClick = (buttonName) => {
    import('../analytics').then(({ trackButtonClick }) => {
      trackButtonClick(buttonName);
    });
  };

  const trackFormSubmission = (formName, isSuccess = true) => {
    import('../analytics').then(({ trackFormSubmission }) => {
      trackFormSubmission(formName, isSuccess);
    });
  };

  const trackOutboundLink = (url) => {
    import('../analytics').then(({ trackOutboundLink }) => {
      trackOutboundLink(url);
    });
  };

  const trackSocialMedia = (platform, action = 'Click') => {
    import('../analytics').then(({ trackSocialMedia }) => {
      trackSocialMedia(platform, action);
    });
  };

  return {
    trackButtonClick,
    trackFormSubmission,
    trackOutboundLink,
    trackSocialMedia,
  };
};

export default useAnalytics;
