import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;