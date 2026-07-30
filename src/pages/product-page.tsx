import { useParams, Link } from "react-router";

function ProductPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold text-text-primary">
        No Content Here :)
      </p>
      <p className="text-sm text-text-primary">Product ID: {id}</p>
      <Link
        to="/bundle-builder"
        className="text-primary underline text-sm underline-offset-2"
      >
        Back to Bundle Builder
      </Link>
    </div>
  );
}

export default ProductPage;
