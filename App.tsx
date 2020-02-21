import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Spinner } from "./components/Spinner";
import styled from 'styled-components'
import axios from "axios";
import { CardCmp } from "./CardCmp";

const Draw = styled.div`
  display: flex;
  position: relative;
  /* height: 100%; */
`
const CardTable = styled.section`
  background-color: #17181c;
  box-sizing: border-box;
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  h1, h2 {
    color: white;
    font-family: "Slabo 27px", serif; 
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
  button {
    border: black solid 3px;
    border-radius: 20px;
    background-color: green;
    height: 3rem;
    width: 6rem;
    padding: .5rem;
    margin: .2rem 1rem;
    outline: none;
    color: black;
    transition: .5s;
    cursor: pointer;
    margin: 1rem auto;
    :hover {
      color: white;
      border: white solid 3px;
      box-shadow: inset 0 0 0 2rem black; 
      
    }
  }
`

const App: React.FC = () => {
  const [deck, setDeck] = useState<DeckReqResponse>({ deck_id: '', remaining: 0, shuffled: false, success: false});
  const [draw, setDraw] = useState([] as Card[]);
//   const [deck, setDeck] = useState([] as Card[]);

  const  newCardHandler = () => {
    // if (deck.remaining > 0)
    try {
        axios.get<CardReqResponse>(`https://deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=1`)
        .then( res => {
            if ( !res.data.success) {
                console.log(res.data);
                throw new Error(res.data.error);
            }
            setDeck( prevDeck => ({...prevDeck, remaining: res.data.remaining}));
            setDraw( prevDraw => [...prevDraw, res.data.cards[0]] );
        })
        .catch( err => alert(err))
    }
    catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    axios
      .get<DeckReqResponse>(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      )
      .then(response => setDeck(response.data));
      console.log(deck)
  }, []);


  return (
    <CardTable>
      <h1>card  dealer</h1>
      <h2>boot camp example</h2>
    <button onClick={newCardHandler}>New Card</button>
    {deck ? 
    <Draw>
      {draw.length ? draw.map( c => <CardCmp key={c.code} src={c.images!.png} value={c.value!} type={c.suit!} />): null}
    </Draw>
    : <Spinner color={"purple"} type={"bars"} />}
    </CardTable>
  );
};
render(<App />, document.getElementById("root"));

type DeckReqResponse = {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

type CardReqResponse = {
  deck_id: string;
  remaining: number;
  cards: Card[]
  success: boolean;
  error?: string
};

type Card = {
  value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "JACK" | "QUEEN" | "KING" | "ACE" | undefined;
  suit: "HEARTS" | "CLUBS" | "SPADES" | "DIAMONDS" | undefined;
  images: {
      svg: string,
      png: string
  } | undefined;
  code: string  | undefined;
};


