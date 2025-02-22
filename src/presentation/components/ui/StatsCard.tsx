import { Contents } from "@/infraestructure/interfaces";
import Image from "next/image";

const StatsCard = ({ aboutSection }: any) => {
  return (
    <div className="flex flex-col md:flex-row text-white bg-gray-900 dark;text-white rounded-xl overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1740235271/08C504EA-6BF4-42B0-8825-22C409F907DD_uwdcji.jpg"
          alt="Profile Picture"
          layout="fill"
          objectFit="cover"
          className="md:rounded-r-xl md:rounded-none rounded-b-xl md:object-cover object-[center_top]"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                {aboutSection.stats.favouriteThingTitle}
              </h3>
              <p className="text-gray-300">
                {aboutSection.stats.favouriteThing}
              </p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                {aboutSection.stats.leastFavouriteThingTitle}
              </h3>
              <p className="text-gray-300">
                {aboutSection.stats.leastFavouriteThing}
              </p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                {" "}
                {aboutSection.stats.ageTitle}
              </h3>
              <p className="text-gray-300">{aboutSection.stats.age}</p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                {aboutSection.stats.hobbiesTitle}
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap">
                {aboutSection.stats.hobbies}
              </p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                {aboutSection.stats.featsTitle}
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap">
                {aboutSection.stats.feats}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
