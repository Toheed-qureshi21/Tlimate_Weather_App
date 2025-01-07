import { createContext, useState } from "react";

export const OurContext = createContext();
export const OurContextProvider = ({children}) => {
    const [theme,setTheme] = useState(true);
    return(
        <OurContext.Provider value={{theme,setTheme}}>
        {children}
     </OurContext.Provider>
    );
}

