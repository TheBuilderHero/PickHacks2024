import Barchart from "./components/Barchart";
import "./styles.css"
import Table from "./components/Table"
import GlobalTable from "./components/GlobalTable";

const GlobalData = () => {
    return (
        <div>
            <h1 className="l_title">Analysis Of Global Data Privacy</h1>
            <Barchart/>
            <GlobalTable/>
        </div>

    );

};

export default GlobalData;