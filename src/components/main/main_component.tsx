import React from 'react';

export const MainComponent: React.FC = (): JSX.Element => (
   <div>
       Topic Search Bar<input></input>
       <select>Manual Location Drop down</select>
       <button>Results button</button>
       <p>Services List</p>
       <ul>
           <li>service 1</li>
           <li>service 2</li>
       </ul>
   </div>
);