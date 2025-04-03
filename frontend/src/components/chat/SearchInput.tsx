import SearchInputIcon from "@/components/ui/icons/SearchInputIcon";

const SearchInput = () => {
  return (
    <label className="input rounded-[0.8rem] m-5 w-auto outline-none">
      <SearchInputIcon />
      <input type="search" required placeholder="Search" />
    </label>
  );
};

export default SearchInput;
