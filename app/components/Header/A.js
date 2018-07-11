import NormalA from 'components/A';

const A = NormalA.extend`
  padding: 2em 0;
  background-color: #000;
  & > Img {
    height: 80px;
    background-color: #000;
  };
`;

export default A;
