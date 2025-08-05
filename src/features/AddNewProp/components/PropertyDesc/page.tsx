
import React, { useEffect, useState } from "react";
import { LanguageSwitcher } from "../../../../features/AgencyProfile/components/page";

export const PropDesc = ({register,setValue,propertyData}:{register:any,setValue:any,propertyData:any}) => {

  const [notes, setNotes] = useState({
    enNotes: propertyData?.data.descriptionEn || "",
    arNotes: propertyData?.data.descriptionAr || ""
  });
  const [title, setTitle] = useState({
    enTitle: propertyData?.data.titleEn || "",
    arTitle: propertyData?.data.titleAr || ""
  });
  const [language, setLanguage] = useState<"enNotes" | "arNotes">("enNotes");
  
  useEffect(() => {
    register("descriptionEn");
    register("descriptionAr");
    register("titleEn");
    register("titleAr");
  }, [register]);

  useEffect(() => {
    setValue("descriptionEn", notes.enNotes);
    setValue("descriptionAr", notes.arNotes);
    setValue("titleEn", title.enTitle);
    setValue("titleAr", title.arTitle);
  }, [notes, title, setValue]);

  return (
    <div className="bg-lightSecondary w-full rounded-2xl px-3 py-2 pb-4">
      <h1 className="uppercase font-semibold pt-1 pb-4">
        Property Description
      </h1>
      <form>
        <LanguageSwitcher
          notes={notes}
          title={title}
          language={language}
          setNotes={(newNotes) => setNotes(newNotes)}
          setTitle={(newTitle) => setTitle(newTitle)}
          setLanguage={setLanguage}
          en_Notes={notes.enNotes}
          ar_Notes={notes.arNotes}
          en_Title={title.enTitle}
          ar_Title={title.arTitle}
          showTitleInput={true}
        />
      </form>
    </div>
  );
};

export default PropDesc;
