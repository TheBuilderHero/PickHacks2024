import Barchart from "./components/Barchart";
import "./styles.css"
import Table from "./components/Table"

const DataPage = () => {
    return (
        <div>
            <h1 className="l_title">Analysis Of User Data Privacy</h1>
            <Barchart/>
            <Table/>
        </div>
    );

};

export default DataPage;
