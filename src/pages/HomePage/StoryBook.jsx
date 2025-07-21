import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { storyContent } from "../../data/mockData";
import openBookImage from "../../img/13.svg";

// Helper component for the book cover
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-[#6d4c41] to-[#4e342e] text-stone-100 shadow-md border border-black/20"
      ref={ref}
      data-density="hard"
    >
      <div className="text-center p-4">
        <h2 className="text-4xl font-serif tracking-wider">{props.children}</h2>
      </div>
    </div>
  );
});
PageCover.displayName = "PageCover";

// Helper component for individual pages
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-stone-50 p-4 shadow-inner" ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function StoryBook({ selectedCollectionId, flowerLocatorRef }) {
  const bookRef = useRef(null);
  const collectionId = selectedCollectionId || "spring-collection";
  const currentContent = storyContent.collectionDetails[collectionId];
  const storyText = storyContent.storyText;

  if (!currentContent) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-100">
        <p>Loading collection content...</p>
      </div>
    );
  }

  return (
    <section className="w-full flex items-center bg-gradient-to-b from-stone-100 to-stone-200 py-20">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text side */}
        <div className="text-left p-4">
          <h2 className="text-4xl font-serif text-primary mb-6">
            {storyText.heading}
          </h2>
          <div className="space-y-4 text-base text-natural max-h-[60vh] overflow-y-auto pr-4">
            {storyText.paragraphs.map((p, i) => (
              <p key={i} style={{ whiteSpace: "pre-wrap" }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Flip book side */}
        <div className="relative w-full aspect-[4/3]">
          {currentContent?.sliderImagePairs?.length > 0 && (
            <div className="relative w-full h-full">
              <img
                src={openBookImage}
                alt="Open Story Book"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[86%]">
                  <HTMLFlipBook
                    key={collectionId}
                    width={600}
                    height={850}
                    size="stretch"
                    drawShadow={true}
                    mobileScrollSupport={false}
                    ref={bookRef}
                    className="w-full h-full"
                  >
                    {currentContent?.sliderImagePairs?.flatMap((pair) => [
                      <Page key={`${pair.id}-left`}>
                        <img
                          src={pair.leftImg}
                          alt="Story page - left"
                          className="w-full h-full object-cover"
                        />
                      </Page>,
                      <Page key={`${pair.id}-right`}>
                        <img
                          src={pair.rightImg}
                          alt="Story page - right"
                          className="w-full h-full object-cover"
                        />
                      </Page>,
                    ])}
                  </HTMLFlipBook>
                </div>
              </div>
            </div>
          )}

          <div
            ref={flowerLocatorRef}
            className="absolute pointer-events-none"
            style={{ bottom: "10%", left: "10%" }}
          />
        </div>
      </div>
    </section>
  );
}
