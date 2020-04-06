import { useEffect } from "react";

export default function useLazyImageObserver(target) {
  useEffect(() => {
    if (!target.current) {
      return;
    }

    let observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;

          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(lazyImage);
        }
      });
    });

    observer.observe(target.current);

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [target]);
}

// Component
// function App() {
//     const target = useRef(null);

//     useLazyImageObserver(target);

//     return (
//       <section>
//         <div style={{ height: "2000px" }} />
//         <img ref={target} data-src="https://placeimg.com/320/100/any" alt="" />
//       </section>
//     );
//   }
