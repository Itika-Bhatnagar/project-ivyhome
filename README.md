# Project IvyHome

## Installation
Follow these steps to set up the project:

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/Itika-Bhatnagar/project-ivyhome.git
   ```

2. **Navigate to the project directory:**  
   ```bash
   cd project-ivyhome
   ```

3. **Install dependencies:**  
   ```bash
   npm install
   ```

## How to Start the Project
To run the script, execute:

```bash
node script.js
```

### The script performs the following tasks:
- Extracts all names from the autocomplete API.
- Handles rate-limiting errors dynamically.
- Logs extracted names and total searches made.

## Project Structure
The project consists of the following files:

### 1. `script.js`
   - Implements the logic for extracting names from the autocomplete API.

### 2. `.gitignore`
   - Ensures unnecessary files (e.g., `node_modules`) are not pushed to GitHub.

### 3. `package.json`
   - Contains metadata about the project and its dependencies.

## Implementation Details
### Logic Overview
#### Queue-Based Exploration:
- The script starts with single-character prefixes (`a, b, ..., z`).
- It uses a queue to explore deeper prefixes returned by the API.

#### Rate-Limiting Handling:
- If the server responds with `429 Too Many Requests`, the script retries using exponential backoff.
- The delay increases exponentially with each retry (e.g., 1s → 2s → 4s).

#### Tracking Searches:
- A counter tracks how many requests were made to extract all names.
- Logs are generated for debugging and monitoring progress.

#### Dynamic Version Support:
- The script supports multiple API versions (`v1, v2, etc.`) by dynamically constructing URLs.

## Functions
### 1. `fetchAllNames(apiUrl, chars, delayTime)`
- Extracts all possible names from the autocomplete API.
- **Parameters:**
  - `apiUrl`: The base URL of the API.
  - `chars`: Initial prefixes (`a, b, ..., z`).
  - `delayTime`: Initial delay between requests.
- **Returns:** An array of unique names extracted from the API.

### 2. `wait(milliseconds)`
- Introduces a delay between requests to handle rate limiting.

## Error Handling
The script gracefully handles errors such as:
- **429 Too Many Requests:** Implements exponential backoff when rate limits are hit.
- **Network Errors:** Logs errors and retries failed requests.

## Example Output
When you run the script, you’ll see output like this:

```bash
Fetching all names from the autocomplete API...
Rate limit exceeded for query "aa". Retrying...
Waiting for 2 seconds before retrying...
Total searches made: 286
Total names extracted: 260
Sample names: ['aa', 'aabdknlvkc', 'aabrkcd', 'aadgdqrwdy', ...]
```

## Dependencies
This project uses the following dependencies:
- **Axios:** For making HTTP requests.  
  ```bash
  npm install axios
  ```

## How to Contribute
If you want to contribute to this project:

1. **Fork the repository.**
2. **Create a new branch:**  
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes and commit them:**  
   ```bash
   git commit -m "Added feature-name"
   ```
4. **Push your changes:**  
   ```bash
   git push origin feature-name
   ```
5. **Create a pull request.**

## Author
**Itika Bhatnagar**  
[GitHub Profile](https://github.com/Itika-Bhatnagar)

## License
This project is licensed under the **MIT License**.

---
**How to Use This README**  
Replace placeholders with actual values where needed and save it as `README.md` in your project folder.

To commit and push it to GitHub:

```bash
git add README.md
git commit -m "Added README file"
git push origin main
```
