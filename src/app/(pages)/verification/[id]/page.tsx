import { VerificationJsx } from '@/components/custom/verificationJsx'
import React, { Suspense } from 'react';
const page = () => {

 

  return (
    <div className="bg-[#1C1C1C] w-screen h-screen container mx-auto">
      <div className="w-full h-full flex justify-center items-center">
        <Suspense>
          <VerificationJsx />
        </Suspense>
      </div>
    </div>
  );
}

export default page