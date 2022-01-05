// since  we hve used axios we hve useaxios fetch hook 
import axios from 'axios';

import  { useEffect, useState } from 'react'


const useAxiosFetch = (dataUrl) => { // * accepts daraUrl *
     const [data, setData] = useState([]);
     const [fetchError, setFetchError] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
      useEffect(() => {
           let isMounted = true ;
           const source = axios.CancelToken.source(); // in the axios doc to cancel the data(source) of axios if its unmounted 


           const fetchData =  async (url)=>{
            setIsLoading(true);
            try{ //  * try{ doubt}
              const response = await axios.get(url,{
                  cancelToken : source.token
              });
              if(isMounted){
                setData(response.data);
                setFetchError(null);

              }
            }
            catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);// set the data to empty array as we received an err
                  }

            } finally{
                isMounted && setIsLoading(false)
            }

           }
           fetchData(dataUrl); // dataUrl is the link(source ) of our data 
         
         const cleanUp =()=>{
             isMounted=false;
             source.cancel();
         }
           return  cleanUp;
      }, [dataUrl])
    return { data,isLoading,fetchError }
}

export default useAxiosFetch;

