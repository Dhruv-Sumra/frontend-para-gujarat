import React, { useEffect, useState, Suspense, lazy } from 'react';
const Lightbox = lazy(() => import('yet-another-react-lightbox'));
import 'yet-another-react-lightbox/styles.css';

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [imageLinks, setImageLinks] = useState(`https://i.postimg.cc/SQLFnwC9/front.jpg
https://i.postimg.cc/TYR8gCJ4/front2.jpg
https://i.postimg.cc/y8dwrx5h/front3.webp
https://i.postimg.cc/L6vcTLy6/image005.jpg
https://i.postimg.cc/t4ML0yQK/image007.jpg
https://i.postimg.cc/rpR7MbqK/image009.jpg
https://i.postimg.cc/63sg30Qz/image011.jpg
https://i.postimg.cc/264JBZbY/image013.jpg
https://i.postimg.cc/d3wfRVry/image015.jpg
https://i.postimg.cc/66fgWCxL/image017.jpg
https://i.postimg.cc/90bnLHYN/image017-1.jpg
https://i.postimg.cc/KvcVR4ZX/image019.jpg
https://i.postimg.cc/Pr67ZhxC/image021.jpg
https://i.postimg.cc/Nj5zkV9p/image023.jpg
https://i.postimg.cc/8z9nKHLD/image025.jpg
https://i.postimg.cc/ZqNs1dLN/image027.jpg
https://i.postimg.cc/j5r3KS8F/image029.jpg
https://i.postimg.cc/vBLqmwkH/image031.jpg
https://i.postimg.cc/4yf87FRv/image033.jpg
https://i.postimg.cc/c1hkyZfF/image035.jpg
https://i.postimg.cc/tJBBht9K/image037.jpg
https://i.postimg.cc/rFpnqbJM/image039.jpg
https://i.postimg.cc/28XHywcv/image041.jpg
https://i.postimg.cc/mgzmHHJn/image043.jpg
https://i.postimg.cc/JzfPchWz/image045.jpg
https://i.postimg.cc/Bv2NhGqc/image047.jpg
https://i.postimg.cc/LXRDw05d/image049.jpg
https://i.postimg.cc/nzk2JY9X/image051.jpg
https://i.postimg.cc/prLZXhKq/image053.jpg
https://i.postimg.cc/PfSyVykc/image055.jpg
https://i.postimg.cc/8PsH2vpC/image057.jpg
https://i.postimg.cc/RV8R40hL/image059.jpg
https://i.postimg.cc/8z6b5VrQ/image061.jpg
https://i.postimg.cc/QMgkQkbf/image063.jpg
https://i.postimg.cc/VNPW0HjS/image065.jpg
https://i.postimg.cc/sXwY8jbS/image067.jpg
https://i.postimg.cc/TwRjCLNf/image069.jpg
https://i.postimg.cc/qqqsdfdF/image071.jpg
https://i.postimg.cc/8cYhpypz/image073.jpg
https://i.postimg.cc/nVSKGL4f/image075.jpg
https://i.postimg.cc/yYJmQzjg/image077.jpg
https://i.postimg.cc/3JPgzbfL/image079.jpg
https://i.postimg.cc/52LwJqZf/image081.jpg
https://i.postimg.cc/mr47g1sC/image083.jpg
https://i.postimg.cc/QMq19N8P/image085.jpg
https://i.postimg.cc/Y9qg1cjS/image089.jpg
https://i.postimg.cc/XJH5L2yk/image091.jpg
https://i.postimg.cc/qqN358sV/image093.jpg
https://i.postimg.cc/sxbhdvmB/image095.jpg
https://i.postimg.cc/m2F93yZ7/image097.jpg
https://i.postimg.cc/jq1NJFTs/image099.jpg
https://i.postimg.cc/VkQCK05p/image101.jpg
https://i.postimg.cc/3xXDVrvR/image103.jpg
https://i.postimg.cc/JhRBLwNQ/image105.jpg
https://i.postimg.cc/QMSKN6SZ/image107.jpg
https://i.postimg.cc/PxxpCmFp/image109.jpg
https://i.postimg.cc/nzPsBC6d/image113.jpg
https://i.postimg.cc/qq6NLprp/image117.jpg
https://i.postimg.cc/vDRc2C8f/image125.jpg
https://i.postimg.cc/2j1GJv8S/image129.jpg
https://i.postimg.cc/fW1ChLJj/image133.jpg
https://i.postimg.cc/NfT4GcXh/image135.jpg
https://i.postimg.cc/GmCjH5P4/image137.jpg
https://i.postimg.cc/zGFFWFp0/image139.jpg
https://i.postimg.cc/k5MFyRp9/image141.jpg
https://i.postimg.cc/cHrRpyWb/Whats-App-Image-2025-06-13-at-4-52-31-PM.jpg
https://i.postimg.cc/mrd3pZv9/Whats-App-Image-2025-06-16-at-4-14-37-PM.jpg
https://i.postimg.cc/9MKdV8FF/Whats-App-Image-2025-06-23-at-5-56-44-AM.jpg
https://i.postimg.cc/gjhv0Vny/Whats-App-Image-2025-06-25-at-3-33-27-PM.jpg
https://i.postimg.cc/4Nz6k1Cs/Whats-App-Image-2025-07-04-at-9-26-21-PM.jpg
https://i.postimg.cc/Yqc6sssd/Whats-App-Image-2025-07-08-at-3-08-32-PM.jpg
https://i.postimg.cc/3x12WJJq/Whats-App-Image-2025-07-08-at-3-08-33-PM.jpg
https://i.postimg.cc/9QCGWqVT/Whats-App-Image-2025-07-11-at-4-16-55-PM.jpg`);
  const links = imageLinks.split('\n').map(link => link.trim()).filter(Boolean);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <main className="container mx-auto px-4 py-12 bg-[var(--bg)]">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">Gallery</h1>
      {/* Paste Image Links Section */}
      <section className="mb-8">
       
        {links.length > 0 && (
          <>
            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
              {links.map((link, idx) => (
                <img
                  key={idx}
                  src={link}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full mb-4 rounded shadow object-cover break-inside-avoid cursor-pointer"
                  onClick={() => { setPhotoIndex(idx); setLightboxOpen(true); }}
                />
              ))}
            </div>
            {lightboxOpen && (
              <Suspense fallback={<div>Loading gallery...</div>}>
                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  index={photoIndex}
                  slides={links.map(src => ({ src }))}
                  on={{
                    view: ({ index }) => setPhotoIndex(index)
                  }}
                />
              </Suspense>
            )}
          </>
        )}
      </section>
    
    </main>
  );
} 