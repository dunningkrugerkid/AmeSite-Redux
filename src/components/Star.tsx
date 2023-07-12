import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query';
import starVisual from '../img/star.gif'
import starError from '../img/star-error.gif'
import starLoaded from '../img/star-loaded.gif'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../styles/main.css';

/*
Represents one star. Grabs from the backend to supply data.
*/

const queryClient = new QueryClient();

export default function Star() {

  return (
    <QueryClientProvider client={queryClient}>
      <GetStar />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
    )
    
}

function GetStar() {
    const { isLoading, error, data: stars, isFetching } = useQuery({
        queryKey : ['stars'],
        queryFn: async () => {
          const resp = await fetch('https://amesite.fly.dev');
          return await resp.json();
        }
            
      });
    
      if (isLoading) return <img src={starVisual} alt="loading..." />
    
      if (error) return <img src={starError} alt="loading..." />

      return (
        <div>
            <div>
                <img src={starLoaded} alt="loading..." />
            </div>

            
            <ul className="text-white/75">
						<li>this is a body named {stars.MAIN_ID}</li>
            <li>its right ascension was measured as {stars.RA}</li>
            <li>its declination is {stars.DEC}</li>
            <li>its right ascension precision code is {stars.RA_PREC}</li>
            <li>its declination precision code is {stars.DEC_PREC}</li>
            <li>it was found using the wavelength {stars.COO_WAVELENGTH}</li>
					</ul>
              
            
            
        </div>
      )
}
