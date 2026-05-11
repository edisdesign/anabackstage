import svgPaths from "./svg-9zf6l55x9v";

function Icon() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3168b800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pcf24500} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M23.334 8.6665H23.3473" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-[367.203px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Playfair_Display:Regular',sans-serif] font-normal leading-[36px] left-[184px] text-[30px] text-black text-center top-0">@ana_make_up_backstage</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[16px] relative shrink-0 w-[169.859px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#d4af37] text-[12px] tracking-[1.2px] uppercase">Follow on Instagram</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative size-full" data-name="Container">
      <Icon />
      <Heading />
      <Link />
    </div>
  );
}