import { useParams } from "react-router";

export default function Params() {
  const params = useParams<{
    id: string;
    name: string;
    age: string;
  }>();
  return (
    <>
      <hr />
      <div>params: {JSON.stringify(params)}</div>
      <div>id:{params.id}</div>
      <div>name:{params.name}</div>
      <div>age:{params.age}</div>
    </>
  );
}
