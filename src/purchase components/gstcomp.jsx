import React, { useState } from "react";
import WithGSTComp from "./withgstcomp";     // import your with GST component
import WithoutGSTComp from "./withoutgstcomp"; // import your without GST component

export default function GSTToggleComponent(props) {
    const [withGST, setWithGST] = useState(true);

    return (
  <div>
    

    {withGST ? (
      <WithGSTComp {...props} />
    ) : (
      <WithoutGSTComp {...props} />
    )}
  </div>
);

}
