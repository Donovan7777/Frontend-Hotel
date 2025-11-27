// src/components/menu/withNavigation.js
// --------------------------------------------------------
// Petit HOC pour injecter navigate (hook) dans un composant classe.
// --------------------------------------------------------
import { useNavigate } from "react-router-dom";

const withNavigation = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
  return Wrapper;
};

export default withNavigation;
