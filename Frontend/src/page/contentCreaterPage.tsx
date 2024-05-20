import React from 'react'
import UserNavigation from '../Navigations/userNav'







export default function ContentCreatorPage() {
  return (
    <div>
      <UserNavigation />
      {/* <h1>Content Creator Page</h1>
      <h1>Shiwantha Prasad</h1> */}
      
      <div className="flex overflow-hidden relative flex-col pt-12 pr-4 pb-20 pl-14 fill-stone-100 min-h-[993px] max-md:pl-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f317c48acecfa1c33ca426fa4850ac2d0795fd9b29cdc96a0a6d9e0ceda658a?"
          className="object-cover absolute inset-0 size-full"
          alt="Background"
        />
        <div className="relative px-4 py-5 bg-indigo-500 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <div className="relative mt-4 text-6xl font-black text-white max-md:mt-10 max-md:text-4xl">
                SBASS
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
              <div className="flex relative gap-5 w-full whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-auto gap-5 my-auto text-base font-black text-white">
                  <div className="grow">Home</div>
                  <div>Seller</div>
                  <div>Con.Creator</div>
                  <div>Veh.Owner</div>
                </div>
                <div className="flex flex-auto gap-4 text-xl font-light text-indigo-500 max-md:flex-wrap max-md:max-w-full">
                  <div className="items-start px-6 pt-3.5 pb-6 my-auto rounded-2xl bg-zinc-300 bg-opacity-80 max-md:px-5 max-md:max-w-full">
                    search...
                  </div>
                  <img
                    loading="lazy"
                    srcSet="..."
                    className="shrink-0 aspect-square w-[60px]"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative self-center mt-20 w-full max-w-[1305px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col self-stretch my-auto font-black max-md:mt-10 max-md:max-w-full">
                <div className="text-5xl text-black max-md:max-w-full max-md:text-4xl">
                  The best program
                  <br /> to enroll for <br />
                  exchange
                </div>
                <div className="justify-center self-start px-7 py-7 mt-40 ml-5 text-2xl text-white bg-violet-900 max-md:px-5 max-md:mt-10 max-md:ml-2.5">
                  Find courses -&gt;
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="..."
                className="grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full"
                alt="Program image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
