import { jwtDecode } from 'jwt-decode';


 const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null; 
  };

  
export const checkToken = (dispatch) => {
  const token = getUserFromLocalStorage();

  if (!token) {
    dispatch({ type: "LOGOUT" });
    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();
    const timeDifference = expirationDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    dispatch({ type: "LOGOUT" });
  }
};
