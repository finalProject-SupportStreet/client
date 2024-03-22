const GroupPostCard = ({ post }) => {
  const formattedDate = new Date(post.postTime).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Überprüfe, ob likes und comments definiert sind und setze sie auf ein leeres Array, falls nicht
  const likes = post.likes || [];
  const comments = Array.isArray(post.comments) ? post.comments : [];

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col items-center p-4 mb-4">
      {/* Code für Nutzerbild und Datum, Thema */}
      {post.image && (
        <img
          src={post.image}
          alt="Post Bild"
          className="w-full h-auto rounded-lg mb-4"
        />
      )}
      <div className="font-semibold mb-2">{post.title}</div>
      <p className="mb-4">{post.text}</p>
      <div className="flex items-center justify-between">
        <button type="button" className="flex items-center">
          <span className="mr-2">👍</span>
          <span>{likes.length}</span>
        </button>
        <button type="button">Kommentare ({comments.length})</button>
      </div>
      {/* Kommentare anzeigen */}
      <div className="mt-4">
        {comments.slice(0, 2).map((comment, index) => (
          <div key={index} className="text-sm mb-2">
            {comment.text} -{" "}
            <span className="text-gray-500">{comment.commenter}</span>
          </div>
        ))}
        {comments.length > 2 && (
          <button type="button" className="text-blue-500">
            Mehr anzeigen
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupPostCard;
