export default function LoaderSpinner() {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-base-200 z-50">
        <span
          className="loading loading-spinner text-violet-700"
          style={{
            fontSize: "5rem",
            width: "8rem",
            height: "8rem",
            padding: "2rem",
            borderRadius: "50%",
          }}
        ></span>
      </div>
    </div>
  );
}