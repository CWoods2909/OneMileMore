import React, { useEffect, useState } from "react";

function Error404() {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        setLoaded(true)
    }, [])
    
    if (!loaded) {
        return null;
    }
    return(
        <h1>Were sorry, you went somewhere you werent supposed to.</h1>
    )


}

export default Error404