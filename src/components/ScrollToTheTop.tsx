import { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";

export default function ScrollToTheTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-title dark:bg-title-dark rounded-md text-title-dark dark:text-title  shadow-lg  transition duration-300"
        >
          <ArrowUpCircle size={26} />
        </button>
      )}
    </>
  );
}