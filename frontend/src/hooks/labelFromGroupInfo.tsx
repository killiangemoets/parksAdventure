import { useEffect, useState } from "react";
import { CountInputState } from "../components/UIComponents/dropdown/dropdownCounts.component";
import colors from "../colors";

type LabelFromGroupInfo = {
  label: React.ReactNode | string;
};

const useLabelFromGroupInfo = ({
  group,
}: {
  group: CountInputState[];
}): LabelFromGroupInfo => {
  const [label, setLabel] = useState<React.ReactNode | string>(
    <p>Add People</p>
  );

  useEffect(() => {
    const newLabel = group.reduce((acc, cur) => {
      if (cur.value > 0 && !acc.length)
        return acc + `${cur.title} x ${cur.value}`;
      else if (cur.value > 0) return acc + `, ${cur.title} x ${cur.value}`;
      else return acc;
    }, "");
    setLabel(
      newLabel.length ? (
        <p style={{ color: colors.darkGrey }}>{newLabel}</p>
      ) : (
        <p>Add people</p>
      )
    );
  }, [group]);

  return { label };
};

export default useLabelFromGroupInfo;
