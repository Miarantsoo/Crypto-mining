import React from "react";

type Infos = {
    header: string;
    content: string;
};

const InfoSection: React.FC<Infos> = ({header, content}) => {
    return (
        <div className="py-3 px-5 border-b border-b-lavender font-body">
          <h3 className="font-extrabold text-xl text-secondary">{header}</h3>
          <p className="text-darl">{content}</p>
        </div>
    );
}

export default InfoSection;