import { useCallback, useRef, memo } from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  border: solid 1px;
  border-color: #0003;
  border-radius: 30px;
`;

function MovieForm({ addMovie }) {
  const title = useRef();
  const releaseDate = useRef();
  const openingText = useRef();

  const clickHandler = useCallback(function (e) {
    e.preventDefault();
    addMovie({
      title: title.current.value,
      releaseDate: releaseDate.current.value,
      openingText: openingText.current.value,
    });
  });

  return (
    <>
      <form>
        <Label htmlFor="title">Title</Label>
        <br />
        <Input type="text" id="title" name="title" ref={title} />
        <br />
        <Label htmlFor="openingText">Opening Text</Label>
        <br />
        <Input
          type="text"
          id="openingText"
          name="openingText"
          ref={openingText}
        />
        <br />
        <Label htmlFor="releaseDate">Release Date</Label>
        <br />
        <Input
          type="text"
          id="releaseDate"
          name="releaseDate"
          ref={releaseDate}
        />
        <br />
        <button onClick={clickHandler}>Add Movie</button>
      </form>
    </>
  );
}

export default memo(MovieForm);
