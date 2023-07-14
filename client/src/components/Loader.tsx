import styled from "styled-components";

interface LoderProps {
  isFixed: boolean;
  hasBackground: boolean;
}

const LoaderStyling = styled.div<LoderProps>`
  min-width: 100%;
  height: 100%;
  background: ${(props) => (props.hasBackground ? "#b885e589" : "transparant")};
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    border: 12px solid #f3f3f3;
    border-top: 12px solid #9d41ce;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LoderProps {
  isFixed: boolean;
  hasBackground: boolean;
}

export const Loader = ({ isFixed, hasBackground }: LoderProps) => {
  return (
    <LoaderStyling isFixed={isFixed} hasBackground={hasBackground}>
      <div className="loader"></div>
    </LoaderStyling>
  );
};
