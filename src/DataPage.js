import React from "react";
import Barchart from "./components/Barchart";
import Table from "./components/Table";

function DataPage() {

    return (
        <div>
            <h1 className="l_title">Analysis Of User Data Privacy</h1>
            <Barchart />
            <Table />
        </div>
    );
}

export default DataPage;
