import { Category } from "./sections/category";
import { Hero } from "./sections/hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero/>
        <Category/>
    </div>
  );
}
