export function Card({
  className,
  title,
  children,
}: {
  className: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-6 bg-white  rounded-xl ${className} `}>
      <div className="w-full mb-4">
        <h2 className="text-lg font-bold border-b-2 ">{title}</h2>
      </div>
      {children}
    </div>
  );
}
