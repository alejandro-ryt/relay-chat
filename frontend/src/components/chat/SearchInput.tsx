import SearchInputIcon from "@/components/ui/icons/SearchInputIcon";
import { SyntheticEvent } from "react";

type Props = {
  handleOnchange: (event: SyntheticEvent<HTMLInputElement, Event>) => void;
  value: string;
};

const SearchInput = ({ handleOnchange, value }: Props) => {
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
