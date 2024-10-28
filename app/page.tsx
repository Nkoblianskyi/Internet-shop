import { Category } from "./sections/category";
import { Hero } from "./sections/hero";
import { PopularItem } from "./sections/popular-item";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero/>
        <Category/>
        <PopularItem/>
    </div>
  );
}
