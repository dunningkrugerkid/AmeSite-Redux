import {useState} from 'react';
import Star from '../components/Star'
/*
The container for all the stars. 
*/

export default function Space() {
    function randIntInterval(min : number, max : number) {
        return Math.floor(Math.random() * (max-min + 1) + min);
    }

    
    
    // how many stars to populate presently
    const [randNum, setRandNum] = useState(randIntInterval(3,6))

    return ( 
        <div className = "bg-slate-700 bg-opacity-50 bg-rounded-lg border-2 border-slate-500/50">
            <p>
                {Array(randNum).fill(<Star/>)}
            </p>
        </div>
    )
}

