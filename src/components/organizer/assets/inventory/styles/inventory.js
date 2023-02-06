import styled from "styled-components";

export const Heading = styled.div`
  display: flex;
`;
export const Subheading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #39b54a;
  height: 3rem;
  width: 11rem;
  border-radius: 1rem;
  background-color: #39b54a;

  @media (max-width: 1630px) {
    width: 10rem;
    height: 2rem;
    font-size: 14px;
  }
`;
export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 6rem;
  border-radius: 1rem;
  margin-left: -0.5rem;
  background-color: white;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;

  @media (max-width: 1630px) {
    width: 7rem;
    height: 5rem;
  }
  /* padding-top: 1rem; */
`;
export const SubMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  row-gap: 1rem;
  border-bottom: 2px solid #d9d9d9;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  row-gap: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 28rem;
  padding-top: 0.8rem;

  @media (max-width: 1630px) {
    width: 22rem;
    font-size: 16px;
  }
`;

export const Title = styled.div`
  width: 10rem;

  @media (max-width: 1630px) {
    width: 7rem;
    font-size: 16px;
  }
`;

export const Data = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  width: 17rem;
  padding-left: 1.5rem;
  height: 3.5rem;
  align-items: center;
  display: flex;
  border-radius: 1rem;
  padding-top: 0.6rem;
  margin-top: -0.7rem;

  @media (max-width: 1630px) {
    width: 14rem;
    height: 3rem;
  }
`;

export const Text = styled.h3`
  font-size: "22px";

  @media (max-width: 1630px) {
    font-size: 19px;
    padding-right: 0.2rem;
    display: flex;
    text-align: center;
  }
`;

export const Count = styled.div`
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 19.5rem;
  border-radius: 1rem;
  background-color: white;

  @media (max-width: 1630px) {
    width: 16.5rem;
  }
`;

export const Sign = styled.div`
  width: 15%;
  border: 1px solid rgb(57, 181, 74);
  padding: 0.5rem 0 0 -0.5rem;
  background-color: rgb(57, 181, 74);
  color: white;
  border-radius: 1rem;
  margin-left: 0.04rem;
  height: 2.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  row-gap: 1rem;
  border-bottom: 2px solid #d9d9d9;
`;

export const SubCards = styled.div`
  display: "flex";
  justify-content: "space-between";
  width: "100%";
`;

export const CardsHead = styled.div``;

export const PropertyAdd = styled.div`
  display: "flex";
  justify-content: "space-between";
  width: "11rem";
`;

export const AddBtn = styled.div`
  display: flex;
  background-color: #39b54a;
  width: 2rem;
  height: 2rem;
  border-radius: 11px;
  justify-content: center;
  cursor: pointer;
`;

export const Card = styled.div`
  display: "flex";
  flex-direction: "column";
  max-width: 20rem;
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  border-radius: 1rem;
  cursor: pointer;

  :hover {
    border: 2px solid #39b54a;
  }

  @media (max-width: 1630px) {
    height: 28.1rem;
    max-width: 25rem;
  }
  /* height: 25rem; */
  /* row-gap: 3rem; */
`;

export const Desc = styled.div`
  padding: 1rem;
  line-height: 1.5rem;

  @media (max-width: 1630px) {
    line-height: 1rem;
  }
`;

export const Img = styled.img`
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 15rem;

  @media (max-width: 1630px) {
    height: 13rem;
    width: 100%;
  }
`;

export const SubRoom = styled.div`
  display: "flex";
  justify-content: "space-between";
  align-items: "center";
  border-radius: "1rem";
  -webkit-box-shadow: 0 0 7px #c1c1c1;
  box-shadow: 0 0 7px #c1c1c1;
  cursor: pointer;
  :hover {
    border: 2px solid #39b54a;
  }
`;

export const CardsMain = styled.div`
  width: "95%";
  display: "flex";
  justify-content: "space-between";
  column-gap: "3.9rem";
  overflow: "hidden";
  overflow-x: "auto";
  padding-bottom: 20;
  margin-bottom: -20;
  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
`;

export const Action = styled.div`
  display: flex;
  justify-content: "space-between";
  width: 7rem;
  padding: 0 2rem 3.1rem 0;

  @media (max-width: 1630px) {
    padding: 0 2rem 3.1rem 0;
  }
`;

export const Rooms = styled.div`
  display: flex;
  width: 31%;
  flex-direction: column;
  row-gap: 1rem;

  @media (max-width: 1630px) {
    width: 40%;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 3rem;
  height: 4.5rem;

  @media (max-width: 1630px) {
    padding-left: 0.5rem;
  }
`;

export const ItemsData = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 4.5rem;
  padding-top: 1rem;

  @media (max-width: 1630px) {
    column-gap: 0rem;
    padding-left: 0.5rem;
  }
`;
