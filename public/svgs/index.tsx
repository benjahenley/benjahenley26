import MenuSVG from "./menu.svg";
import CircleSVG from "./circle.svg";
import LinkSVG from "./links.svg";
import CakeSVG from "./cake.svg";
import CalendarSVG from "./calendar.svg";
import WifiSVG from "./wifi.svg";
import PinSVG from "./pin.svg";
import GithubSVG from "./github.svg";
import InstagramSVG from "./instagram.svg";
import LinkedinSVG from "./linkedin.svg";
import DisplayArrowSVG from "./displayArrow.svg";
import DeskSVG from "./desk.svg";
import LogoSVG from "./logo.svg";
import AvatarSVG from "./avatar.svg";

function MenuIcon(props: any): any {
  return <MenuSVG onClick={props.onClick} className={props.className} />;
}
function CircleIcon(props: any): any {
  return <CircleSVG onClick={props.onClick} className={props.className} />;
}
function LinksIcon(props: any): any {
  return <LinkSVG onClick={props.onClick} className={props.className} />;
}
function CakeIcon(props: any): any {
  return <CakeSVG onClick={props.onClick} className={props.className} />;
}
function CalendarIcon(props: any): any {
  return <CalendarSVG onClick={props.onClick} className={props.className} />;
}
function WifiIcon(props: any): any {
  return <WifiSVG onClick={props.onClick} className={props.className} />;
}
function PinIcon(props: any): any {
  return <PinSVG onClick={props.onClick} className={props.className} />;
}

function DisplayArrowIcon(props: any): any {
  return (
    <DisplayArrowSVG onClick={props.onClick} className={props.className} />
  );
}
function GithubIcon(props: any): any {
  return <GithubSVG onClick={props.onClick} className={props.className} />;
}
function InstagramIcon(props: any): any {
  return <InstagramSVG onClick={props.onClick} className={props.className} />;
}

function LinkedinIcon(props: any): any {
  return <LinkedinSVG onClick={props.onClick} className={props.className} />;
}

function DeskIcon(props: any): any {
  return <DeskSVG onClick={props.onClick} className={props.className} />;
}

function LogoIcon(props: any): any {
  return <LogoSVG onClick={props.onClick} className={props.className} />;
}

function AvatarIcon(props: any): any {
  return (
    <AvatarSVG
      onClick={props.onClick}
      className={props.className + " dark:text-white"}
    />
  );
}

export {
  MenuIcon,
  AvatarIcon,
  CircleIcon,
  LinksIcon,
  CakeIcon,
  CalendarIcon,
  WifiIcon,
  PinIcon,
  DisplayArrowIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  DeskIcon,
  LogoIcon,
};
