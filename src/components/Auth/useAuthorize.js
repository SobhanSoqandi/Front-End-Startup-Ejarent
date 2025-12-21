import useUser from "../../features/User/useUser";

export default function useAuthorize(){

    const { isLoading , user } = useUser();

    let isAuthenticated = false;
    if (user) isAuthenticated = true;

    
    

    // console.log(isAuthenticated);
    

  return { isLoading, user , isAuthenticated };
    

    
    
}