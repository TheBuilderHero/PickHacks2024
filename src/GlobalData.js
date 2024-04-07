import Barchart from "./components/Barchart";
import "./styles.css"
import GlobalTable from "./components/GlobalTable";

function GlobalData(){
    return (
        <div>
            <h1 className="l_title">Analysis Of Global Data Privacy</h1>
            <Barchart/>
            <GlobalTable/>
        </div>

    );

};

export default GlobalData;