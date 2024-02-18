import styled from "styled-components";

export const PokemonCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  @media only screen and (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PokemonCard = styled.article`
  text-align: center;
  padding: 2em 0.5em;
  border-radius: 12px;
`;

export const PokemonCardTitle = styled.h2`
  text-transform: capitalize;
`;

export const PreviousAndNextButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
  margin: 2em;
`;

export const PreviousAndNextButtons = styled.button`
  flex-grow: 1;
  padding: 2em 1.5em;
`;
