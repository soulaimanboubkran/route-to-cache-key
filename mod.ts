/**
 * Converts a route path to a cache key format, handling query parameters and special characters
 * @param route The route path (e.g. "/user/1234?active=true")
 * @returns Formatted cache key (e.g. "user_1234_active-true")
 */
export function routeToCacheKey(route: string): string {
    // Remove leading slash if present
    let processedRoute = route.startsWith('/') ? route.substring(1) : route;
    
    // Extract and process query parameters
    const [pathPart, queryPart] = processedRoute.split('?');
    
    // Process the path part
    let cacheKey = pathPart.replace(/\//g, '_');
    
    // Process query parameters if they exist
    if (queryPart) {
      // Remove any hash fragment
      const queryWithoutHash = queryPart.split('#')[0];
      
      // Replace special characters in query parameters
      const processedQuery = queryWithoutHash
        .replace(/=/g, '-')      // Replace = with -
        .replace(/&/g, '_')      // Replace & with _
        .replace(/\+/g, 'plus')  // Replace + with "plus"
        .replace(/%/g, 'pct')    // Replace % with "pct"
        .replace(/\//g, '_');    // Replace any remaining / with _
      
      // Append processed query to cache key
      cacheKey = `${cacheKey}_${processedQuery}`;
    }
    
    return cacheKey;
  }
  
  // For testing purposes - not exported
  function _test() {
    const routes = [
      "/user/1234",
      "/user/1234?active=true",
      "/search?q=deno&limit=10",
      "/product/abc-123/details?view=full&highlight=true",
      "/api/v1/user/1234/profile?include=stats&format=json",
      "/blog/2023/01/post?share=twitter&utm_source=newsletter"
    ];
    
    for (const route of routes) {
      console.log(`Route: ${route} → Cache Key: ${routeToCacheKey(route)}`);
    }
  }


  
  // Export the main function as default as well
  export default routeToCacheKey;