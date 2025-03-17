import { useNavigate } from "react-router-dom";

export default function CategoryCard(props: {
  image: string | undefined;
  name: string;
}) {
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    navigate(`/categories/${props.name.toLowerCase()}`);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={props.image} alt={props.name} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.name}</h2>
        <div className="card-actions">
          <button
            className="btn btn-wide bg-violet-700"
            onClick={handleBrowseClick}
          >
            Browse Now
          </button>
        </div>
      </div>
    </div>
  );
}
