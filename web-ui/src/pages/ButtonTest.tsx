import Button, { ButtonType } from '../components/Button';
import { Link } from "react-router-dom"

const App: React.FC = () => {
  return (
    <>
      <div className="text-center my-5 text-3xl">
        React/Tailwind proof of concept
      </div>
      <div className="flex justify-center gap-5">
        <Link to={"/"}>
          <Button text="Fuck off" type={ButtonType.DANGER} />
        </Link>
        <Button text="Not cool" type={ButtonType.SECONDARY} />
        <Button text="Cool" type={ButtonType.PRIMARY} />
      </div>
    </>
  );
};

export default App;

/**
 * yarn create react-app eflush-webui --template typescript

   yarn add -D tailwindcss postcss autoprefixer

   yarn tailwindcss init -p
 */
