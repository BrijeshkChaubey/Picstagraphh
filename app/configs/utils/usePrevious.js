
import {useEffect,useRef} from "react";
export function usePrevious(prop){
    const ref = useRef();
    useEffect(() => {
        ref.current = prop;
    }, [prop]);
    return ref.current;
}
