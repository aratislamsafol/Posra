type ApiEndPoints = { [key: string]: string };
type LoaderResult<T extends ApiEndPoints> = { [K in keyof T]: any };

export const Loader = <T extends ApiEndPoints>(apiEndpoints: T) => {
  return async (): Promise<LoaderResult<T>> => {

    const entries = Object.entries(apiEndpoints);
    const result: Partial<LoaderResult<T>> = {};
    
    // Perform all fetches in parallel
    const fetchPromises = entries.map(async ([key, url]) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${key} from ${url} (status ${response.status})`);
        }
        const data = await response.json();
        return { key, data };
      } catch (error) {
        return { key, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    // Wait for all fetches to complete
    const responses = await Promise.all(fetchPromises);

    // Populate result with data or errors
    responses.forEach(({ key, data, error }) => {
      if (error) {
        console.error(`Error loading ${key}: ${error}`);
        result[key as keyof T] = { error }; 
      } else {
        result[key as keyof T] = data;
      }
    });
    return result as LoaderResult<T>;
  };
};