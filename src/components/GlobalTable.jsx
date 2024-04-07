import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

function GlobalTable() {
    const columns = [
        {
            name: "User Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "URL",
            selector: row => row.url,
            sortable: true,
        },
        {
            name: "Prediction",
            selector: row => row.prediction,
            sortable: true,
        }
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/getAllUserData/');
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const result = await response.json();
                console.log(result);
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const inputValue = e.target.value.toLowerCase();

        const filteredData = data.filter(row =>
            row.email.toLowerCase().includes(inputValue) ||
            row.url.toLowerCase().includes(inputValue) ||
            row.prediction.toLowerCase().includes(inputValue)
        );
        setData(filteredData);
    };

    return (
        <>
            <div className="input-group">
                <input
                    type="search"
                    className="form-control-sm border ps-3"
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </div>
            <div className="tableContainer">
                {loading ? (
                    <p>Loading..</p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data}
                        fixedHeader
                        title="User Model"
                        pagination
                        selectableRows
                    />
                )}
            </div>
        </>
    );
}

export default GlobalTable;