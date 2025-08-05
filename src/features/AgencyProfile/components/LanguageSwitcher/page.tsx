
// import {  Select } from "../../../../components/page";
// import React from "react";
// interface LanguageSwitcherProps {
//   notes: {
//     enNotes: string;
//     arNotes: string;
//   };
//   language: "enNotes" | "arNotes";
//   setNotes: React.Dispatch<React.SetStateAction<{ enNotes: string; arNotes: string }>>;
//   setLanguage: React.Dispatch<React.SetStateAction<"enNotes" | "arNotes">>;
//   en_Notes?: string;
//   ar_Notes?: string;
//   title?:string;
// }

// export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
//   notes,
//   language,
//   setNotes,
//   setLanguage,
//   en_Notes,
//   ar_Notes,
//   title
// }) => {
//   React.useEffect(() => {
//     setNotes({
//       enNotes: en_Notes,
//       arNotes: ar_Notes,
//     });
//   }, [en_Notes, ar_Notes, setNotes]);

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setLanguage(event.target.value as "enNotes" | "arNotes");
//   };

//   const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { value } = event.target;
//     setNotes((prevNotes) => ({
//       ...prevNotes,
//       [language]: value,
//     }));
//   };

//   return (
//     <div>
//       <div className="pb-2 flex justify-between items-center">
//         <p className="text-sm font-[500] text-darkSecondary">{title}</p>
//         <div className="flex justify-center items-center gap-2">
//         <span className=" text-darkSecondary text-[15px]" >Preview Language:</span>
//           <Select
//             options={[
//               { label: "English", value: "enNotes" },
//               { label: "Arabic", value: "arNotes" },
//             ]}
//             selectClassName="bg-backgroundColor  text-sm !rounded-full !pr-10 !pl-5 !py-1.5"
//             onChange={handleLanguageChange}
//           />
//         </div>
//       </div>
//       <textarea
//         id="notes"
//         rows={5}
//         className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
//         placeholder={language === "enNotes" ? "Write your thoughts here..." : "اكتب أفكارك هنا..."}
//         value={notes[language]}
//         onChange={handleNotesChange}
//         dir={language === "enNotes" ? "ltr" : "rtl"}
//       ></textarea>
//     </div>
//   );
// };

// export default LanguageSwitcher;

import React, { useEffect } from "react";
import { Input, Select } from "../../../../components/page";

interface LanguageSwitcherProps {
  notes: {
    enNotes: string;
    arNotes: string;
  };
  title?: {
    enTitle: string;
    arTitle: string;
  };
  language: "enNotes" | "arNotes";
  setNotes: React.Dispatch<React.SetStateAction<{ enNotes: string; arNotes: string }>>;
  setTitle?: React.Dispatch<React.SetStateAction<{ enTitle: string; arTitle: string }>>;
  setLanguage: React.Dispatch<React.SetStateAction<"enNotes" | "arNotes">>;
  en_Notes?: string;
  ar_Notes?: string;
  en_Title?: string;
  ar_Title?: string;
  showTitleInput?: boolean;
  desc?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  notes,
  title,
  language,
  setNotes,
  setTitle = () => {},
  setLanguage,
  en_Notes,
  ar_Notes,
  en_Title,
  ar_Title,
  showTitleInput = false,
  desc,
}) => {
  useEffect(() => {
    if (en_Notes !== notes.enNotes || ar_Notes !== notes.arNotes) {
      setNotes({
        enNotes: en_Notes || '',
        arNotes: ar_Notes || '',
      });
    }
    if (en_Title !== title?.enTitle || ar_Title !== title?.arTitle) {
      setTitle({
        enTitle: en_Title || '',
        arTitle: ar_Title || '',
      });
    }
  }, [en_Notes, ar_Notes, en_Title, ar_Title]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as "enNotes" | "arNotes");
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [language]: value,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle((prevTitle) => ({
      ...prevTitle,
      [language === "enNotes" ? "enTitle" : "arTitle"]: value,
    }));
  };

  return (
    <div>
      {showTitleInput && (
        <div className="">
          <div className="flex justify-end items-center gap-x-2 ">
            <span className="text-darkSecondary text-[15px]">Preview Language:</span>
            <Select
              options={[
                { name: "English", value: "enNotes" },
                { name: "Arabic", value: "arNotes" },
              ]}
              selectClassName="bg-backgroundColor text-sm !rounded-full !pr-10 !pl-5 !py-1.5"
              onChange={handleLanguageChange}
            />
          </div>
          <Input
            type="text"
            label={language === "enNotes" ? "Title*" : "العنوان*"}
            id="title"
            inputClassName="!bg-backgroundColor mb-8"
            placeholder={language === "enNotes" ? "Enter Title" : "أدخل العنوان"}
            value={language === "enNotes" ? title?.enTitle || "" : title?.arTitle || ""}
            onChange={handleTitleChange}
            dir={language === "enNotes" ? "ltr" : "rtl"}
          />
        </div>
      )}
      {!showTitleInput && (
        <div className="pb-2 flex justify-between items-center">
          <p className="text-sm font-[500] text-darkSecondary">{desc}</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-darkSecondary text-[15px]">Preview Language:</span>
            <Select
              options={[
                { name: "English", value: "enNotes" },
                { name: "Arabic", value: "arNotes" },
              ]}
              selectClassName="bg-backgroundColor text-sm !rounded-full !pr-10 !pl-5 !py-1.5"
              onChange={handleLanguageChange}
            />
          </div>
        </div>
      )}
      <textarea
        id="notes"
        rows={5}
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
        placeholder={language === "enNotes" ? "Write your thoughts here..." : "اكتب أفكارك هنا..."}
        value={notes[language]}
        onChange={handleNotesChange}
        dir={language === "enNotes" ? "ltr" : "rtl"}
      ></textarea>
    </div>
  );
};

export default LanguageSwitcher;
