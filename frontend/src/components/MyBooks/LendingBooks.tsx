import { useState, useEffect, useRef } from "react";
import BookCard from "../BookCard/BookCard";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Grid from "@mui/joy/Grid";
import FormHelperText from "@mui/joy/FormHelperText";
import Autocomplete from "@mui/joy/Autocomplete";
import { GENRES } from "../../constants/options";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Textarea from "@mui/joy/Textarea";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Snackbar from "@mui/joy/Snackbar";
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
  ownerid?: string;
  requestedBy?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  bookName: HTMLInputElement;
  authorName: HTMLInputElement;
  published: HTMLInputElement;
  condition: HTMLInputElement;
  startDate: HTMLInputElement;
  endDate: HTMLInputElement;
  genres: HTMLInputElement;
  description: HTMLInputElement;
}

interface BookListingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LendingBooks() {
  const [posts, setPosts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [condition, setCondition] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showRequestToast, setShowRequestToast] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const id = localStorage.getItem("user") ?? "";
      try {
        const response = await axios.get(
          `http://localhost:8082/api/books/owned?id=${id}`
        );
        if (response.data) {
          setPosts(response.data);
          setLoading(false);
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  const createBookListing = async (
    event: React.FormEvent<BookListingFormElement>
  ) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const _id = localStorage.getItem("user");
    // Form Data.
    const data = {
      bookName: formElements.bookName.value ?? "",
      authorName: formElements.authorName.value ?? "",
      published: formElements.published.value ?? "",
      condition,
      availability: `${formElements.startDate.value ?? ""} to ${
        formElements.endDate.value ?? ""
      }`,
      genres,
      description: formElements.description.value ?? "",
      ownerid: _id,
    };
    const response = await axios.post("http://localhost:8082/api/books", {
      ...data,
    });

    if (response.data) {
      setShowRequestToast(true);
      setOpen(false);
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Button
        size="lg"
        color="success"
        startDecorator={<Add />}
        sx={{ mb: "1em" }}
        onClick={() => setOpen(true)}
      >
        Add Book
      </Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              owner={book.ownerid}
            />
          ))}
        </div>
      )}
      <Modal
        aria-labelledby="add-new-book"
        aria-describedby="add-new-book"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog maxWidth={600}>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogContent>
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={createBookListing}>
                <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                  <Grid xs={16}>
                    <FormControl required>
                      <FormLabel>Book Name</FormLabel>
                      <Input size="lg" type="text" name="bookName" required />
                    </FormControl>
                  </Grid>
                  <Grid xs={16}>
                    <FormControl required>
                      <FormLabel>Author Name</FormLabel>
                      <Input size="lg" type="text" name="authorName" required />
                    </FormControl>
                  </Grid>
                  <Grid xs={8}>
                    <FormControl required>
                      <FormLabel>Published Year</FormLabel>
                      <Input
                        size="lg"
                        type="number"
                        name="published"
                        required
                        slotProps={{
                          input: {
                            ref: inputRef,
                            min: 1900,
                            max: 2024,
                            step: 1,
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={8}>
                    <FormControl required>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        size="lg"
                        defaultValue=""
                        name="condition"
                        placeholder="Select Condition"
                        onChange={(_e, value) => {
                          setCondition(value ?? "");
                        }}
                      >
                        <Option value="new">New</Option>
                        <Option value="fair">Fair</Option>
                        <Option value="old">Old</Option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={16}>
                    <FormControl>
                      <FormLabel>Genres</FormLabel>
                      <Autocomplete
                        multiple
                        placeholder="Select Book Genre..."
                        limitTags={2}
                        options={GENRES}
                        value={genres}
                        onChange={(_e, newValue) => {
                          setGenres(newValue);
                        }}
                        size="lg"
                      />
                      <FormHelperText>
                        Select the genres of the book
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid xs={8}>
                    <FormControl required>
                      <FormLabel>Available From</FormLabel>
                      <Input size="lg" type="date" name="startDate" required />
                    </FormControl>
                  </Grid>
                  <Grid xs={8}>
                    <FormControl required>
                      <FormLabel>Up To</FormLabel>
                      <Input size="lg" type="date" name="endDate" required />
                    </FormControl>
                  </Grid>
                  <Grid xs={16}>
                    <FormControl required>
                      <FormLabel>Description</FormLabel>
                      <Textarea minRows={3} size="lg" name="description" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" size="lg" fullWidth color="success">
                    Add Book
                  </Button>
                </Stack>
              </form>
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showRequestToast}
        variant="outlined"
        color="success"
        onClose={() => {
          setShowRequestToast(false);
        }}
      >
        Request Sent.
      </Snackbar>
    </CssVarsProvider>
  );
}
