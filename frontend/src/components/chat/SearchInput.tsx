import SearchInputIcon from "@/components/ui/icons/SearchInputIcon";
import { TSearchInputProps } from "@/types/form.types";

const SearchInput = ({ handleOnchange, value }: TSearchInputProps) => {
  return (
    <label className="input rounded-[0.8rem] outline-none w-full">
      <SearchInputIcon />
      <input
        type="search"
        value={value}
        required
        onChange={handleOnchange}
        placeholder="Search"
      />
    </label>
  );
};

export default SearchInput;
