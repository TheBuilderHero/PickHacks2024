import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

function Table() {
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
        }
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/getUserData/");
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const result = await response.json();
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
        const searchValue = e.target.value.toLowerCase();
        const newRows = data.filter((row) =>
            row.email.toLowerCase().includes(searchValue) ||
            row.url.toLowerCase().includes(searchValue)
        );
        setData(newRows);
    };

    return (
        <>
            <h1>print{localStorage.getItem("profileEmail")}</h1>
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

export default Table;
