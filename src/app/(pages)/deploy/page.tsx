import { DeployJsx } from '@/components/custom/DeployJsx';
import React from 'react'

const page = () => {
  return (
    <div className="bg-[#1C1C1C] w-screen min-h-screen container mx-auto">
      <div className='w-full h-full flex justify-center items-center'>
        <DeployJsx/>
      </div>
    </div>
  );
}

export default page