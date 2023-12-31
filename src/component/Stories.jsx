import React, { useState,useEffect } from 'react'
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

const data = [
    { img: "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg", name: "SK"},
    { img: "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg", name: "Singh"},
    { img: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg", name: "Rajesh"},
    { img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", name: "Mukesh"},
    { img: "https://t4.ftcdn.net/jpg/02/97/24/51/360_F_297245133_gBPfK0h10UM3y7vfoEiBC3ZXt559KZar.jpg", name: "Saurabh"},
    { img: "https://t4.ftcdn.net/jpg/02/89/85/43/360_F_289854398_06abMzUB1MiZJDElVkYJ8nvqImAk9YSz.jpg", name: "Uvesh"},
    { img: "https://t3.ftcdn.net/jpg/06/14/48/58/360_F_614485835_4Tx9EOMuurQQBpNJK8aPgDGtXQ22RNRx.jpg", name: "Karan"},
    { img: "https://t4.ftcdn.net/jpg/02/97/24/51/360_F_297245133_gBPfK0h10UM3y7vfoEiBC3ZXt559KZar.jpg", name: "Saurabh"},
    { img: "https://t4.ftcdn.net/jpg/02/89/85/43/360_F_289854398_06abMzUB1MiZJDElVkYJ8nvqImAk9YSz.jpg", name: "Uvesh"},
    { img: "https://t3.ftcdn.net/jpg/06/14/48/58/360_F_614485835_4Tx9EOMuurQQBpNJK8aPgDGtXQ22RNRx.jpg", name: "Karan"},
    { img: "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg", name: "Royal"},
    { img: "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg", name: "Singh"},
    { img: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg", name: "Rajesh"},
    { img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", name: "Mukesh"},
    { img: "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg", name: "Royal"},
    { img: "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg", name: "Singh"},
    { img: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg", name: "Rajesh"},
    { img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", name: "Mukesh"},
    { img: "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg", name: "Royal"},
    { img: "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg", name: "Singh"},
    { img: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg", name: "Rajesh"},
    { img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", name: "Mukesh"},
]

const Stories = () => {
  const [story, setStory] = useState(1);
  const [num, setNum] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setNum(5); 
      } else {
        setNum(8); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className='w-[580px] overflow-x-scroll overflow-h-thin' >
      <div className="text-center flex">
      {(story > 1) && <button onClick={() => setStory(story-1)}> <IoIosArrowBack /> </button>}
        {data.slice(story * num - num, story * num).map((i) => (
          <div className="flex flex-col" key={i.name}>
            <img
              src={i.img}
              alt="x"
              className="w-14 h-14 m-2 border-from-neutral-700 border-4 rounded-full"
            />
            <p> {i.name} </p>
          </div>
        ))}
        {data.length > story * num && <button onClick={() => setStory(story+1)}> <IoIosArrowForward /> </button>}
      </div>
    </div>
  );
};
  
export default Stories;
