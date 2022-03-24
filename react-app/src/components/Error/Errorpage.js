import React, { useEffect, useState } from "react";
import './error.css'

function Error404() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return null;
    }
    return (
        <div className="error-container">
            <div className="error-h1">
                <h1>Sorry, you went somewhere you werent supposed to.</h1>
            </div>

        </div>
    )


}

export default Error404