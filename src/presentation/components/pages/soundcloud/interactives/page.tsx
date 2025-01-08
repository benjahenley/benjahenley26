import { ScButtonOne } from "../sc-button/page";
import { FaBell } from "react-icons/fa";
import { BsEnvelopeFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import benjaSC from "@/media/benjaSC.jpg";
import { FaChevronDown } from "react-icons/fa";

import Image from "next/image";
import { DarkModeToggle } from "../../../ui/Darkmode";
type Props = {
  setClicked: (name: string) => void;
  clicked: string;
};

export const InteractivesSC = ({ setClicked, clicked }: Props) => {
  return (
    <ul className="flex flex-row h-full items-center">
      <ScButtonOne
        name={"profile"}
        setClicked={() => setClicked("profile")}
        clicked={clicked}>
        <div className="flex flex-row items-center justify-between gap-4 w-auto">
          <Image
            src={benjaSC}
            alt="benja"
            width={30}
            className="rounded-full min-w-[30px]"
          />
          <FaChevronDown className="text-sm"></FaChevronDown>
        </div>
      </ScButtonOne>
      <div className="flex flex-row w-full h-full">
        <ScButtonOne
          name={"bell"}
          setClicked={() => setClicked("bell")}
          clicked={clicked}>
          <FaBell></FaBell>
        </ScButtonOne>

        <ScButtonOne
          name={"envelope"}
          setClicked={() => setClicked("envelope")}
          clicked={clicked}>
          <BsEnvelopeFill></BsEnvelopeFill>
        </ScButtonOne>
        <ScButtonOne
          name={"dots"}
          setClicked={() => setClicked("dots")}
          clicked={clicked}>
          <DarkModeToggle></DarkModeToggle>
        </ScButtonOne>
      </div>
    </ul>
  );
};
