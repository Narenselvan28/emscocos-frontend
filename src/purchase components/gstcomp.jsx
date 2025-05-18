import React, { useState } from "react";
import WithGSTComp from "./withgstcomp";

export default function GSTToggleComponent(props) {
  const [withGST, setWithGST] = useState(true);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="flex items-center gap-2">
       
        </label>
      </div>

      {withGST && <WithGSTComp {...props} />}



    </div>
  );
}
