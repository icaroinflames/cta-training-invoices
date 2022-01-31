import { useParams, Link } from "react-router-dom";

export const UserPage = () => {
  const { id } = useParams();
  return (
    <div>
      {`User page: ${id}`} <Link to="/users">Back</Link>
    </div>
  );
};
