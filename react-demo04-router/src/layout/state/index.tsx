import { type Location, useLocation } from "react-router";

export default function State() {
  const location: Location<{ id: number; name: string; age: number }> =
    useLocation();
  return (
    <>
      <div>id: {location.state.id}</div>
      <div>age: {location.state.age}</div>
      <div>name: {location.state.name}</div>
    </>
  );
}
