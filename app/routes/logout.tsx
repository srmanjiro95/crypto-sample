import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}
