import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";

import {
  PokemonCardWrapper,
  PokemonCard,
  PokemonCardTitle,
  PreviousAndNextButtonsWrapper,
  PreviousAndNextButtons,
} from "./Card.Styled";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Card() {
  const [siteId, setSiteId] = useState(0);
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${siteId}`, fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>failed to load</h1>;
  }
  //console.log(data.results);

  return (
    <>
      <PokemonCardWrapper>
        {data.results.map(({ name, url }) => (
          <PokemonCard key={name}>
            <Image
              // front default
              // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              //   url.split("/")[url.split("/").length - 2]
              // }.png`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                url.split("/")[url.split("/").length - 2]
              }.svg`}
              width={200}
              height={200}
              alt={name}
            />
            <PokemonCardTitle>{name}</PokemonCardTitle>
          </PokemonCard>
        ))}
      </PokemonCardWrapper>
      <PreviousAndNextButtonsWrapper>
        <PreviousAndNextButtons
          type="button"
          disabled={siteId === 0}
          onClick={() => {
            setSiteId((siteId) => siteId - 6);
            console.log("prev button");
          }}>
          Previous Button
        </PreviousAndNextButtons>
        <PreviousAndNextButtons
          type="button"
          onClick={() => {
            setSiteId((siteId) => siteId + 6);
            console.log("next button");
          }}>
          Next Button
        </PreviousAndNextButtons>
      </PreviousAndNextButtonsWrapper>
    </>
  );
}
