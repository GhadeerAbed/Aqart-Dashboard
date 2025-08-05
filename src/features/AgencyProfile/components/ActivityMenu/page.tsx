
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Image from 'next/image';
import {menu} from '../../../../../public/assests/page'

const ActivityTypes = [
  { name: 'Add', value: 'Add' },
  { name: 'Update', value: 'Update' },
  { name: 'Delete', value: 'Delete' },
  { name: 'Change Password', value: 'ChangePassword' },
  { name: 'Access Control', value: 'AccessControl' },
];

export const ViewActivity: React.FC<{ onSelect: (type: string) => void }> = ({ onSelect }) => {
  return (
    <Menu>
      {({ open }) => (
        <div className="flex flex-col relative">
          <MenuButton className="text-fontColor1">
            <Image src={menu} alt="menu" width={24} height={24} className='mr-5' />
          </MenuButton>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems className="bg-white shadow-TableShadow py-3 rounded-[5px] absolute right-5 top-9 z-10">
              {ActivityTypes.map((type) => (
                <MenuItem key={type.value} onClick={() => onSelect(type.value)}>
                  <div className='text-darkSecondary font-[200] px-3 whitespace-nowrap cursor-pointer font-nunito py-1 hover:bg-[#F9F9F9]'>
                    {type.name}
                  </div>
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default ViewActivity;

