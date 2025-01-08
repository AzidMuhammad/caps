import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Step {
  title: string;
  active: boolean;
}

const ProgressSteps: React.FC = () => {
  const searchParams = useSearchParams();
  const platNomor = searchParams.get("platNomor");
  
  const [status, setStatus] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([
    { title: "Masih Dalam Antrian", active: false },
    { title: "Sedang Dicuci", active: false },
    { title: "Selesai Dicuci", active: false },
  ]);

  useEffect(() => {
    const fetchAntrianStatus = async () => {
      if (platNomor) {
        try {
          const response = await fetch(`/api/antrian?platNomor=${platNomor}`);
          const data = await response.json();
          const antrianStatus = data.data[0]?.status || 'Queue';
          setStatus(antrianStatus);

          updateSteps(antrianStatus);
        } catch (error) {
          console.error("Error fetching antrian data:", error);
        }
      }
    };

    fetchAntrianStatus();
  }, [platNomor]);

  const updateSteps = (status: string) => {
    const newSteps = [...steps];

    switch (status) {
      case "Queue":
        newSteps[0].active = true;
        newSteps[1].active = false;
        newSteps[2].active = false;
        break;
      case "Progress":
        newSteps[0].active = true;
        newSteps[1].active = true;
        newSteps[2].active = false;
        break;
      case "Done":
        newSteps[0].active = true;
        newSteps[1].active = true;
        newSteps[2].active = true;
        break;
      default:
        newSteps[0].active = false;
        newSteps[1].active = false;
        newSteps[2].active = false;
        break;
    }

    setSteps(newSteps);
  };

  return (
    <div className="flex justify-around items-center mt-8 px-4 mr-14">
      {steps.map((step, index) => (
        <div key={index} className="text-center justify-around mx-auto">
          <p className={`text-md ${step.active ? "text-blue-600 font-bold" : "text-gray-500"}`}>
            {step.title}
          </p>
          <div className={`mt-4 w-2 h-2 rounded-full justify-center mx-auto  ${step.active ? "bg-blue-600" : "bg-gray-400"}`} />
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
