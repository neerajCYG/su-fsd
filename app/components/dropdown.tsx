import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

interface DropDownProps {
  sortOptions: string[];
  onSortChange: (selectedOption: string) => void;
}

const DropdownComponent: FC<DropDownProps> = ({ sortOptions, onSortChange }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 ">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="py-1">
          {sortOptions.map((option, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <button
                  onClick={() => onSortChange(option)}
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownComponent;
