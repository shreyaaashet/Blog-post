import  { useEffect, useState } from 'react';
// this is our custom hook

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        height:undefined,
        width:undefined
    });
     useEffect(() => {
       const handleResize=()=>{
           setWindowSize({
               width:window.innerWidth,
               height:window.innerHeight
           })
       }
       handleResize() // till this we will get the intial vaues which will change everytime we refresh. to get the values as we change the size we do:
        window.addEventListener("resize",handleResize );

        // clean up function we use return to remove event listener
        return ()=>{
            window.removeEventListener("resize",handleResize);
        }
        
     }, [])

    return windowSize;
}

export default useWindowSize
