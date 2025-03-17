import essentialForGamers from '../assets/Essential-For-Gamers.png'
import Headsets from '../assets/Headsets.jpg'
import Keyboards from '../assets/Keyboards.jpg'
import Laptops from '../assets/Laptops.png'
import Mouses from '../assets/Mouses.jpg'
import Nintendo from '../assets/Nintendo.png'
import XBox from '../assets/XBox.png'
import CategoryCard from '../components/CategoryCard'
import { useState, useEffect } from 'react'
import LoaderSpinner from '../components/LoaderSpinner'

export default function Categories() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  const categories = [
    { image: Headsets, name: "Headsets" },
    { image: Keyboards, name: "Keyboards" },
    { image: Laptops, name: "Laptops" },
    { image: Mouses, name: "Mouses" },
    { image: Nintendo, name: "Nintendo" },
    { image: XBox, name: "Xbox" }
  ];

  return (
    <div>
      <img 
        src={essentialForGamers} 
        className="mx-auto my-8 max-w-full" 
        alt="Essential For Gamers Picture" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {categories.map((category) => (
          <CategoryCard 
            key={category.name}
            image={category.image} 
            name={category.name}
          />
        ))}
      </div>
    </div>
  );
}
