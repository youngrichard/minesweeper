import { createComponent } from 'cf-style-container';

const Desk = createComponent(({ boardSize }) => ({
  width: 40 * boardSize + 2,
  height: 40 * boardSize + 2,
  border: '1px solid #E0E0E0',
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
}));

export default Desk;
