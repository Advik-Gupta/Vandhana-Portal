import React from 'react';
import CycleType from './CycleType';

const CycleGrid = ({id}) => {
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex flex-wrap gap-8 items-start text-sm font-small text-white max-md:max-w-full">
        <CycleType text="Grind Cycle 1" id={id} />
        <CycleType text="Repaint Cycle 1" id={id} />
        <CycleType text="Grind Cycle 2" id={id}/>
        <CycleType text="Repaint Cycle 2" id={id} />
      </div>
    </section>
  );
};

export default CycleGrid;
