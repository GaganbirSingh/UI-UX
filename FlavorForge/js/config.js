export const SPOONACULAR_KEY = 'bab2e2376ab24bfe927a85ddf6487dcb'; 
const USE_PROXY = false; 
export const BASE_API = USE_PROXY 
    ? '/.netlify/functions/proxy?path=' 
    : 'https://api.spoonacular.com';

export async function ffFetch(endpoint, params = {}) {
    const cacheKey = `ff_cache_${endpoint}_${JSON.stringify(params)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 3600000) {
            console.log('Serving from cache:', endpoint);
            return data;
        }
    }

    let url;
    if (USE_PROXY) {
        const query = new URLSearchParams(params).toString();
        url = `${BASE_API}${encodeURIComponent(endpoint)}&${query}`;
    } else {
        params.apiKey = SPOONACULAR_KEY;
        const query = new URLSearchParams(params).toString();
        url = `${BASE_API}${endpoint}?${query}`;
    }

    let attempts = 0;
    while (attempts < 2) {
        try {
            const res = await fetch(url);
            
            if (res.status === 402) throw new Error("API Quota Exceeded. Please try again tomorrow.");
            if (!res.ok) throw new Error(`Server Error: ${res.status}`);

            const data = await res.json();
           
            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    data,
                    timestamp: Date.now()
                }));
            } catch (e) {
                console.warn("Storage full, clearing old cache");
                localStorage.clear();
            }

            return data;
        } catch (error) {
            attempts++;
            if (attempts >= 2) throw error;
            await new Promise(r => setTimeout(r, 1000 * attempts)); // Backoff
        }
    }
}