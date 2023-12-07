import React from "react";
import { get, wait_get } from './api/client';

const App: React.FC = () => {
    let res: Object = wait_get({pi:3.1415});
    return (
        <>
            <h1>Hello bro!</h1>
            <p>{JSON.stringify(res)}</p>
        </>
    );
};

export default App;