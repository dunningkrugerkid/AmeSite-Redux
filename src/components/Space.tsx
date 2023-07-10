
import Star from '../components/Star'
/*
The container for all the stars. 
*/

export default function Space() {

    return ( 
        <div className = "bg-slate-700 bg-opacity-50 bg-rounded-lg border-2 border-slate-500/50">
            <p>
                {<Star/>}
            </p>
        </div>
    )
}

