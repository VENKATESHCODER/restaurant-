import { AiOutlineInfoCircle } from "react-icons/ai";
import "../App.css";

const Error = ({ errorMessage }) => {
  return (
    <>
      <span className="error">
        <AiOutlineInfoCircle size={13} />
        <p className="error-text">{errorMessage}</p>
      </span>
    </>
  );
};

export default Error;
