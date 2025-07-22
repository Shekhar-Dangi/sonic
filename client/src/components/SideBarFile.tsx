interface FileProps {
  icon: string;
  title: string;
  isFocussed: boolean;
}

function SideBarFile({ icon, title, isFocussed }: FileProps) {
  return (
    <>
      <div
        className={`flex gap-3 ${
          isFocussed ? "bg-primary-300" : ""
        } px-4 py-2 rounded-sm cursor-pointer hover:bg-primary-300 hover:text-primary-400 transition-colors duration-200`}
      >
        <img className="w-5 h-5" src={icon} />
        <h5
          className={`${
            isFocussed ? "text-primary-500 font-semibold" : "text-black-700"
          }`}
        >
          {title}
        </h5>
      </div>
    </>
  );
}

export default SideBarFile;
