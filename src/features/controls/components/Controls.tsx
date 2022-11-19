import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import styled from "@emotion/styled";
import { setCameraType } from "../redux/store";

export const Controls = () => {
  const dispatch = useAppDispatch();
  const cameraType = useAppSelector((s) => s.controls.cameraType);
  return (
    <Container>
      <button
        onClick={() => {
          dispatch(setCameraType("player"));
        }}
      >
        player
      </button>
      <button
        onClick={() => {
          dispatch(setCameraType("standby"));
        }}
      >
        standby
      </button>
      <button
        onClick={() => {
          dispatch(setCameraType("map"));
        }}
      >
        map
      </button>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;
