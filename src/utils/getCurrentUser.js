import jwtDecode from "jsonwebtoken";

const getCurrentUser = () => {
  const authToken = localStorage.getItem('user');
  if (!authToken) {
    return null;
  }
  try {
    const decodedToken = jwtDecode.decode(authToken);
    const { userId, username, email, isTrainer, isAdmin, avatar } = decodedToken;

    return { userId, username, email, isTrainer, isAdmin, avatar };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default getCurrentUser;
