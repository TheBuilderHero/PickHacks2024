import React, { useState, useEffect } from 'react';

/**
 * React functional component to fetch URL and prediction data using the Fetch API.
 * @returns {JSX.Element} Component markup.
 */
const Table = () => {
    // State variables to store data, loading state, and error message
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch('http://localhost:5001/getUserData/');
                if (!response.ok) {
                    console.log("error");
                    throw new Error('Failed to fetch data');
                }
                // Parse response JSON
                const result = await response.json();
                console.log(response.text)
                // Set fetched data to state
                setData(result);
                console.log(result);
                // Set loading state to false
                setLoading(false);
            } catch (error) {
                console.log(error);
                // Set error message if there's an error
                setError(error.message);
                // Set loading state to false
                setLoading(false);
            }
        };
        // Call fetchData function
        fetchData();
    }, []);

    // Render loading message if loading state is true
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error message if error state is not null
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render data if fetched successfully
    return (
        <div>
            <h1>Data</h1>
            <ul>



                            <p>URL: {data.url}</p>
                            <p>Prediction: {data.predictions}</p>




            </ul>
        </div>
    );
};

export default Table;

