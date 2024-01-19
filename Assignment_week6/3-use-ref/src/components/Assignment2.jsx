import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [count, forceRender] = useState(0);

    const rend = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        forceRender(count +1);
    };

    rend.current = rend.current+1;
    console.log("hello");

    return (
        <div>
            <p>This component has rendered {rend.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};