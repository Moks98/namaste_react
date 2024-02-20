import { useRouteError } from "react-router-dom"; // error hook returns error information

const Error = () => {
  const errObject = useRouteError(); // configuration
  console.log(errObject);
  return (
    <div>
      <h1>Oops!!!</h1>
      <h2>Something went wrong....</h2>
      <h3>
        {errObject.status} : {errObject.statusText}
      </h3>
    </div>
  );
};
export default Error;
