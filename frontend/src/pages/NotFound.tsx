import NotFoundIcon from "@/components/ui/icons/NotFoundIcon";
import DATA from "@/constants/notFound";

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center m-60 text-center">
      <figure className="w-80 h-80 mb-4">
        <NotFoundIcon />
      </figure>
      <section className="inline-grid *:[grid-area:1/1] mb-4">
        <div
          role="contentinfo"
          className="status status-error animate-ping m-2"
        ></div>
        <div role="contentinfo" className="status status-error m-2"></div>
        <p className="ml-6">{DATA.ERROR}</p>
      </section>

      <p>{DATA.MESSAGE}</p>
    </section>
  );
};

export default NotFound;
