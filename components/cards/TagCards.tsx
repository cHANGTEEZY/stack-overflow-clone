import React from "react";

interface Props {
  _id: string;
  name: string;
  questions: string;
  showCount?: boolean;
  compact?: boolean;
}

const TagCards = ({ _id, name, questions, showCount, compact }: Props) => {
  return <div>Tagcard</div>;
};

export default TagCards;
