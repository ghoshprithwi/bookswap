/* eslint-disable no-empty */
import { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import Button from "@mui/joy/Button";
import Search from "@mui/icons-material/Search";
import Link from "@mui/joy/Link";
import { ROUTES } from "../../constants/routes";
import axios from "axios";

interface Book {
  _id: string;
  bookName: string;
  authorName?: string;
  published?: string;
  condition?: string;
  availability: string;
  genres?: string;
  description?: string;
  owner?: string;
  requestedBy?: string;
}

export default function BorrowingBooks() {
  const [posts, setPosts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const id = localStorage.getItem("user") ?? "";
      try {
        const response = await axios.get(
          `http://localhost:8082/api/books/borrowed?id=${id}`
        );
        if (response.data) {
          setPosts(response.data);
        }
        setLoading(false);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link href={ROUTES.search} underline="none">
        <Button
          size="lg"
          color="warning"
          startDecorator={<Search />}
          sx={{ mb: "1em" }}
        >
          Find Books
        </Button>
      </Link>
      <div className="container">
        {posts.map((book: Book) => (
          <BookCard
            id={book._id}
            bookName={book.bookName}
            authorName={book.authorName}
            condition={book.condition}
            description={book.description}
            dateString={book.availability}
            publishedYear={book.published}
          />
        ))}
      </div>
    </>
  );
}
