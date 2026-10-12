// create your App component here
import { useState, useEffect } from "react";
// API endpoint for fetching random dog images
const API_URL = "https://dog.ceo/api/breeds/image/random";

function App() {
    // State variables for image, loading status, and error message
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // Function to fetch a new random dog image
  function fetchNewImage() {
    // Reset loading and error states before fetching
    setLoading(true);
    setError(null);
    // Fetch the image from the API
    fetch(API_URL)
      .then((response) => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      // Handle the parsed data and update state
      .then((data) => {
        setImage(data.message);
        setLoading(false);
      })
      // Handle any errors that occur during the fetch
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }
    // Use useEffect to fetch a new image when the component mounts
  useEffect(fetchNewImage, []);
  // Render the component UI
  return (
    <div>
      <h1>Random Dog Image</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <img src={image} alt="Random Dog" />}
      <button onClick={fetchNewImage}>Fetch New Image</button>
    </div>
  );
}

export default App;