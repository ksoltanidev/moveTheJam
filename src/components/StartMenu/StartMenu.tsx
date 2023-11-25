interface StartMenuProps {
  handleStart: () => void;
}

const StartMenu = ({ handleStart }: StartMenuProps) => {
  return (
    <div>
      <h1>Move The Jam</h1>
      <ul>
        <li>
          <button onClick={handleStart}>Start</button>
        </li>
        <li>Crédits</li>
      </ul>
      <span>
        Review the code on <a href="https://github.com/ksoltanidev/moveTheJam">GitHub</a>
      </span>
    </div>
  );
};

export default StartMenu;
