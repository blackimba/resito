import React from "react";
import { Outlet } from "react-router-dom";

const ReceiptsLayout: React.FC = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default ReceiptsLayout;