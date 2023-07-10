import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query';
import starVisual from '../img/star.gif'
import starError from '../img/star-error.gif'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  
import axios from 'axios';
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
        queryFn: () => 
            axios.get('https://amesite.fly.dev')
            .then((res) => {
              return res.data;
            })
      });
    
      if (isLoading) return <img src={starVisual} alt="loading..." />
    
      if (error) return <img src={starError} alt="loading..." />

      return (
        <div>
            <div>
                {isFetching ? 'Updating...' : ''}
            </div>
            {stars}
        </div>
      )
}
