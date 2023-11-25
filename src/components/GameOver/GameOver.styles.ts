import styled from 'styled-components';

export const StyledGameOverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #b0cbd9;
  overflow: hidden;
`;

export const Title = styled.h1`
  position: absolute;
  height: 100%;
  font-size: 20vh;
  font-weight: 800;
  letter-spacing: 8px;
  color: rgba(83, 91, 242, 0.49);
  margin: 0;
  text-align: left;
  padding-left: 5px;

  > span {
    display: block;
  }
`;

export const StyledTextContainer = styled.span`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(99, 104, 219);
`;

export const StyledScore = styled.span`
  font-size: 60px;
  font-weight: 800;
`;

export const StyledBestScore = styled.span`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const StyledButton = styled.button`
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 3px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 20px;
  transition: all 0.5s ease;
  pointer-events: all;
  border-radius: 10px;
  margin-bottom: 8px;
  color: rgb(99, 104, 219);
  &:hover {
    box-shadow: 0 0 6px 3px rgb(98 98 98 / 31%);
    color: #b0cbd9;
    background: rgb(99, 104, 219);
  }
`;
