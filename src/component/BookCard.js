import ActionAreaCard from "../material/ActionAreaCard";

function BookCard({ Book }) {
  return (
    <ActionAreaCard
      Url={`https://openlibrary.org/${Book.key}`}
      ImageAltText={`${Book.title} by ${Book.author_name}`}
      Title={Book.title}
      Subtitle={Book.author_name}
      ImageUrl={`https://covers.openlibrary.org/b/id/${Book.cover_i}-M.jpg`}
    />
  );
}

export default BookCard;
