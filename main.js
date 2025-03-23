const axios = require('axios');

// Function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to handle retries with exponential backoff
async function retryWithBackoff(query, baseUrl, baseDelayMs, retryCounts) {
    let retryCount = retryCounts[query] || 0;
    let waitTime;

    try {
        const response = await axios.get(`${baseUrl}?query=${query}`);
        if (response.status === 200 && response.data.results) {
            retryCounts[query] = 0; // Reset retry count on success
            return response.data.results;
        } else {
            console.error(`Error: Received status ${response.status} for query "${query}"`);
            throw new Error(`Failed to fetch results for query "${query}"`);
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn(`Rate limit hit for query "${query}". Retrying...`);

            // Handle Retry-After header if available
            const retryAfter = error.response.headers['retry-after'];
            if (retryAfter) {
                waitTime = parseInt(retryAfter, 10) * 1000; // Use Retry-After header value
            } else {
                waitTime = baseDelayMs * Math.pow(2, retryCount); // Exponential backoff
            }

            console.log(`Waiting for ${waitTime / 1000} seconds before retrying...`);
            await delay(waitTime);

            retryCounts[query] = retryCount + 1; // Increment retry count
            return retryWithBackoff(query, baseUrl, baseDelayMs, retryCounts); // Retry
        } else {
            console.error(`Error with query "${query}":`, error.message);
            throw error; // Re-throw to handle in the caller
        }
    }
}

async function extractAllNames(baseUrl, alphabet, baseDelayMs) {
    const extractedNames = new Set();
    const queue = [...alphabet];
    let searchCount = 0;
    const retryCounts = {};

    while (queue.length > 0) {
        const query = queue.shift();
        searchCount++;

        try {
            const results = await retryWithBackoff(query, baseUrl, baseDelayMs, retryCounts);

            for (const name of results) {
                if (!extractedNames.has(name)) {
                    extractedNames.add(name);
                    queue.push(name); // Add as a new prefix for further exploration
                }
            }
        } catch (error) {
            console.error(`Failed to process query "${query}":`, error.message);
        }

        await delay(baseDelayMs); // Delay between requests
    }

    console.log(`Total requests sent: ${searchCount}`);
    console.log(`Total names collected: ${extractedNames.size}`);
    return Array.from(extractedNames);
}

// Main function to execute the extraction process
(async () => {
    const baseUrl = "http://35.200.185.69:8000/v1/autocomplete";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const baseDelayMs = 500;

    console.log("Starting name extraction from autocomplete API...");
    const allNames = await extractAllNames(baseUrl, alphabet, baseDelayMs);

    console.log("Sample names:", allNames.slice(0, 10));
})();
