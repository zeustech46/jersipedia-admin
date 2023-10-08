import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "action/AuthAction";

function NavigationWrapper() {
  const navigate = useNavigate();

  return <AuthAction navigate={navigate} />;
}

export default NavigationWrapper;
