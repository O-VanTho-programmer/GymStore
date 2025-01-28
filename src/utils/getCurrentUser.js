import jwtDecode from "jsonwebtoken";

const getCurrentUser = () => {
  const authToken = localStorage.getItem('user');
  if (!authToken) {
    return null;
  }
  try {
    const decodedToken = jwtDecode.decode(authToken);
    const { userId, email, isTrainer, isAdmin } = decodedToken;

    return { userId, email, isTrainer, isAdmin };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default getCurrentUser;
