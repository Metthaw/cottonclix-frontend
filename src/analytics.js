// src/analytics.js
import ReactGA from "react-ga4";

// Initialize GA4 with your Measurement ID
export const initGA = () => {
  ReactGA.initialize("G-61PRX6V98F");

  // Optional: Enable debugging in development
  //   if (process.env.NODE_ENV === 'development') {
  //     window.gtag('set', 'send_page_view', false);
  //     window.gtag('config', 'G-61PRX6V98F', { debug_mode: true });
  //   }
};

// Track page views
export const logPageView = (pagePath) => {
  ReactGA.send({
    hitType: "pageview",
    page: pagePath,
    title: document.title,
  });
};

// Track custom events
export const logEvent = ({ category, action, label, value }) => {
  ReactGA.event({
    category: category || "General",
    action: action,
    label: label,
    value: value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  logEvent({
    category: "Button",
    action: "Click",
    label: buttonName,
  });
};

// Track form submissions
export const trackFormSubmission = (formName, isSuccess = true) => {
  logEvent({
    category: "Form",
    action: "Submit",
    label: formName,
    value: isSuccess ? 1 : 0,
  });
};

// Track outbound links
export const trackOutboundLink = (url) => {
  logEvent({
    category: "Outbound",
    action: "Click",
    label: url,
  });
};

// Track social media interactions
export const trackSocialMedia = (platform, action = "Click") => {
  logEvent({
    category: "Social",
    action: action,
    label: platform,
  });
};

// Track time spent on page
let pageStartTime = new Date();

export const trackTimeOnPage = (pagePath) => {
  const now = new Date();
  const timeSpent = Math.round((now - pageStartTime) / 1000); // in seconds

  if (timeSpent > 0) {
    logEvent({
      category: "Timing",
      action: "Page View Time",
      label: pagePath,
      value: timeSpent,
    });
  }

  // Reset the timer for the next page view
  pageStartTime = now;
};
