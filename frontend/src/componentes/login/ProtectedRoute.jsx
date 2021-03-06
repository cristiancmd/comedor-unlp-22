import React , {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext";
 
function ProtectedRoute({ component: Component, ...rest }) {
    
    
    const { user, loginUser } = useContext(UserContext); 

    return (
    <Route
      {...rest}
      render={(props) => {
        if(user && !user.user.is_staff && rest.staff){
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        else if (user) {
          return <Component />;
        } 
        else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
