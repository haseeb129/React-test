// utils/subdomain.js
export function getSubdomain() {
  const hostname = window.location.hostname; // e.g., daraz.localhost
  const parts = hostname.split("."); // Split hostname into parts

  if (hostname.includes("localhost") && parts.length < 2) {
    // Local development fallback (hardcoded for testing)
    return "daraz"; // Set default subdomain for local testing
  }

  return parts.length >= 2 ? parts[0] : null; // Return subdomain
}
